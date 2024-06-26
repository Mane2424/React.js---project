import React, { useEffect, useState } from 'react';

import Button from 'src/components/ui/Button/Button';
import Input from 'src/components/ui/Input/Input';
import LinearLoading from 'src/components/ui/LinearLoading/LinearLoading';
import CountrySearchUser from '../CountrySearchUser/CountrySearchUser';

import { useGetUserQuery } from 'src/store/api/userSearch/userSearch.api';

import styles from './userSearch.module.scss';

import { IGitHubUserWithActivity } from 'src/store/api/api.types';
import { transformUsersWithActivity } from '../../../utils/functions';

const UserSearch: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [lastSearchedUser, setLastSearchedUser] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');
  const [followers, setFollowers] = useState<IGitHubUserWithActivity[]>([]);

  const { data: user, isLoading, isFetching } = useGetUserQuery({ username, endCursor }, {
    skip: !isSubmitted,
    refetchOnMountOrArgChange: true,
  });

  const loadMore = () => {
    setEndCursor(user?.followers.pageInfo.endCursor || '');
  };

  const buttonDisabled = username.length <= 3 || isLoading || isFetching;

  useEffect(() => {
    if (user && lastSearchedUser.toLowerCase() === user.login.toLowerCase() && !isFetching) {
      setFollowers([...followers, ...transformUsersWithActivity(user?.followers.nodes || [])]);
    } else if (user && lastSearchedUser.toLowerCase() !== user.login.toLowerCase() && !isFetching) {
      setFollowers(transformUsersWithActivity(user?.followers.nodes || []));
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (lastSearchedUser !== user?.login) {
      setFollowers([]);
      setEndCursor('');
    }
  }, [lastSearchedUser]);


  return (
    <div className={styles.main}>
      <div className={styles.main_searchBox}>
        <Input
          className={styles.main_select}
          value={username}
          onChange={(e) => {
            if (isSubmitted) setIsSubmitted(false);
            setUsername(e.target.value);
          }}
        />
        <Button disabled={buttonDisabled} iconName="search" onClick={() => {
          setIsSubmitted(true);
          setLastSearchedUser(username);
        }}>Search</Button>
      </div>
      <LinearLoading loading={isLoading || isFetching} />
      <CountrySearchUser allFollowers={followers} user={user} loadMore={loadMore} isLoading={isLoading}
                         isFetching={isFetching} />
    </div>
  );
};

export default UserSearch;