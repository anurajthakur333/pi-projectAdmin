import React from "react"; // ✅ MUST BE PRESENT
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { IAccount } from "../../store/models/account.interface";

export function PrivateRoute({ children, ...rest }: RouteProps): JSX.Element {
  const account: IAccount = useSelector((state: IStateType) => state.account);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        account.email ? (
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
