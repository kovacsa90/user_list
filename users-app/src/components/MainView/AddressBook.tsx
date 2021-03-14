import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useInfiniteQuery } from "react-query";
import fetchUsers from "../../api/fetchFunction";
import UserCard from "./UserCard";
import UserDetailsModal from "./DetailsModal";
import { User } from "../../api/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    users: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    title: {
      padding: theme.spacing(3),
      fontFamily: "moon",
    },
    filter: {
      position: "sticky",
      top: 0,
    },
  }),
);

function AddressBook() {
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const classes = useStyles();

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["users", pageNumber], () => fetchUsers(pageNumber), {
    refetchOnWindowFocus: false,
  });

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
    if (data && !isFetching && status === "success") {
      const newUsers = data.pages[0];
      setUsers((prevUsers) => {
        return [...prevUsers, ...newUsers];
      });
    }
  }, [data, isFetching, status]);

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

  return (
    <div>
      <Typography variant="h3" align="center" className={classes.title}>
        Address Book
      </Typography>
      <div className={classes.filter}>Filter comes here...</div>
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
    </div>
  );
}

export default AddressBook;
