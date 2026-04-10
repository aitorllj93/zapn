


export const createCache = <T extends object>() => {
  const cache = new Map<string, T>();

  const set = async (key: string, val: T) =>  {
    return cache.set(key, val);
  }

  const get = async (key: string): Promise<T | undefined> => {
    return cache.get(key);
  }

  return {
    get,
    set
  }
}