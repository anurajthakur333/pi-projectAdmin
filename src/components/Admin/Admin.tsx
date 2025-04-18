import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router-dom";
import Users from "../Users/Users";
import Products from "../Products/Products";
import Orders from "../Orders/Orders";
import Home from "../Home/Home";
import Notifications from "../../common/components/Notification";

const Admin: React.FC = () => {
  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Switch>
              <Route path="/users" exact><Users /></Route>
              <Route path="/products" exact><Products /></Route>
              <Route path="/orders" exact><Orders /></Route>
              <Route path="/dashboard" exact><Home /></Route> {/* ✅ Correct path */}
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
