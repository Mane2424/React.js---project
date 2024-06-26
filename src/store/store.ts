import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { countryUsersSearch } from './api/countryUsersSearch/countryUsersSearch.api';
import { userSearch } from './api/userSearch/userSearch.api';

export const store = configureStore({
  reducer: {
    [countryUsersSearch.reducerPath]: countryUsersSearch.reducer,
    [userSearch.reducerPath]: userSearch.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countryUsersSearch.middleware, userSearch.middleware),
});

setupListeners(store.dispatch);