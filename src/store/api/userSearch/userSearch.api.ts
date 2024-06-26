import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { environments } from 'src/utils/environment';
import { calculateActivity } from 'src/utils/functions/calculateActivity';

import { IAPIResponse, IGithubUser, IGitHubUserWithActivity } from '../api.types';

export const userSearch = createApi({
  reducerPath: 'userSearch/api',
  baseQuery: fetchBaseQuery({ baseUrl: environments.CORE.API_URL }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ username, endCursor }) => {
        return `users/getWithLogin/${username}?cursor=${endCursor}`;
      },
      transformResponse(baseQueryReturnValue: IAPIResponse<{ user: IGithubUser }>): IGitHubUserWithActivity {
        return {
          ...baseQueryReturnValue.data.user,
          activity: calculateActivity(baseQueryReturnValue.data.user.contributionsCollection.totalCommitContributions),
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = userSearch;