// lib/authOptions.ts (hoặc file logic auth của bạn)

import { JWT } from "next-auth/jwt";
// import { refresh } from "next/cache";
import { jwtDecode } from "jwt-decode";

/**
 * Hàm này nhận vào token cũ, gọi sang NestJS để lấy token mới
 * và trả về một object token đã được cập nhật.
 */
export async function refreshAccessToken(token: JWT) {
  try {

    const response = await fetch("http://localhost:3001/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Gửi refresh token mà bạn đã lưu trong session trước đó
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
      // Cập nhật thời gian hết hạn mới (giây)
      expiredTime: expiredTime,
      // Nếu NestJS trả về Refresh Token mới (Rotating), hãy lấy nó. 
      // Nếu không, hãy giữ lại Refresh Token cũ.
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Lỗi RefreshAccessToken:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError", // Đánh dấu lỗi để xử lý ở Client/Proxy
    };
  }
}