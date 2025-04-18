import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Account/Login";
import Admin from "./components/Admin/Admin";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";

const App: React.FC = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          {/* Login Route */}
          <AccountRoute path="/login" exact>
            <Login />
          </AccountRoute>

          {/* Dashboard/Admin Route */}
          <PrivateRoute path="/dashboard" exact>
            <Admin />
          </PrivateRoute>

          {/* Catch-all */}
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
