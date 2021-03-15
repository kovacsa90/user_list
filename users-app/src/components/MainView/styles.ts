import { makeStyles, Theme } from "@material-ui/core/styles";

export const useMainStyles = makeStyles((theme: Theme) => ({
  users: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  alert: {
    width: "30%",
    margin: "5px auto 5px auto",
  },
  loadingText: {
    textAlign: "center",
    animation: `$loadingEffect 1500ms infinite ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes loadingEffect": {
    "0%": {
      opacity: 0.4,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0.4,
    },
  },
}));

export const useDetailsStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "moon",
  },
  dialog: {
    minWidth: "500px",
  },
  fullName: {
    fontWeight: "bold",
  },
  textDetail: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  avatar: {
    width: "60px",
    height: "60px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
}));

export const useHeaderStyles = makeStyles((theme: Theme) => ({
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
}));

export const useUserStyles = makeStyles((theme: Theme) => ({
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
}));
