import * as React from "react";
import { Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function TopBar() {
  return (
    <Grid >
      <ColorModeSwitcher />
    </Grid>
  );
}

export default TopBar;
