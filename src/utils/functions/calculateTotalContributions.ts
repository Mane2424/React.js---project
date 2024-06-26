import { IContributionsCollection } from 'src/store/api/api.types';

export const calculateTotalContributions = (contributionCollection: IContributionsCollection) => {
  let total = 0;
  for (const key in contributionCollection) {
    if (typeof contributionCollection[key as keyof IContributionsCollection] === 'number') {
      total += contributionCollection[key as keyof IContributionsCollection];
    }
  }
  return total;
};