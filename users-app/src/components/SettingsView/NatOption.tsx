import React from "react";
import classNames from "classnames";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { NationKeys, NationValues } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      display: "flex",
      margin: "8px auto",
      border: "1px solid #00000061",
      borderRadius: "40px",
      padding: theme.spacing(0.5),
    },
    hovered: { "&:hover": { backgroundColor: "#ebebeb" } },
    selected: { backgroundColor: "#3f51b5", color: "white" },
    avatar: {
      width: "60px",
      height: "60px",
      backgroundColor: "#a6b2f7",
    },
    chipName: {
      width: "100%",
      fontSize: "18px",
      margin: " auto 10% auto 0",
      textAlign: "center",
    },
  }),
);

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
  const classes = useStyles();
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
