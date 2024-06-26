import React, { useState } from 'react';

import styles from './main.module.scss';
import Toggle from '../../components/ui/Toggle/Toggle';
import CountrySearch from '../../components/SearchComponents/CountrySearch/CountrySearch';
import UserSearch from '../../components/SearchComponents/UserSearch/UserSearch';

const Main: React.FC = () => {
  const [isCountryPage, setIsCountryPage] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      <div className="flex-column-align-center">
        <p className="text-2xl-md">Search</p>
        <Toggle isChecked={isCountryPage} setIsChecked={setIsCountryPage} leftValue="Country" rightValue="User" />
      </div>
      <div>
        {
          {
            'false': <CountrySearch />,
            'true': <UserSearch />,
          }[isCountryPage.toString()]
        }
      </div>
    </div>
  );
};

export default Main;