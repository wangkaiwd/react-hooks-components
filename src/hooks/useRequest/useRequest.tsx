import { useEffect, useState } from "react";

interface IOptions {
  manual?: boolean;
  defaultParams?: any;
}

type Service = (...args: any[]) => Promise<any>
const useRequest = (service: Service, options?: IOptions) => {
  const { manual = false, defaultParams } = options || {};
  const [params, setParams] = useState<any[]>([]);
  const wrapperService: Service = (...args) => {
    setParams(args);
    return service(...args);
  };
  const refresh = () => {
    return wrapperService(...params);
  };
  useEffect(() => {
    if (!manual) {
      wrapperService(defaultParams);
    }
  }, []);
  return { run: wrapperService, params, refresh };
};

export default useRequest;
