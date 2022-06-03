import { useEffect, useRef, useState } from "react";

interface Options {
  manual?: boolean;
  defaultParams?: any;
  pollingInterval?: number;
  cancel?: () => void;
}

type RequestError = undefined | Error
type Service = (...args: any[]) => Promise<any>
const useRequest = (service: Service, options?: Options) => {
  const { manual = false, defaultParams, pollingInterval } = options || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RequestError>(undefined);
  const [params, setParams] = useState<any[]>([]);
  const timerId = useRef<null | number>(null);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const cancel = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  };
  const enablePolling = () => {
    timerId.current = window.setTimeout(() => {
      wrapperService(...paramsRef.current);
    }, pollingInterval);
  };
  const wrapperService: Service = (...args) => {
    setLoading(true);
    setParams(args);
    return service(...args)
      .catch((reason) => {
        setError(new Error(reason));
        return Promise.reject(reason);
      })
      .finally(() => {
        setLoading(false);
        if (pollingInterval) {
          enablePolling();
        }
      });
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
  return { runAsync: wrapperService, params, refresh, loading, error, cancel };
};

export default useRequest;
