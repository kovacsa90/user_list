import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import HeaderActions from "./HeaderActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      zIndex: 1,
      display: "flex",
      justifyContent: "space-between",
      position: "sticky",
      backgroundColor: "white",
      top: 0,
      margin: theme.spacing(0, 0.5),
    },
    title: {
      padding: theme.spacing(3),
      fontFamily: "moon",
    },
    headerActions: {
      margin: "auto 10px",
    },
  }),
);

interface HeaderProps {
  onSearchClick: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onSettingsClick,
}: HeaderProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Paper className={classes.header} elevation={15}>
      <Typography variant="h3" align="center" className={classes.title}>
        Address Book
      </Typography>
      <div className={classes.headerActions}>
        <HeaderActions
          onSearchClick={onSearchClick}
          onSettingsClick={onSettingsClick}
        />
      </div>
    </Paper>
  );
};
export default Header;
