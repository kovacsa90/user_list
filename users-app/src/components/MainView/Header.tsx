import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import HeaderActions from "./HeaderActions";
import NameFilters from "../Filter/NameFilters";
import { useFilters } from "../../context/FilterContext";
import { useHeaderStyles } from "./styles";

const Header: React.FC = (): React.ReactElement => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const history = useHistory();
  const classes = useHeaderStyles();
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
