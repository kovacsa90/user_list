import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Alert from "@material-ui/lab/Alert";
import fetchUsers from "../../api/fetchFunction";
import UserCard from "./UserCard";
import UserDetailsModal from "./DetailsModal";
import Header from "./Header";
import { useFilters } from "../../context/FilterContext";
import { User, NatSet } from "../../api/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    users: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    alert: {
      width: "30%",
      margin: "5px auto 5px auto",
    },
    loadingText: {
      textAlign: "center",
    },
  }),
);

function AddressBook() {
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [natList, setNatList] = useState<NatSet>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>();

  const { filters } = useFilters();
  const classes = useStyles();
  const queryClient = useQueryClient();

  const isActiveFilter = filters.firstName || filters.lastName;
  const isCatalogueEnd = users.length >= 1000;

  const { status, data, isFetching, hasNextPage } = useInfiniteQuery(
    ["users", natList, pageNumber],
    () => fetchUsers(natList, pageNumber),
    {
      refetchOnWindowFocus: false,
      enabled: !isActiveFilter && !isCatalogueEnd,
    },
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage],
  );

  useEffect(() => {
    const defaultNatList: NatSet = [];
    const storageValue = window.localStorage.getItem("NationalityList");
    const nationalities = storageValue
      ? JSON.parse(storageValue)
      : defaultNatList;
    setNatList(nationalities);
  }, []);

  useEffect(() => {
    if (data && !isFetching && status === "success") {
      const newUsers = data.pages[0];
      setUsers((prevUsers) => {
        return [...prevUsers, ...newUsers];
      });
    }
  }, [data, isFetching, status]);

  // prefetch the next batch of users
  useEffect(() => {
    if (!isActiveFilter && !isCatalogueEnd) {
      queryClient.prefetchInfiniteQuery(
        ["users", natList, pageNumber + 1],
        () => fetchUsers(natList, pageNumber + 1),
      );
    }
  }, [users]);

  const endMessage = isActiveFilter
    ? "Clear filters to fetch more users"
    : "End of users catalogue";

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  const getFilteredUsers = () => {
    const firstPattern = new RegExp(filters.firstName, "i");
    const lastPattern = new RegExp(filters.lastName, "i");
    return users.filter((user) => {
      return (
        user.name.first.match(firstPattern) && user.name.last.match(lastPattern)
      );
    });
  };

  const filteredUsers =
    !filters.firstName && !filters.lastName ? users : getFilteredUsers();

  const userList = filteredUsers.map((user, index) => (
    <UserCard
      ref={users.length === index + 1 ? lastUserRef : null}
      key={user.login.uuid}
      user={user}
      onInfoClick={setSelectedUser}
    />
  ));

  return (
    <React.Fragment>
      <Header />
      {users && <div className={classes.users}>{userList}</div>}
      <div className={classes.loadingText}>
        {isFetching ? "Loading items..." : null}
      </div>
      <div className={classes.alert}>
        {isActiveFilter || isCatalogueEnd ? (
          <Alert severity="info">{endMessage}</Alert>
        ) : null}
      </div>
      {selectedUser && (
        <UserDetailsModal
          selectedUser={selectedUser}
          onClose={handleModalClose}
        />
      )}
    </React.Fragment>
  );
}

export default AddressBook;
