import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages/Home';
import { PageWithTabs } from '../../pages/WithTabs';
import { WithDrilldown } from '../../pages/WithDrilldown';
import { prefixRoute } from '../../utils/utils.routing';
import { ROUTES } from '../../constants';
import { HelloWorldPluginPage } from '../../pages/HelloWorld';
import { SPlotPluginPage } from '../../pages/SPlot';

export const Routes = () => {
  return (
    <Switch>
      <Route path={prefixRoute(`${ROUTES.WithTabs}`)} component={PageWithTabs} />
      <Route path={prefixRoute(`${ROUTES.WithDrilldown}`)} component={WithDrilldown} />
      <Route path={prefixRoute(`${ROUTES.Home}`)} component={HomePage} />
      <Route path={prefixRoute(`${ROUTES.HelloWorld}`)} component={HelloWorldPluginPage} />
      <Route path={prefixRoute(`${ROUTES.SPlot}`)} component={SPlotPluginPage} />
      <Redirect to={prefixRoute(ROUTES.Home)} />
    </Switch>
  );
};
