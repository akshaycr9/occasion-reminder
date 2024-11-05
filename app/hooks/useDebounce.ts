import { useEffect, useState } from "react";

export function useDebounce<T = any>(value: T, delay: number): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState(value);
  let [isDebouncing, setDebouncing] = useState(false);
  useEffect(() => {
    if (value === debouncedValue) return;
    setDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncing(false);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return [debouncedValue, isDebouncing];
}
