type Listener = (data: any) => void

interface CacheItem {
  params?: any;
  data?: any;
  listeners: Listener[];
}

const cache = new Map<string, CacheItem>();
export const getCache = (key: string) => {
  return cache.get(key)?.data;
};

export const setCache = (key: string, data: any) => {
  const item = cache.get(key);
  if (!item) {
    cache.set(key, { data, listeners: [] });
  } else {
    item.data = data;
  }
};

export const trackCache = (key: string, cb: Listener) => {
  if (!cache.has(key)) {
    cache.set(key, { listeners: [] });
  }
  const items = cache.get(key)?.listeners!;
  items.push(cb);
};
export const triggerCache = (key: string) => {
  if (!cache.has(key)) {
    return;
  }
  const cacheItem = cache.get(key)!;
  const { listeners, data } = cacheItem;
  listeners.forEach((listener) => listener(data));
};
