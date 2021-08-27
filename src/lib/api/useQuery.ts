import { useState, useEffect, useCallback } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  error: boolean;
  loading: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

const reducer = (state, action) => {
  switch () {
  
}
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    error: false,
    loading: false,
  });

  const fetch = useCallback(() => {
    try {
      const fetchApi = async () => {
        setState({ data: null, loading: true, error: false });
        const { data } = await server.fetch<TData>({ query });

        setState({ data, loading: false, error: false });
      };
      fetchApi();
    } catch (error) {
      setState({ data: null, error: true, loading: false });

      throw console.error(error);
    }
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
