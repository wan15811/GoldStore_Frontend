import {
  getRefreshToken,
  getToken,
  refreshAccessToken,
  refreshRefreshToken,
} from "./token";

const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

const api = async (url: string, options: RequestInit = {}): Promise<any> => {
  try {
    const token = getToken();
    const refToken = getRefreshToken();
    console.log("refresh token", refToken);
    console.log(token);
    const defaultOptions: RequestInit = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.headers,
      },
      ...(options.body && { body: options.body }),
    };
    console.log(`${baseURL}${url}`, defaultOptions);
    const response = await fetch(`${baseURL}${url}`, defaultOptions);

    if (!refToken && token && !url.startsWith("/auth/refresh-token/-")) {
      console.log("refresh token");
      await refreshRefreshToken();
    }

    if (!response.ok) {
      const errorData = await response.json();
      if (
        response.status === 401 &&
        !url.startsWith("/admin/login/") &&
        !url.startsWith("/auth/refresh-token/-")
      ) {
        await refreshAccessToken();
        getToken();
        return api(url, options);
      }

      throw new Error(`${errorData.error}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error while making the request:", error);
    throw error;
  }
};

export { api, baseURL };
