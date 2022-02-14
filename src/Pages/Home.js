import React from "react";
import { Box } from "@mui/material";
import PlayerListTable from "../Components/Players/ListTable";

const Home = () => {
  return (
    <Box>
      <PlayerListTable />
    </Box>
  );
};

export default React.memo(Home);
