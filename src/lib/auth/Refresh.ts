import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

export async function refreshAccessToken(token: JWT) {
  try {

    const response = await fetch("http://localhost:3001/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw response.statusText;
    }

    console.log("=== Đã làm mới Access Token thành công ===", refreshedTokens);
    const decoded = jwtDecode(refreshedTokens.accessToken);
    console.log("decoded refresh", decoded);
    const expiredTime = decoded.exp ? decoded.exp * 1000 : 0;
    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      expiredTime: expiredTime,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Lỗi RefreshAccessToken:", error);
    throw error;
  }
}