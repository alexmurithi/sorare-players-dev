import React from "react";

const MainLayout = ({ children }) => {
  return <main>{children}</main>;
};

export default React.memo(MainLayout)