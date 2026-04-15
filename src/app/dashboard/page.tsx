import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewButton from "@/components/features/auth/NewButton";

export default async function DashboardPage() {
  // 1. Lấy dữ liệu session ngay trên Server để đảm bảo bảo mật
  const session = await getServerSession(authOptions);

  // 2. Gác cổng: Nếu người dùng CHƯA đăng nhập thì đá văng về trang Login ngay lập tức
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-200">

        {/* Header của Dashboard */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Khu vực Dashboard</h1>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Đang trực tuyến
          </span>
        </div>

        {/* Hiển thị thông tin User lấy từ Session (Tên, ID, Email) */}
        <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            👋 Xin chào, {session.user?.name || "Người dùng ẩn danh"}!
          </h2>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li><strong className="w-24 inline-block">ID:</strong> {session.user?.id}</li>
            <li><strong className="w-24 inline-block">Email:</strong> {session.user?.email}</li>
          </ul>
        </div>

        {/* Hiển thị Access Token để bạn kiểm tra xem Auth.js có hoạt động đúng không */}
        <div className="bg-gray-800 text-gray-200 p-6 rounded-lg overflow-hidden">
          <h3 className="font-semibold text-gray-100 mb-2">Access Token của bạn (Dùng để gọi API):</h3>
          <p className="font-mono text-xs break-all text-green-400">
            {session.token.accessToken}
          </p>
        </div>

        {/* Phần thử nghiệm bảo mật và kết nối Backend */}
        <div className="border-t border-dashed border-gray-200 pt-6 mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Thử nghiệm bảo mật:</h3>
          <p className="text-xs text-gray-500 mb-4">
            Nút bấm này sẽ gọi tới API Route Handler của Next.js, sau đó Proxy mới gọi sang NestJS Backend.
          </p>
          <NewButton />
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-xs">
        Dự án Làng Việt - Dashboard Quản trị
      </div>
    </div>
  );
}