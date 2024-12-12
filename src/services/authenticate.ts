import { api } from "@/services/api";

export interface LoginData {
  username: string;
  password: string;
}

async function signInRequest(loginData: LoginData): Promise<any> {
  try {
    const response = await api("/admin/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      cache: "no-store",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function refreshToken(refreshTokenId: object): Promise<any> {
  try {
    const response = await api("/auth/refresh-token/", {
      method: "POST",
      body: JSON.stringify(refreshTokenId),
      cache: "no-store",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function refreshRefToken(id: string): Promise<any> {
  try {
    const response = await api(`/auth/refresh-token/-${id}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function recoverUserInformation(refreshTokenId: string, id: string) {
  try {
    const response = await api(`/auth/user/-${id}`, {
      method: "POST",
      body: JSON.stringify({
        refreshTokenId: refreshTokenId,
      }),
      cache: "no-store",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export { signInRequest, recoverUserInformation, refreshToken, refreshRefToken };
