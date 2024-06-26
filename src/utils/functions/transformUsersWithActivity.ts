import { calculateActivity } from './calculateActivity';

import { IGithubUser, IGitHubUserWithActivity } from 'src/store/api/api.types';

export const transformUsersWithActivity = (users: IGithubUser[]) => {
  return users.filter(user => !!Object.keys(user).length).map(user => ({
    ...user,
    activity: calculateActivity(user?.contributionsCollection?.totalCommitContributions),
  } as IGitHubUserWithActivity))
}