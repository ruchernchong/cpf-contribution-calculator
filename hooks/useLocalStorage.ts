import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const isClient = typeof window !== "undefined";

  const [value, setValue] = useState(() => {
    if (isClient) {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
