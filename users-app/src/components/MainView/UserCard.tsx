import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { User } from "../../api/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "350px",
      margin: theme.spacing(1),
    },
    picture: {
      margin: "auto",
      height: "150px",
      width: "150px",
      borderRadius: "50%",
    },
    content: {
      textAlign: "center",
    },
  }),
);

interface UserCardProps {
  user: User;
  onInfoClick: (user: User) => void;
}

const UserCard = React.forwardRef(
  ({ user, onInfoClick }: UserCardProps, ref) => {
    const classes = useStyles();

    return (
      <Card ref={ref} className={classes.card}>
        <CardHeader
          action={
            <IconButton onClick={() => onInfoClick(user)} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
