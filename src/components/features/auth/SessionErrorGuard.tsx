"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function SessionErrorGuard() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.error === "RefreshAccessTokenError") {
            signOut({ callbackUrl: "/login" });
        }
    }, [session?.error, status]);

    return null;
}
