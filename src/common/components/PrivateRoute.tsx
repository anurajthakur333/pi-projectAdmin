import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { IAccount } from "../../store/models/account.interface";

export function PrivateRoute({ children, ...rest }: RouteProps): JSX.Element {
  const account: IAccount = useSelector((state: IStateType) => state.account);

  // ✅ Read from redux OR from localStorage
  const isAuthenticated = account.email || localStorage.getItem('adminEmail');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
