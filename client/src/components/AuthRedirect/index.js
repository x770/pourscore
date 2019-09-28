import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withContext } from '../../context/appContext';

function AuthRedirect(props) {
  const { component: Component, ...rest } = props;

  return (
    props.state.token ?
      <Redirect to='/dashboard' /> :
      <Route {...rest} component={Component} />
  )
}

export default withContext(AuthRedirect);