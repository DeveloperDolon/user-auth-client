import { useMemo } from "react";

export const useSubdomain = () => {
  return useMemo(() => {
    const hostname = window.location.hostname;

    const isSubdomain =
      hostname !== import.meta.env.VITE_HOSTNAME && hostname.includes(import.meta.env.VITE_HOSTNAME);

    const shopName = isSubdomain ? hostname.split(".")[0] : null;
    const isMainDomain = !isSubdomain;
    console.log(hostname, import.meta.env.VITE_HOSTNAME, isSubdomain, shopName);
    return {
      isSubdomain,
      isMainDomain,
      shopName,
      hostname,
      fullDomain: window.location.origin,
    };
  }, []);
};
