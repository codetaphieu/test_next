import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Đảm bảo đường dẫn này khớp với vị trí file RefreshLock trong thư mục lib của bạn
import { refreshWithLock } from "@/lib/auth/RefreshLock"; 

export const authOptions: NextAuthOptions = {
    // TÔI ĐÃ THÊM DÒNG NÀY ĐỂ FIX LỖI DECRYPTION FAILED
    secret: process.env.NEXTAUTH_SECRET, 
    
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Gọi API Login sang Backend NestJS
                const res = await fetch(`http://localhost:3001/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });
                
                const token = await res.json();
                
                if (res.ok && token) {
                    // Giải mã token để lấy thông tin User
                    const decoded = jwtDecode<JwtPayload>(token.accessToken);
                    return {
                        id: decoded.userId,
                        email: decoded.email,
                        name: decoded.username,
                        accessToken: token.accessToken,
                        refreshToken: token.refreshToken,
                        expiredTime: decoded.exp ? decoded.exp * 1000 : 0,
                    };
                }
                // Đăng nhập thất bại sẽ trả về null
                return null;
            }
        })
    ],
    callbacks: {
        // 2. Xử lý JWT (Lưu token vào Cookie)
        async jwt({ token, user }) {
            // Lần đăng nhập đầu tiên: Đưa dữ liệu user vào token
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.expiredTime = user.expiredTime ? user.expiredTime : 0;
                return token;
            }

            // Các lần gọi sau: Kiểm tra xem token đã hết hạn chưa
            if (Date.now() > token.expiredTime) {
                try {
                    const refreshed = await refreshWithLock(token);
                    return {
                        ...token,
                        ...refreshed,
                        error: undefined,
                    };
                } catch (error) {
                    return {
                        ...token,
                        error: "Failed to refresh access token",
                    };
                }
            }
            
            return {
                ...token,
                error: undefined,
            }
        },

        // 3. Xử lý Session (Đẩy data từ JWT ra Client)
        async session({ session, token }) {
            session.user = {
                id: token.id,
                email: token.email,
                name: token.username as string,
            };
            session.token = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };
            session.error = token.error;
            return session;
        }
    },
    pages: {
        signIn: '/login', 
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // Giữ phiên đăng nhập trong 30 ngày
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };