import { useState } from "react";

/**
 * useToggle - A simple hook to toggle a boolean value.
 * @param initial Initial value (default: false)
 * @returns [value, toggle]
 */
export function useToggle(initial: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}
