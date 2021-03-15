import React from "react";
import classNames from "classnames";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { User } from "../../api/types";
import { useDetailsStyles } from "./styles";

interface UserDetailsModalProps {
  selectedUser: User;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  selectedUser,
  onClose,
}: UserDetailsModalProps): React.ReactElement => {
  const classes = useDetailsStyles();
  const fullName = `${selectedUser.name.first} ${selectedUser.name.last}`;
  const street = `Street: ${selectedUser.location.street.name}`;
  const city = `City: ${selectedUser.location.city}`;
  const state = `State: ${selectedUser.location.state}`;
  const postcode = `Postcode: ${selectedUser.location.postcode}`;
  const phone = `Phone: ${selectedUser.phone}`;
  const cell = `Cell: ${selectedUser.cell}`;

  const allFields = [street, city, state, postcode, phone, cell];
  const filedsList = allFields.map((field) => (
    <div className={classes.textDetail}>{field}</div>
  ));

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
      <DialogContent className={classes.dialog}>
        <Avatar
          className={classes.avatar}
          alt={fullName}
          src={selectedUser.picture.thumbnail}
        />
        <div className={classNames(classes.fullName, classes.textDetail)}>
          {fullName}
        </div>
        {filedsList}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid="close_details" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsModal;
