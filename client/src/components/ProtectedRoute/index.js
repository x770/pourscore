import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withContext } from '../../context/appContext';

function protectedRoute(props) {
  const { component: Component, ...rest } = props;

  return (
    props.state.token ?
      <Route {...rest} component={Component} /> :
      <Redirect to='/login' />
  )
}

export default withContext(protectedRoute);