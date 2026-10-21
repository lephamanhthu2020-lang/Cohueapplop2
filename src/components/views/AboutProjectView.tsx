import React from 'react';
import { 
  Award, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  Layers, 
  HeartHandshake, 
  MapPin, 
  Calendar, 
  School,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const AboutProjectView: React.FC = () => {
  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto">
      {/* Hero Badge Dossier */}
      <div className="bg-gradient-to-br from-[#75462A] via-[#8B5A3C] to-[#55321E] text-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-[#F7C65F]/30 relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F7C65F] text-[#75462A] font-extrabold text-xs px-3 py-1 rounded-full shadow-sm">
            <Award className="w-4 h-4" />
            <span>Hồ Sơ Đề Cử: Giải Thưởng Tiên Phong Ứng Dụng AI Trong Giáo Dục Việt Nam 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            PHÙ KHÊ THÔNG MINH AI 2026
          </h1>

          <p className="text-[#F7C65F] font-bold text-lg sm:text-xl italic">
            "Từ làng nghề quê em đến lớp học thông minh"
          </p>

          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Sản phẩm công nghệ giáo dục chuyên sâu kết nối di sản văn hóa điêu khắc gỗ truyền thống Phù Khê với Chương trình Giáo dục Phổ thông 2018 (Khối lớp 2). Ứng dụng mô hình sư phạm 4K và trợ lý trí tuệ nhân tạo Mộc Mộc nhằm cá nhân hóa lộ trình học tập, bồi dưỡng tình yêu quê hương đất nước và tư duy khoa học cho học sinh tiểu học.
          </p>

          {/* Dossier Meta Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-[11px] text-amber-200 block uppercase font-bold">Tác giả đề tài</span>
              <span className="text-sm font-extrabold text-white">Dương Thị Huệ</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-[11px] text-amber-200 block uppercase font-bold">Đơn vị công tác</span>
              <span className="text-sm font-extrabold text-white">Trường TH Phù Khê 2</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-[11px] text-amber-200 block uppercase font-bold">Địa phương</span>
              <span className="text-sm font-extrabold text-white">Bắc Ninh</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <span className="text-[11px] text-amber-200 block uppercase font-bold">Năm học triển khai</span>
              <span className="text-sm font-extrabold text-white">2026 – 2027 (Lớp 2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4K Model Deep Dive */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-5">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#42855B] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Nền tảng Sư phạm
          </span>
          <h2 className="text-xl font-black text-[#75462A] mt-2">
            Mô Hình 4K: Tiến Trình Dạy Học Tích Hợp Di Sản
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/30 space-y-1.5">
            <h3 className="font-bold text-sm text-[#75462A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-200 text-[#75462A] font-black text-xs flex items-center justify-center">K1</span>
              <span>Khám phá (Explore):</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Học sinh quan sát tranh ảnh hoa văn rồng cúc, các loại bào gỗ, đục vũm, thước mộc và di tích Đình Phù Khê được kiểm chứng bởi giáo viên. Trẻ hình thành vốn hiểu biết trực quan sống động.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 space-y-1.5">
            <h3 className="font-bold text-sm text-[#42855B] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-200 text-[#42855B] font-black text-xs flex items-center justify-center">K2</span>
              <span>Kết nối (Connect):</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chuyển hóa dữ liệu làng nghề thành bài toán lớp 2: Đếm số ảnh bàn ghế (12 + 8), đo độ dài dải hoa văn (24 cm + 16 cm), khung tranh gỗ hình vuông, đoạn văn ca ngợi đức tính cần cù của người thợ.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/30 space-y-1.5">
            <h3 className="font-bold text-sm text-[#2563EB] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-200 text-[#2563EB] font-black text-xs flex items-center justify-center">K3</span>
              <span>Khắc sâu (Deepen):</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hệ thống AI cá nhân hóa nhận diện 5 nhóm lỗi đặc thù ở học sinh 7-8 tuổi. Trợ lý Mộc Mộc hướng dẫn theo 2 bước gợi ý sư phạm gợi mở cách nghĩ, không giải hộ hay dán nhãn học sinh.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-orange-200 bg-orange-50/30 space-y-1.5">
            <h3 className="font-bold text-sm text-[#EA580C] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-200 text-[#EA580C] font-black text-xs flex items-center justify-center">K4</span>
              <span>Kiểm chứng (Verify & Apply):</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vận dụng kiến thức vào thực tiễn: Ghi nhớ 4 nguyên tắc vàng bảo vệ an toàn quanh xưởng gỗ, sáng tạo mô hình bàn ghế mini từ bìa giấy sạch tái chế và phân loại phế phẩm làng nghề.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Core Principles: Safety & Ethics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-md space-y-4">
        <h2 className="text-lg font-bold text-[#75462A]">
          Các Nguyên Tắc Bắt Buộc Về AI & Quyền Riêng Tư Trẻ Em
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Giáo viên kiểm duyệt 100%</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              AI không tự đưa câu hỏi mới sinh vào lớp học khi chưa có phê duyệt của giáo viên. Mọi thông tin lịch sử làng nghề đều có trích dẫn nguồn rõ ràng.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Quyền riêng tư tuyệt đối</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Học sinh tham gia bằng mã ẩn danh (HS01, HS02...). Ứng dụng không yêu cầu số điện thoại, căn cước, email, ngày sinh hay ảnh khuôn mặt trẻ em.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Chuẩn mực nghiên cứu thực</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Tách bạch minh bạch giữa dữ liệu DEMO và dữ liệu thử nghiệm thật. Không tự tạo số liệu giả mạo hay tuyên bố kết quả nếu chưa có đối chứng thực tế.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Signature */}
      <div className="text-center py-4 text-xs text-slate-500 space-y-1">
        <p>Phần mềm dự thi Giải thưởng Tiên phong Ứng dụng AI trong Giáo dục Việt Nam 2026</p>
        <p className="font-bold text-[#75462A]">© 2026 Dương Thị Huệ – Trường Tiểu học Phù Khê 2, Bắc Ninh</p>
      </div>
    </div>
  );
};
