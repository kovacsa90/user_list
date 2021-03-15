import React from "react";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import { NationKeys, NationValues } from "./types";
import { useNatOptionStyles } from "./styles";

interface NatOptionProps {
  abbrv: NationKeys;
  name: NationValues;
  isSelected: boolean;
  onClick: (value: NationKeys) => void;
}

// Could have used the Material-ui <Chip> but sizing was cumbersome in that case.
const NatOption: React.FC<NatOptionProps> = ({
  abbrv,
  name,
  isSelected,
  onClick,
}: NatOptionProps) => {
  const classes = useNatOptionStyles();
  return (
    <div
      className={classNames(
        classes.chip,
        isSelected ? classes.selected : classes.hovered,
      )}
      onClick={() => onClick(abbrv)}
    >
      <Avatar className={classes.avatar} alt={name}>
        {abbrv}
      </Avatar>
      <div className={classes.chipName}>{name}</div>
    </div>
  );
};

export default NatOption;
