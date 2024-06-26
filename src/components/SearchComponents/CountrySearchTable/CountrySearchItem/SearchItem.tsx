import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ECommitActivity } from 'src/types/enums';

import { IGitHubUserWithActivity } from 'src/store/api/api.types';
import styles from './searchItem.module.scss';

const SearchItem: React.FC<{ user: IGitHubUserWithActivity }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.item} onClick={() =>
      navigate(`/country/${user.login}`)
    }>
      <div className={styles.item_imgBox}>
        <img alt="User Logo"
             src={user.avatarUrl} />
        <p>{user.login}</p>
      </div>
      <div className={styles.item_content}>
        <div className={styles.item_content_box}>
          <p>Activity</p>
          <p className={ECommitActivity[user.activity]}>{user.activity}</p>
        </div>
        <div className={styles.item_content_box}>
          <p>Location</p>
          <p>{user.location}</p>
        </div>
        <div className={styles.item_content_box}>
          <p>Followers</p>
          <p>{user.followers.totalCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;