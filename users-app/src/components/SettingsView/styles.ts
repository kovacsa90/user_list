import { makeStyles, Theme } from "@material-ui/core/styles";

export const useSettingsStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: theme.spacing(3),
    height: "100%",
  },
  title: {
    fontFamily: "moon",
  },
  options: {
    width: "25%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  buttons: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
}));

export const useNatOptionStyles = makeStyles((theme: Theme) => ({
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
}));
