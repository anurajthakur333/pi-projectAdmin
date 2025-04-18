import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { IAccount } from "../../store/models/account.interface";

export function AccountRoute({ children, ...rest }: RouteProps): JSX.Element {
  const account: IAccount = useSelector((state: IStateType) => state.account);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !account.email ? (
          children // 👈 Show login page children if NOT logged in
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard", // ✅ After login redirect here
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
