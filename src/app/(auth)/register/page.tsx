import RegisterForm from "@/components/features/auth/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import Link from "next/link";

export default async function RegisterPage() {
  // Gác cổng: Đã đăng nhập rồi thì không cho vào trang Đăng ký nữa
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] border border-emerald-100">
        
        {/* Icon trang trí nhỏ cho hợp tông Làng Việt */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md transform rotate-3">
            <span className="text-white text-xl font-bold">LV</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">Tạo tài khoản</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Gia nhập cộng đồng Làng Việt</p>
        
        {/* Nhúng Component giao diện vào đây */}
        <RegisterForm />
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản? <Link href="/login" className="text-emerald-600 font-semibold hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}