"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-md">
            <Link href="/" className="font-bold text-xl text-blue-600">
                My App
            </Link>

            <div className="flex items-center gap-4">
                {session ? (
                    <>
                        <span className="text-gray-700">
                            Chào, <strong>{session.user?.name || session.user?.email}</strong>
                        </span>
                        <LogoutButton />
                    </>
                ) : (
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Đăng nhập
                    </Link>
                )}
            </div>
        </nav>
    );
}