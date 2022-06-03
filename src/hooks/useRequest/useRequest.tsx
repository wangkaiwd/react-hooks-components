import { useEffect, useState } from "react";

interface IOptions {
  manual?: boolean;
  defaultParams?: any;
}

type RequestError = undefined | Error
type Service = (...args: any[]) => Promise<any>
const useRequest = (service: Service, options?: IOptions) => {
  const { manual = false, defaultParams } = options || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RequestError>(undefined);
  const [params, setParams] = useState<any[]>([]);
  const wrapperService: Service = (...args) => {
    setLoading(true);
    setParams(args);
    return service(...args)
      .catch((reason) => {
        setError(new Error(reason));
        return Promise.reject(reason);
      })
      .finally(() => setLoading(false));
  };
  const refresh = () => {
    return wrapperService(...params);
  };
  useEffect(() => {
    if (!manual) {
      wrapperService(defaultParams);
    }
    // how cancel subscribe in here ?
  }, []);
  return { run: wrapperService, params, refresh, loading, error };
};

export default useRequest;
