import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import PrivateRoute from "authentication/PrivateRoute";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <PrivateRoute exact path={`${APP_PREFIX_PATH}/`}>
          <Redirect to={`${APP_PREFIX_PATH}/home`} />
        </PrivateRoute>
        <PrivateRoute path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        
        <PrivateRoute path={`${APP_PREFIX_PATH}/404`} component={lazy(() => import(`./errors/error-page-1`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/server-error`} component={lazy(() => import(`./errors/error-page-2`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/404`} />
        
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);