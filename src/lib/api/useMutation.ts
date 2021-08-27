import { useState } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false,
  });

  const fetch = async (variables?: TVariables) => {
    try {
      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });
      //setting data to null and loading initially
      setState({ data: null, loading: true, error: false });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      //updating data to the selected item and loading initially
      setState({ data, loading: false, error: false });
    } catch (error) {
      setState({ data: null, loading: false, error: true });
      throw console.error(error);
    }
  };

  return [fetch, state];
};
