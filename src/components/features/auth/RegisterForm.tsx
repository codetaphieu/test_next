"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Gọi Service để đăng ký sang Backend NestJS
      await authService.register(formData);

      // 2. Thành công thì gọi NextAuth để tự động đăng nhập luôn
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Tài khoản đã tạo nhưng tự động đăng nhập thất bại. Vui lòng đăng nhập thủ công.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi trong quá trình đăng ký.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}
      
      <input 
        type="email" 
        placeholder="Email" 
        required 
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Tên hiển thị (Username)" 
        required 
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input 
        type="password" 
        placeholder="Mật khẩu" 
        required 
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input 
        type="password" 
        placeholder="Xác nhận mật khẩu" 
        required 
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />
      
      <button 
        disabled={isLoading} 
        type="submit" 
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium p-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? "Đang xử lý..." : "Đăng ký gia nhập"}
      </button>
    </form>
  );
}