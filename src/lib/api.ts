import useSWR from 'swr/immutable';

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ENDPOINT = {
  MOST_ACTIVE_USERS:
    'https://raw.githubusercontent.com/depapp/most-active-github-users-counter/master/indogithubers.json',
  LAST_UPDATED_DATE:
    'https://api.github.com/repos/depapp/most-active-github-users-counter/commits?path=indogithubers.json&per_page=1',
};

export interface User {
  avatarUrl: string;
  company: string;
  contributionRank: number;
  contributions: number;
  followerRank: number;
  followers: number;
  name: string;
  username: string;
}

export interface MostActiveResponse {
  MinimumFollowerCount: number;
  users: User[];
}

export const useMostActiveUsers = () => {
  const { data, error, isLoading } = useSWR<MostActiveResponse>(
    ENDPOINT.MOST_ACTIVE_USERS,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};

export const useLatestUpdate = () => {
  const { data, error, isLoading } = useSWR(
    ENDPOINT.LAST_UPDATED_DATE,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};
