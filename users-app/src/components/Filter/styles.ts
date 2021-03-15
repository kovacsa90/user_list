import { makeStyles, Theme } from "@material-ui/core/styles";

const useFilterStyles = makeStyles((theme: Theme) => ({
  filter: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "200px",
  },
  resetButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));

export default useFilterStyles;
