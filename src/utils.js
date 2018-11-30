import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const login = () => localStorage.setItem("logged", true);

export const returnRoute = (
  { name, path, component, exact, redirect, from, to },
  key
) => {
  if (redirect) {
    return (
      <Redirect exact={exact} key={`${name}+${key + 1}`} from={from} to={to} />
    );
  }
  return (
    <Route
      exact={exact}
      path={path}
      component={component}
      key={`${name}+${key + 1}`}
    />
  );
};

returnRoute.propTypes = {
  name: PropTypes.string.isRequired,
  redirect: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

returnRoute.defaultProps = {
  redirect: false,
  exact: false
};
