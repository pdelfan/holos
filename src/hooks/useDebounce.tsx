import { useEffect, useState } from "react";

interface Props {
  value: string;
  delay?: number;
}

export default function useDebounce(props: Props) {
  const { value, delay = 500 } = props;
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}
