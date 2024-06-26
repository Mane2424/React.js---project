import { ECommitActivity } from '../../types/enums';

export interface IAPIResponse<T> {
  data: T,
  message: string,
  code: number,
  errorData?: unknown,
}

export interface IGithubUser {
  login: string;
  id: string;
  email: string | null;
  avatarUrl: string;
  location: string | null;
  followers: IFollowers;
  contributionsCollection: IContributionsCollection;
}

export interface IGitHubUserWithActivity extends IGithubUser {
  activity: ECommitActivity;
}

export interface IContributionsCollection {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  restrictedContributionsCount: number;
}

export interface IPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IFollowers {
  pageInfo: IPageInfo;
  totalCount: number;
  nodes: IGithubUser[];
}