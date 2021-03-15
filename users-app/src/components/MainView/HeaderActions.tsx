import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";

interface ActionProps {
  onSearchClick: () => void;
  onSettingsClick: () => void;
}

const HeaderActions: React.FC<ActionProps> = ({
  onSearchClick,
  onSettingsClick,
}: ActionProps): React.ReactElement => {
  return (
    <React.Fragment>
      <Tooltip title="Filter users" placement="bottom">
        <IconButton onClick={onSearchClick} aria-label="settings">
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Filter settings" placement="bottom">
        <IconButton onClick={onSettingsClick} aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};
export default HeaderActions;
