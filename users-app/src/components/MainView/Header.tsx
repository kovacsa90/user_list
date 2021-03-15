import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import HeaderActions from "./HeaderActions";
import NameFilters from "../Filter/NameFilters";
import { useFilters } from "../../context/FilterContext";

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
      display: "flex",
      margin: "auto 10px",
    },
    animatedItem: {
      animation: `$slideInEffect 1000ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes slideInEffect": {
      "0%": {
        opacity: 0,
        transform: "translateY(-200%)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  }),
);

const Header: React.FC = (): React.ReactElement => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();
  const { setFilter } = useFilters();

  const handleSearchClick = () => {
    showFilters && setFilter(["firstName", "lastName"], ["", ""]);
    setShowFilters(!showFilters);
  };

  const handleSettingsClick = () => {
    history.push("/settings");
  };

  return (
    <Paper className={classes.header} elevation={15}>
      <Typography variant="h3" align="center" className={classes.title}>
        Address Book
      </Typography>
      <div className={classes.headerActions}>
        {showFilters && (
          <div className={classes.animatedItem}>
            <NameFilters />
          </div>
        )}

        <HeaderActions
          onSearchClick={handleSearchClick}
          onSettingsClick={handleSettingsClick}
        />
      </div>
    </Paper>
  );
};
export default Header;
