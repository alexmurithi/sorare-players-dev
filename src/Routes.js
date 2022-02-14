import React, { lazy } from "react";
import { Switch } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";

const MainLayoutRoute = lazy(() =>
  import("./Components/RoutesWithLayouts/MainLayoutRoute")
);

const Home = lazy(() => import("./Pages/Home"));

const Routes = () => {
  return (
    <Switch>
      <MainLayoutRoute exact path="/" component={Home} layout={MainLayout} />
    </Switch>
  );
};

export default Routes;
