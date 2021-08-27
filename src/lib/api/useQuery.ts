import { useState, useEffect, useCallback, useReducer } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  error: boolean;
  loading: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; payload: TData }
  | { type: 'FETCH_ERROR' };

const reducer =
  <TData>() =>
  (state: State<TData>, action: Action<TData>): State<TData> => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { data: action.payload, loading: false, error: false };

      case 'FETCH_ERROR':
        return { ...state, loading: false, error: true };
      default:
        throw new Error();
    }
  };

export const useQuery = <TData = any>(query: string) => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    error: false,
    loading: false,
  });
  // const [state, setState] = useState<State<TData>>({
  //   data: null,
  //   error: false,
  //   loading: false,
  // });

  const fetch = useCallback(() => {
    try {
      const fetchApi = async () => {
        dispatch({ type: 'FETCH' });
        // setState({ data: null, loading: true, error: false });
        const { data } = await server.fetch<TData>({ query });

        // setState({ data, loading: false, error: false });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      };
      fetchApi();
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR' });
      // setState({ data: null, error: true, loading: false });

      throw console.error(error);
    }
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
