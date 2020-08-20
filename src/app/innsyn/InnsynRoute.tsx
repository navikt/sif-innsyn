import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from '../config/routeConfig';

const InnsynRoute: React.FC = (): JSX.Element => <Redirect to={RouteConfig.OVERSIKT} />;

export default InnsynRoute;
