export const TokenManager = {
  setToken: (token: string) => {
    document.cookie = `accessToken=${token}; path=/; domain=localhost; max-age=86400; SameSite=Lax`;
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
      "accessToken=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  },
};
