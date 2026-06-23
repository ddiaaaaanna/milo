import { useState, useEffect } from "react";

function useFetch<T>(apiUrl: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error handling data");
        setIsLoading(false);
      });
  }, [apiUrl]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useFetch;
