import { useEffect } from "react";

export default function useWarnClone() {
  useEffect(() => {
    alert();
  }, []);
}
