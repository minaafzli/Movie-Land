import { useEffect } from "react";

export default function useClickOutside(ref, callback , ignoreRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ignoreRef?.current && ignoreRef.current.contains(event.target)) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback , ignoreRef]);
}
