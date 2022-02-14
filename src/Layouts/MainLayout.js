import React from "react";
import { Container } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <main>{children}</main>
    </Container>
  );
  
};

export default React.memo(MainLayout);
