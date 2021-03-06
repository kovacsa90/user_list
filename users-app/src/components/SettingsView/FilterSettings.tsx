import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NatOption from "./NatOption";
import { NationMap, NationKeys } from "./types";
import { NatSet } from "../../api/types";
import { useSettingsStyles } from "./styles";

const FilterSettings: React.FC = (): React.ReactElement => {
  const [selectedNats, setSelectedNats] = useState<NatSet>([]);
  const history = useHistory();
  const classes = useSettingsStyles();

  useEffect(() => {
    // No filters are set by default
    const defaultNatList: NatSet = [];
    const storageValue = window.localStorage.getItem("NationalityList");
    const nationalities = storageValue
      ? JSON.parse(storageValue)
      : defaultNatList;
    setSelectedNats(nationalities);
  }, []);

  const handleNatSelect = (nat: NationKeys) => {
    if (selectedNats.includes(nat)) {
      const filteredNatList = selectedNats.filter((item) => item !== nat);
      setSelectedNats(filteredNatList);
    } else {
      setSelectedNats((prevNatList) => [...prevNatList, nat]);
    }
  };

  const handleSave = () => {
    window.localStorage.setItem(
      "NationalityList",
      JSON.stringify(selectedNats),
    );
    history.push("/");
  };

  const handleGoBack = () => {
    history.push("/");
  };

  const options: NationMap = {
    CH: "Swiss",
    ES: "Spanish",
    FR: "French",
    GB: "British",
  };
  const optionsChips = Object.keys(options).map((option) => (
    <NatOption
      key={option}
      abbrv={option as NationKeys}
      name={options[option as NationKeys]}
      isSelected={selectedNats.includes(option as NationKeys)}
      onClick={handleNatSelect}
    />
  ));

  return (
    <header className={classes.header}>
      <Typography className={classes.title} variant="h4" color="textPrimary">
        Select nationality
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Show the users only with the selected nationality - All 17 nationalities
        are enabled if no filter is applied.
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        ( AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US)
      </Typography>
      <div className={classes.options}>
        {optionsChips}
        <div className={classes.buttons}>
          <Button variant="outlined" color="secondary" onClick={handleGoBack}>
            Back
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </header>
  );
};
export default FilterSettings;
