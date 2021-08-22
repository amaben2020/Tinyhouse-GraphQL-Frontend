import { useState, useEffect, useCallback } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  error: boolean;
  loading: boolean;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    error: false,
    loading: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      const { data } = await server.fetch<TData>({ query });

      setState({ data, loading: false, error: false });
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
