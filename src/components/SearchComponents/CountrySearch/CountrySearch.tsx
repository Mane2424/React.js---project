import React, { useEffect, useState } from 'react';

import { useGetCountryUsersQuery } from 'src/store/api/countryUsersSearch/countryUsersSearch.api';

import Select from 'src/components/ui/Select/Select';
import LinearLoading from 'src/components/ui/LinearLoading/LinearLoading';
import CountrySearchTable from '../CountrySearchTable/CountrySearchTable';

import { countries } from 'src/utils/json';

import styles from './countrySearch.module.scss';

import { IGitHubUserWithActivity } from 'src/store/api/api.types';

const CountrySearch: React.FC = () => {
  const [selected, setSelected] = useState({} as { key: string, value: string });
  const [isActiveSelect, setIsActiveSelect] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');

  const [allUserData, setAllUserData] = useState<IGitHubUserWithActivity[]>([]);

  const { data, isLoading, isFetching, refetch } = useGetCountryUsersQuery({
    country: selected.key || '',
    endCursor: endCursor,
  }, {
    skip: !selected.key,
  });

  const loadMore = () => {
    setEndCursor(data?.pageInfo.endCursor || '');
  };

  const changeCountry = (item: { key: string, value: string }) => {
    setEndCursor('');
    setSelected(item);
  };

  useEffect(() => {
    if (!!selected.key) {
      setEndCursor(() => '');
      setAllUserData([]);
    }
  }, [selected.key]);

  useEffect(() => {
    if (data) {
      setAllUserData(prevData => [...prevData, ...data.users]);
    }
  }, [data]);

  return (
    <div className={styles.main}>
      <Select
        isActive={isActiveSelect}
        setIsActive={setIsActiveSelect}
        selected={selected}
        setIsSelected={changeCountry}
        optionGroup={countries}
        className={styles.main_select}
        disabled={isLoading || isFetching}
      />
      <LinearLoading loading={isLoading || isFetching} />
      <CountrySearchTable allUserData={allUserData} refetch={loadMore}
                          hasNextPage={data?.pageInfo.hasNextPage || false} isFetching={isFetching} />
    </div>
  );
};

export default CountrySearch;