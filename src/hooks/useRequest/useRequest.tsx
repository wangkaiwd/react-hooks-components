import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getCache, setCache, trackCache, triggerCache } from "../../utils/cache";

interface Options {
  manual?: boolean;
  defaultParams?: any;
  pollingInterval?: number;
  cancel?: () => void;
  retryCount?: number;
  retryInterval?: number;
  cacheKey?: string;
}

type RequestError = undefined | Error
type Service = (...args: any[]) => Promise<any>
const useRequest = (service: Service, options: Options = {}) => {
  const {
    manual = false,
    defaultParams,
    pollingInterval,
    retryCount,
    retryInterval,
    cacheKey
  } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RequestError>(undefined);
  const [params, setParams] = useState<any[]>([]);
  const [data, setData] = useState(null);
  const countRef = useRef(1);
  const pollingTimerIdRef = useRef<null | number>(null);
  const retryTimerIdRef = useRef<null | number>(null);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const cancelPolling = () => {
    cancelCreator(pollingTimerIdRef);
  };
  const cancelCreator = (timerIdRef: MutableRefObject<null | number>) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  };
  const cancelRetry = () => {
    cancelCreator(retryTimerIdRef);
  };
  const cancel = () => {
    cancelPolling();
    cancelRetry();
  };
  const enablePolling = () => {
    if (pollingInterval) {
      pollingTimerIdRef.current = window.setTimeout(() => {
        refresh();
      }, pollingInterval);
    }
  };
  const onRetry = () => {
    if (retryCount && retryCount >= countRef.current) {
      countRef.current++;
      const interval = retryInterval || 1000 * Math.pow(2, retryCount);
      retryTimerIdRef.current = window.setTimeout(() => {
        refresh();
      }, interval);
    }
  };
  const wrapperService: Service = (...args) => {
    setLoading(true);
    setParams(args);
    return service(...args)
      .then((res) => {
        if (cacheKey) {
          setCache(cacheKey, { data: res, params: args });
          triggerCache(cacheKey);
        }
        return res;
      })
      .catch((reason) => {
        setError(new Error(reason));
        onRetry();
        // This line code will cause jest error
        // How to catch error?
        return Promise.reject(reason);
      })
      .finally(() => {
        setLoading(false);
        enablePolling();
      });
  };
  const refresh = () => {
    return wrapperService(...paramsRef.current).catch((error) => {
      // console.log("error", error);
    });
  };
  useEffect(() => {
    if (cacheKey) {
      // update all cacheKey(share data)
      const cacheData = getCache(cacheKey);
      setData(cacheData?.data);
      trackCache(cacheKey, (data) => {
        setData(data);
      });
    }
    if (!manual) {
      wrapperService(defaultParams).catch((error) => {
        // console.log("error", error);
      });
    }
    return cancel;
    // how cancel subscribe in here ?
  }, []);
  return { runAsync: wrapperService, params: paramsRef.current, refresh, loading, error, cancel, data };
};

export default useRequest;
