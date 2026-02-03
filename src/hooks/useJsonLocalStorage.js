import { useEffect, useState } from "react";

export function useJsonLocalStorage(key, initialValue) {
  const [value, setValue] = useState(function () {
    const json = localStorage.getItem(key);
    return JSON.parse(json) || initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value],
  );

  return [value, setValue];
}
