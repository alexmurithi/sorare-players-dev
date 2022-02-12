import React from "react";
import { Route } from "react-router-dom";
const MainLayoutRoute = ({ layout: Layout, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps}></Component>
        </Layout>
      )}
    />
  );
};
export default React.memo(MainLayoutRoute);
