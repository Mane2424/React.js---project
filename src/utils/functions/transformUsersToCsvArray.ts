import { calculateTotalContributions } from './calculateTotalContributions';

import { IGitHubUserWithActivity } from 'src/store/api/api.types';

export const transformUsersToCsvArray = (users: IGitHubUserWithActivity[]) => {
  const csvArray = users.map((user) => {
    return [
      user.login || '',
      user.email || '',
      calculateTotalContributions(user.contributionsCollection) || '',
      user.location || '',
      user.followers.totalCount || '',
      user.activity || '',
    ];
  });
  csvArray.unshift([
    'Login',
    'Email',
    'Total Contributions',
    'Location',
    'Followers',
    'Activity',
  ]);
  return csvArray;
};