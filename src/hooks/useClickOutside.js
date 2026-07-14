import { useEffect } from "react";

export function useClickOutside(ref, handler) {
  useEffect(() => {
    function handleClick(event) {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    }

    function handleKeydown(event) {
      if (event.key === "Escape") handler(event);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [ref, handler]);
}
