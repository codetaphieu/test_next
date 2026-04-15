import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  // Lấy session hiện tại của người dùng
  const session = await getServerSession(authOptions);

  // Gác cổng 1: Chưa đăng nhập
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Gác cổng 2: Token hết hạn và không thể làm mới
  if (session.error === "RefreshAccessTokenError") {
    return NextResponse.json({ error: "RefreshAccessTokenError" }, { status: 401 });
  }

  try {
    // Gọi sang Backend NestJS (Giao tiếp Server-to-Server siêu bảo mật)
    const response = await fetch('http://localhost:3001/users/oi', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // Nếu Backend NestJS báo lỗi
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "NestJS error" }));
      return NextResponse.json(
        { error: error.message ?? "Unknown error" },
        { status: response.status }
      );
    }

    // Nếu Backend NestJS trả về thành công
    const data = await response.text();
    return NextResponse.json({ id: data });
    
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}