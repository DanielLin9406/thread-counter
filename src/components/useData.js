import { useRef, useEffect } from "react";

export function useData(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
