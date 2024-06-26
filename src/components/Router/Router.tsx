import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Main } from 'src/pages';
import CountryUser from '../../pages/CountryUser/CountryUser';

const Routes: React.FC = () => {
  const routes = [
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/country/:username',
      element: <CountryUser />,
    },
  ];

  return useRoutes(routes);
};

export default Routes;