import { useState } from "react";

type FetchCallback<T, U> = (options: U, ...args: unknown[]) => Promise<T>;

interface UseFetchOptions {
  [key: string]: unknown;
}

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fn: (...args: unknown[]) => Promise<void>;
}

const useFetch = <T, U = UseFetchOptions>(
  cb: FetchCallback<T, U>,
  options: U = {} as U
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: unknown[]): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
