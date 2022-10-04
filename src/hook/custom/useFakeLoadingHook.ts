import { useEffect, useState } from 'react';

const useFakeLoadingHook = (
  changingVariable: any,
  timeout?: number
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, timeout || 5000);
  }, [changingVariable]);
  return loading;
};

export default useFakeLoadingHook;
