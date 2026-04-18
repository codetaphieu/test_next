'use client'

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function UserApiCaller() {
    const { data: session } = useSession();
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = async () => {
        // 1. Chưa đăng nhập -> Đá về trang login
        if (!session) {
            signOut({ callbackUrl: "/login" });
            return;
        }

        // 2. Refresh Token hết hạn (NextAuth đã thử refresh nhưng thất bại)
        if ((session as any).error === "RefreshAccessTokenError") {
            setError("Phiên đăng nhập đã hết hạn. Đang chuyển hướng...");
            setTimeout(() => signOut({ callbackUrl: "/login" }), 2000);
            return;
        }
        
        // 3. Session hợp lệ → Gọi Proxy (NextAuth sẽ tự lo phần Access Token)
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/user-proxy", { method: "GET" });

            // 4. Proxy trả 401 với lỗi Refresh Token → SignOut
            if (response.status === 401) {
                const body = await response.json();
                if (body.error === "RefreshAccessTokenError" || body.error === "Unauthorized") {
                    setError("Phiên đăng nhập đã hết hạn. Đang chuyển hướng...");
                    setTimeout(() => signOut({ callbackUrl: "/login" }), 2000);
                    return;
                }
                throw new Error("Unauthorized");
            }

            if (!response.ok) throw new Error("Failed to fetch data from NestJS");

            const data = await response.text();
            setResult(data);
        } catch (err) {
            console.error("Lỗi gọi API:", err);
            setError("Không thể kết nối với máy chủ Backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-blue-500"></span>
                Thử nghiệm API nội bộ
            </h3>

            <div className="space-y-4">
                <button
                    onClick={callApi}
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white shadow-md transition-all active:scale-95
            ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang truy vấn...
                        </span>
                    ) : "Lấy ID từ Backend"}
                </button>

                {/* Hiển thị kết quả */}
                {result && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Phản hồi từ NestJS:</p>
                        <p className="font-mono text-green-700 break-all mt-1">{result}</p>
                    </div>
                )}

                {/* Hiển thị lỗi */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">❌ {error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}