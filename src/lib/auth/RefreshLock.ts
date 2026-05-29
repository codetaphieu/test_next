import { JWT } from "next-auth/jwt";
import { refreshAccessToken } from "./Refresh";

let refreshPromise: Promise<JWT> | null = null;

export async function refreshWithLock(token: JWT): Promise<JWT> {
    if (refreshPromise) {
        return await refreshPromise;
    }

    refreshPromise = refreshAccessToken(token)
        .then(refreshed => ({ ...token, ...refreshed, error: undefined }))
        .catch(async () => ({ ...token, error: "RefreshAccessTokenError"  } as JWT))
        .finally(() => {
            refreshPromise = null; 
        });

    return await refreshPromise;
}