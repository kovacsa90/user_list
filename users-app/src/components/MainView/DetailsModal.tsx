import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { User } from "../../api/types";

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: "moon",
  },
  dialog: {
    minWidth: "500px",
  },
}));

interface UserDetailsModalProps {
  selectedUser: User;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  selectedUser,
  onClose,
}: UserDetailsModalProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Dialog
      open
      onClose={onClose}
      onKeyDown={(event): void => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
    >
      <DialogTitle>
        <span className={classes.title}>User Details</span>
      </DialogTitle>
      <DialogContent
        className={classes.dialog}
      >{`${selectedUser.name.first} ${selectedUser.name.last}`}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid="close_details" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsModal;
