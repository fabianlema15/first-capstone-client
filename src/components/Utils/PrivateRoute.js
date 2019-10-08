import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'
import Helper from './Helper'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => {
        let hasAccess = false;
        const decoded = TokenService.decodeUser();
        if (decoded) hasAccess = Helper.roleHasAccess(decoded.role, componentProps.match.path)
        return TokenService.hasAuthToken() && hasAccess
          ? <Component {...componentProps} />
          : ( TokenService.hasAuthToken() && !hasAccess ? <Redirect
              to={{
                pathname: '/notaccess',
                state: { from: componentProps.location }
              }}
            /> : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />)
      }}
    />
  )
}
