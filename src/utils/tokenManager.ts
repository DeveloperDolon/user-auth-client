

export const TokenManager = {
  setToken: (token: string) => {
    const hostname = window.location.hostname;
    const domain =
      hostname.endsWith("." + import.meta.env.VITE_HOSTNAME) ? hostname : import.meta.env.VITE_HOSTNAME;
    document.cookie = `accessToken=${token}; path=/; domain=${domain}; max-age=86400; SameSite=Lax`;
    localStorage.setItem("accessToken", token);
  },

  getToken: () => {
    const localToken = localStorage.getItem("accessToken");
    if (localToken) return localToken;

    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "accessToken") {
        localStorage.setItem("accessToken", value);
        return value;
      }
    }
    return null;
  },

  removeToken: () => {
    localStorage.removeItem("accessToken");
    document.cookie =
      `accessToken=; path=/; domain=${import.meta.env.VITE_HOSTNAME}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  },
};
