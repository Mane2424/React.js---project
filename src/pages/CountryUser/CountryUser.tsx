import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Icon from 'src/components/ui/Icon/Icon';
import LinearLoading from 'src/components/ui/LinearLoading/LinearLoading';
import CountrySearchUser from 'src/components/SearchComponents/CountrySearchUser/CountrySearchUser';

import { useGetUserQuery } from 'src/store/api/userSearch/userSearch.api';

import styles from './countryUser.module.scss';
import { IGitHubUserWithActivity } from '../../store/api/api.types';
import { transformUsersWithActivity } from '../../utils/functions';

const CountryUser: React.FC = () => {
  const [endCursor, setEndCursor] = useState<string>('');
  const [selectedUsername, setSelectedUsername] = useState<string | undefined>(undefined);
  const [followers, setFollowers] = useState<IGitHubUserWithActivity[]>([]);

  const { username } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, isFetching, isSuccess } = useGetUserQuery({
    username: selectedUsername,
    endCursor: username === selectedUsername ? endCursor : '',
  }, {
    skip: !Boolean(selectedUsername),
  });

  const loadMore = () => {
    setEndCursor(user?.followers.pageInfo.endCursor || '');
  };

  useEffect(() => {
    if (user && selectedUsername === user.login && !isFetching) {
      setFollowers([...followers, ...transformUsersWithActivity(user?.followers.nodes || [])]);
    } else if (user && selectedUsername !== user.login && !isFetching) {
      setFollowers(transformUsersWithActivity(user?.followers.nodes || []));
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    setSelectedUsername(username);
    if (selectedUsername !== username) {
      setFollowers([]);
      setEndCursor('');
    }
  }, [username]);

  return (
    <div className={styles.countryUser}>
      <div className={styles.countryUser_loader}>
        <LinearLoading loading={isLoading || isFetching} />
      </div>
      <Icon name="goBack" width={30} className={styles.countryUser_goBack} onClick={() => navigate('/')} />
      {
        !!username ?
          <CountrySearchUser user={user} allFollowers={followers} isFetching={isFetching} isLoading={isLoading}
                             loadMore={loadMore} />
          :
          <div>Not Found!</div>
      }
    </div>
  );
};

export default CountryUser;