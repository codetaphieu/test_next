import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

// 1. Mở rộng interface của next-auth
declare module "next-auth" {
  /**
   * Định nghĩa lại kiểu dữ liệu của đối tượng User 
   * (Là kết quả trả về từ hàm authorize sau khi gọi API Login backend thành công)
   */
  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiredTime?: number;
  }

  /**
   * Định nghĩa lại kiểu dữ liệu của Session
   * (Là kết quả bạn nhận được khi gọi useSession() ở Client hoặc getServerSession() ở Server)
   */
  interface Session {
    token: JWT;
    error?: string;
    user: {
      id: string;
      // Kế thừa các thuộc tính mặc định của user như name, email, image
    } & DefaultSession["user"];
  }
}

// 2. Mở rộng interface của next-auth/jwt
declare module "next-auth/jwt" {
  /**
   * Định nghĩa lại kiểu dữ liệu của JWT Token
   * (Là tham số token trong các callback jwt và session)
   */
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiredTime: number;
    error?: string;
  }
}

declare module "jwt-decode" {
  interface JwtPayload {
    userId: string;
    email: string;
    username: string;
    exp: number;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    refreshToken: string;
    error?: string;
  }
}