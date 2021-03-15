import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { User } from "../../api/types";
import { useUserStyles } from "./styles";

interface UserCardProps {
  user: User;
  onInfoClick: (user: User) => void;
}

const UserCard = React.forwardRef(
  ({ user, onInfoClick }: UserCardProps, ref) => {
    const classes = useUserStyles();

    return (
      <Card ref={ref} className={classes.card}>
        <CardHeader
          action={
            <Tooltip title="User details" placement="bottom">
              <IconButton
                onClick={() => onInfoClick(user)}
                aria-label="details"
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
          title={`${user.name.first} ${user.name.last}`}
          subheader={user.login.username}
        />
        <CardMedia
          className={classes.picture}
          image={user.picture.large}
          title={user.login.username}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.email}
          </Typography>
        </CardContent>
      </Card>
    );
  },
);

export default UserCard;
