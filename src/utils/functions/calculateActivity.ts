import { ECommitActivity } from 'src/types/enums';

export const calculateActivity = (totalCommits: number) => {
  if (totalCommits !== 0 && !totalCommits) return ECommitActivity.low;

  if (totalCommits < 100) return ECommitActivity.low;
  if (totalCommits > 100 && totalCommits < 300) return ECommitActivity.medium;
  if (totalCommits > 300) return ECommitActivity.high;

  return ECommitActivity.low;
};