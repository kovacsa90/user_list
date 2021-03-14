import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import fetchUsers from "../../api/fetchFunction";
import UserCard from "./UserCard";
import UserDetailsModal from "./DetailsModal";
import Header from "./Header";
import { User, NatSet } from "../../api/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    users: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  }),
);

function AddressBook() {
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [natList, setNatList] = useState<NatSet>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const classes = useStyles();
  const queryClient = useQueryClient();
  const history = useHistory();

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["users", natList, pageNumber],
    () => fetchUsers(natList, pageNumber),
    {
      refetchOnWindowFocus: false,
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
    queryClient.prefetchInfiniteQuery(["users", natList, pageNumber + 1], () =>
      fetchUsers(natList, pageNumber + 1),
    );
  }, [users]);

  const getButtonText = (): string => {
    if (isFetchingNextPage) {
      return "Loading more...";
    }
    if (hasNextPage) {
      return "Load Older";
    }
    return "Nothing more to load";
  };

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  const handleSearchClick = () => {
    console.log("search");
  };

  const handleSettingsClick = () => {
    history.push("/settings");
  };

  return (
    <React.Fragment>
      <Header
        onSearchClick={handleSearchClick}
        onSettingsClick={handleSettingsClick}
      />
      {users && (
        <div className={classes.users}>
          {users.map((user, index) => (
            <UserCard
              ref={users.length === index + 1 ? lastUserRef : null}
              key={user.login.uuid}
              user={user}
              onInfoClick={setSelectedUser}
            />
          ))}
          <div>{isFetching ? "Loading items..." : null}</div>
        </div>
      )}
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
