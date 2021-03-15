import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFilters } from "../../context/FilterContext";
import useFilterStyles from "./styles";

const NameFilters: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const { setFilter } = useFilters();
  const classes = useFilterStyles();

  // debounced filtering with 1 sec delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter(["firstName", "lastName"], [firstName.trim(), lastName.trim()]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [firstName, lastName]);

  const handleReset = () => {
    setFirstName("");
    setLastName("");
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        disabled={!firstName && !lastName}
        className={classes.resetButton}
        onClick={handleReset}
        color="primary"
      >
        Reset Filter
      </Button>
      <TextField
        size="small"
        fullWidth
        id="firstName"
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={classes.filter}
        autoFocus
      />
      <TextField
        size="small"
        fullWidth
        id="lastName"
        label="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className={classes.filter}
      />
    </React.Fragment>
  );
};

export default NameFilters;
