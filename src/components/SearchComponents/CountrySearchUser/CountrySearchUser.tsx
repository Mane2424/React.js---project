import React from 'react';
import classNames from 'classnames';


import Icon from 'src/components/ui/Icon/Icon';
import CountrySearchTable from '../CountrySearchTable/CountrySearchTable';

import { transformUsersWithActivity, calculateTotalContributions } from 'src/utils/functions';

import styles from './countrySearchUser.module.scss';

import { IGitHubUserWithActivity } from 'src/store/api/api.types';

interface ICountryUser {
  user?: IGitHubUserWithActivity;
  isLoading: boolean;
  isFetching: boolean;
  loadMore: () => void;
  allFollowers: IGitHubUserWithActivity[];
}

const CountrySearchUser: React.FC<ICountryUser> = ({ user, isFetching, loadMore, allFollowers }) => {

  const activityColorClass = classNames(styles.pro, user?.activity);

  if (!user) {
    return <></>;
  }

  return (
    <div className={styles['card']}>
      {!!user && <div className={styles['card']}>
        <div className={styles['card-container']}>
          <span className={activityColorClass}>{user?.activity.toUpperCase()}</span>
          <img className={styles['round']} src={user?.avatarUrl} alt="user" />
          <h3>{user?.login}</h3>
          <div className={styles['card-container-location']}><Icon name="location" /><span>{user?.location}</span></div>
          <div className={styles['card-container-description']}>
            <p>{user.followers.totalCount} Followers</p>
            <p>{calculateTotalContributions(user.contributionsCollection)} Total Contributions</p>
          </div>
        </div>
        <CountrySearchTable allUserData={allFollowers} refetch={loadMore}
                            hasNextPage={user.followers.pageInfo.hasNextPage} isFetching={isFetching} />
      </div>}
    </div>

  );
};

export default CountrySearchUser;