import React, { useEffect, useState } from "react";

const prefix = "coding-toy-";

export default function useLocalStorage(key, inintialValue) {
  const prefixedKey = prefix + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue !== null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return inintialValue();
    } else {
      return inintialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
