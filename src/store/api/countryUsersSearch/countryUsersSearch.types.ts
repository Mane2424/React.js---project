import { IGithubUser, IPageInfo } from '../api.types';

export interface ICountryUserData {
  search: {
    pageInfo: IPageInfo,
    userCount: number,
    nodes: IGithubUser[]
  };
}