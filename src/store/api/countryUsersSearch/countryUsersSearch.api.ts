import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { environments } from 'src/utils/environment';

import { calculateActivity } from 'src/utils/functions/calculateActivity';

import { ICountryUserData } from './countryUsersSearch.types';
import { IAPIResponse, IGitHubUserWithActivity, IPageInfo } from '../api.types';

export const countryUsersSearch = createApi({
  reducerPath: 'countryUsersSearch/api',
  baseQuery: fetchBaseQuery({ baseUrl: environments.CORE.API_URL }),
  endpoints: (builder) => ({
    getCountryUsers: builder.query({
      query: ({ country, endCursor }) => `users/country/${country}?endCursor=${endCursor}`,
      transformResponse(baseQueryReturnValue: IAPIResponse<ICountryUserData>): {
        users: IGitHubUserWithActivity[],
        pageInfo: IPageInfo,
        usersCount: number
      } {
        return {
          users: baseQueryReturnValue.data.search.nodes.filter(user => !!Object.keys(user).length).map(user => ({
            ...user,
            activity: calculateActivity(user?.contributionsCollection?.totalCommitContributions),
          } as IGitHubUserWithActivity)),
          pageInfo: baseQueryReturnValue.data.search.pageInfo,
          usersCount: baseQueryReturnValue.data.search.userCount,
        };
      },
    }),
  }),
});

export const { useGetCountryUsersQuery } = countryUsersSearch;