import { destroyCookie, parseCookies, setCookie } from "nookies";
import { refreshRefToken, refreshToken } from "../authenticate";

const getToken = (): string | null => {
  const { "nextauth-token": token } = parseCookies();
  return token || null;
};

const getRefreshToken = (): string | null => {
  const { "nextauth-refresh-token": token } = parseCookies();
  return token || null;
};

const setToken = (token: string): void => {
  setCookie(null, "nextauth-token", token, {
    maxAge: 30 * 60,
    path: "/",
  });
};

const setRefreshToken = (token: string): void => {
  setCookie(null, "nextauth-refresh-token", token, {
    maxAge: 60 * 60,
    path: "/",
  });
};

const deleteAllCookies = (): void => {
  const cookies = parseCookies();

  Object.keys(cookies).forEach((cookieName) => {
    destroyCookie(null, cookieName);
  });
};
const refreshAccessToken = async (): Promise<void> => {
  try {
    const refreshTokenId = parseCookies()["nextauth-refresh-token"];

    if (refreshTokenId) {
      const response = await refreshToken({ refreshTokenId });

      if (response.token) {
        setToken(response.token);
      } else {
        deleteAllCookies();
        throw new Error("Unable to refresh access token");
      }
      if (response.access_token) {
      }
    } else {
      throw new Error("No refresh token available");
    }
  } catch (error) {
    deleteAllCookies();
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

const refreshRefreshToken = async (): Promise<void> => {
  try {
    const userId = parseCookies()["nextauth-id"];

    if (userId) {
      const response = await refreshRefToken(userId);

      if (response.refreshToken) {
        setRefreshToken(response.refreshTken.id);
        setToken(response.token);
      } else {
        deleteAllCookies();
        throw new Error("Unable to refresh refresh token");
      }
      if (response.access_token) {
      }
    } else {
      throw new Error("No refresh token available");
    }
  } catch (error) {
    deleteAllCookies();
    console.error("Error refreshing refresh token:", error);
    throw error;
  }
};
export {
  deleteAllCookies,
  getToken,
  setToken,
  refreshAccessToken,
  getRefreshToken,
  setRefreshToken,
  refreshRefreshToken,
};
