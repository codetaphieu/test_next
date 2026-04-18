import { JWT } from "next-auth/jwt";
import { refreshAccessToken } from "./Refresh";

let refreshPromise: Promise<JWT> | null = null;

export async function refreshWithLock(token: JWT): Promise<JWT> {
    // Chỉ cần kiểm tra promise, không cần isRefreshing nữa
    if (refreshPromise) {
        return await refreshPromise;
    }

    // Gán promise TRƯỚC KHI await — đây là điểm mấu chốt
    // JavaScript là single-threaded, dòng này chạy xong trước khi
    // bất kỳ async nào khác chen vào
    refreshPromise = refreshAccessToken(token)
        .then(refreshed => ({ ...token, ...refreshed, error: undefined }))
        .catch(() => ({ ...token, error: "RefreshAccessTokenError" } as JWT))
        .finally(() => {
            refreshPromise = null; // xóa sau khi xong
        });

    return await refreshPromise;
}