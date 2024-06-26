import React from 'react';

import Button from 'src/components/ui/Button/Button';

import SearchItem from './CountrySearchItem/SearchItem';

import styles from './countrySearchTable.module.scss';

import { IGitHubUserWithActivity } from 'src/store/api/api.types';
import { arrayToCSV, transformUsersToCsvArray } from '../../../utils/functions';
import constants from '../../../utils/constants';

const CountrySearchTable: React.FC<{
  allUserData: IGitHubUserWithActivity[],
  refetch: () => void,
  hasNextPage: boolean,
  isFetching: boolean
}> = ({ allUserData, refetch, hasNextPage, isFetching }) => {

  const downloadCSV = () => {
    //Transforming array into formattable csv array
    const csvArray = transformUsersToCsvArray(allUserData);

    //Transforming array into csv string
    const csvContent = arrayToCSV(csvArray);

    const link = document.createElement('a');
    link.href = csvContent;
    link.download = `${constants.EXPORT_CSV_FILE_NAME}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return !!allUserData.length ? (
    <div className={styles.main}>
      <Button variant="text" iconName="download" iconRight onClick={downloadCSV}>Download CSV</Button>
      <div className={styles.userBox_box_shadow}>
        <div className={styles.wrapper}>
          <div className={styles.userBox_box}>
            {
              allUserData.map((user) => {
                return <SearchItem key={user.login} user={user} />;
              })
            }
          </div>
          {allUserData.length > 5 && <div className={styles.userBox_box_shadow_top}></div>}
          <div className={styles.userBox}>
            {!!allUserData.length &&
              <Button disabled={!hasNextPage || isFetching} onClick={refetch} variant="outlined">Load
                More...</Button>}
          </div>
          {allUserData.length > 5 && <div className={styles.userBox_box_shadow_bottom}></div>}
        </div>
      </div>
    </div>

  ) : (<></>);
};

export default CountrySearchTable;