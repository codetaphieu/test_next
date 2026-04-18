import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  // Lấy thông tin session để biết người dùng đã đăng nhập chưa
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="text-center px-4 max-w-3xl">
        {/* Logo Làng Việt */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
            <span className="text-white text-3xl font-bold">LV</span>
          </div>
        </div>

        {/* Tiêu đề dự án Làng Việt */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Dự án <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Làng Việt</span>
        </h1>
        
        {/* Mô tả trò chơi lấy cảm hứng từ Stacklands */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Trò chơi xây dựng làng quê bằng thẻ bài đầy hấp dẫn. 
          Kết hợp Nông dân, Bụi chuối và khám phá những công thức mới để phát triển bản làng của bạn!
        </p>

        {/* Khối Nút bấm (Buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {session ? (
            // NẾU ĐÃ ĐĂNG NHẬP
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Vào Làng của bạn
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            // NẾU CHƯA ĐĂNG NHẬP
            <>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-gray-200 hover:border-emerald-600 hover:text-emerald-600 text-gray-700 font-semibold rounded-full shadow-sm hover:shadow-md transition-all"
              >
                Tạo tài khoản mới
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Footer dự án */}
      <div className="absolute bottom-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} Làng Việt Game Project.
      </div>
    </div>
  );
}