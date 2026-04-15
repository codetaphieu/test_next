// quy ước @ là alias trỏ đến thư mục src/ của dự án Next.js
import LoginForm from "@/components/features/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function LoginPage() {
  // Gác cổng: Đã đăng nhập rồi thì đá sang trang Dashboard
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] border border-emerald-100">
        
        {/* Icon trang trí nhỏ cho hợp tông Làng Việt */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md transform -rotate-3">
            <span className="text-white text-xl font-bold">LV</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">Đăng nhập hệ thống</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Chào mừng bạn trở lại Làng</p>
        
        {/* Nhúng Component giao diện vào đây */}
        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản? <Link href="/register" className="text-emerald-600 font-semibold hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}