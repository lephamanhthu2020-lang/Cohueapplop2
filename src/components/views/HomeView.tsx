import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  BookOpen, 
  Leaf, 
  ShieldCheck, 
  GraduationCap, 
  Award,
  Layers,
  HeartHandshake,
  Compass
} from 'lucide-react';
import { MocMocAssistant } from '../MocMocAssistant';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  soundEnabled: boolean;
  largeText: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  soundEnabled,
  largeText,
}) => {
  return (
    <div className="space-y-10 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#75462A] via-[#8B5A3C] to-[#55321E] text-white p-6 sm:p-10 shadow-xl border-4 border-[#F7C65F]/30">
        {/* Subtle decorative background wood motif */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#F7C65F] text-[#75462A] font-extrabold text-xs px-3 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sản phẩm dự thi: Tiên phong Ứng dụng AI trong Giáo dục Việt Nam 2026</span>
            </div>

            <h1 className={`font-black tracking-tight leading-tight ${largeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>
              PHÙ KHÊ THÔNG MINH AI
            </h1>

            <p className="text-amber-200 font-bold text-base sm:text-lg italic">
              "Từ làng nghề quê em đến lớp học thông minh"
            </p>

            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed max-w-xl">
              Ứng dụng học tập tiên phong dành riêng cho học sinh lớp 2 theo Chương trình GDPT 2018. Kết nối vẻ đẹp chạm khắc gỗ Phù Khê với Toán học, Tiếng Việt, Tự nhiên và Xã hội cùng trợ lý hoạt hình Mộc Mộc!
            </p>

            {/* Author Credit badge */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-3 text-xs text-amber-100 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>Tác giả:</strong> Dương Thị Huệ</span>
              <span><strong>Đơn vị:</strong> Trường Tiểu học Phù Khê 2</span>
              <span><strong>Địa phương:</strong> Bắc Ninh</span>
              <span><strong>Năm học:</strong> 2026 - 2027</span>
            </div>

            {/* 4 Core Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('kham_pha')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#F7C65F] hover:bg-[#fabc38] text-[#75462A] rounded-2xl font-black text-sm shadow-lg shadow-amber-900/30 transition-all active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Bắt đầu khám phá</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('toan')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#42855B] hover:bg-[#356f4b] text-white rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Calculator className="w-4 h-4 text-emerald-200" />
                <span>Vào lớp học</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('giao_vien')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-bold text-sm backdrop-blur-xs transition-all active:scale-95 border border-white/30"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Dành cho giáo viên</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('gioi_thieu')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-black/20 hover:bg-black/30 text-amber-100 rounded-2xl font-medium text-sm transition-all active:scale-95"
              >
                <span>Giới thiệu sản phẩm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Mascot Spotlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-[#FFF8EC] text-slate-800 p-5 rounded-3xl shadow-2xl border-4 border-[#F7C65F] w-full max-w-sm">
              <div className="text-center mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#42855B] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Trợ lý học tập thông minh
                </span>
                <h3 className="text-base font-bold text-[#75462A] mt-1">Gặp gỡ bạn Mộc Mộc</h3>
              </div>

              <div className="flex justify-center my-3">
                <MocMocAssistant
                  message="Chào các bạn nhỏ lớp 2! Mình là Mộc Mộc - thợ mộc tí hon làng Phù Khê. Hãy cùng mình giải các câu đố mộc vui nhộn và nhận điểm sao nhé!"
                  soundEnabled={soundEnabled}
                  mood="cheering"
                />
              </div>

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-[#75462A] space-y-1.5 mt-3">
                <div className="flex items-center gap-1.5 font-bold text-[#42855B]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>An toàn & Giáo dục chuẩn mực:</span>
                </div>
                <p>• AI hỗ trợ theo 2 bước gợi ý sư phạm, không giải hộ bài.</p>
                <p>• Dữ liệu văn hóa địa phương do giáo viên kiểm duyệt 100%.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mô hình giáo dục 4K */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#42855B] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Phương pháp sư phạm cốt lõi
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#75462A] mt-2">
            Vận hành theo mô hình 4K tiên tiến
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Gắn kết mật thiết văn hóa làng nghề truyền thống với kiến thức môn học lớp 2 GDPT 2018
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* K1 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#75462A] font-black text-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              K1
            </div>
            <h3 className="text-base font-bold text-[#75462A]">Khám phá</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Quan sát hình ảnh thực tế, lắng nghe thuyết minh về nghệ nhân đục chạm, công cụ mộc và hoa văn rồng phượng cổ truyền Phù Khê.
            </p>
            <div className="mt-3 text-[11px] font-bold text-[#42855B] flex items-center gap-1">
              <span>Phân hệ 1 • Thư viện di sản</span>
            </div>
          </div>

          {/* K2 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#42855B] font-black text-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              K2
            </div>
            <h3 className="text-base font-bold text-[#42855B]">Kết nối</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Liên hệ những đồ vật quen thuộc (chiếc thước mộc, bàn ghế, khung tranh gỗ) với phép tính cộng trừ, hình học, số đo cm, dm.
            </p>
            <div className="mt-3 text-[11px] font-bold text-[#42855B] flex items-center gap-1">
              <span>Phân hệ 2 & 3 • Toán & Tiếng Việt</span>
            </div>
          </div>

          {/* K3 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] font-black text-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              K3
            </div>
            <h3 className="text-base font-bold text-[#2563EB]">Khắc sâu</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Luyện tập với 3 mức độ (Bắt đầu - Tiến bước - Thử thách). AI trợ lý Mộc Mộc phân tích dạng lỗi và đưa gợi ý mở từng bước.
            </p>
            <div className="mt-3 text-[11px] font-bold text-[#2563EB] flex items-center gap-1">
              <span>Cá nhân hóa theo năng lực</span>
            </div>
          </div>

          {/* K4 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] font-black text-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              K4
            </div>
            <h3 className="text-base font-bold text-[#EA580C]">Kiểm chứng</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Vận dụng kiến thức tự bảo vệ an toàn làng nghề, thực hành chế tạo mô hình bằng bìa giấy sạch tái chế và ghi nhận kết quả.
            </p>
            <div className="mt-3 text-[11px] font-bold text-[#EA580C] flex items-center gap-1">
              <span>Phân hệ 4 & 5 • TN&XH & STEM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phân hệ môn học theo GDPT 2018 Lớp 2 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#75462A]">
              Các phân hệ học tập tích hợp
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Chọn một môn học để cùng bạn Mộc Mộc rèn luyện và tích lũy huy hiệu thợ mộc nhí!
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            100% Nội dung duyệt chuẩn lớp 2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Môn Toán */}
          <div 
            onClick={() => onNavigate('toan')}
            className="cursor-pointer bg-white rounded-3xl p-6 border-3 border-amber-200 hover:border-[#75462A] shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-[#75462A] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📐
              </div>
              <div className="text-[11px] font-extrabold text-[#75462A] uppercase tracking-wider">
                Phân hệ 2
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-0.5 group-hover:text-[#75462A]">
                Xưởng Toán Mộc AI
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Đếm số lượng ảnh sản phẩm, cộng trừ trong phạm vi 100, đo độ dài dải hoa văn bằng cm, nhận biết hình vuông khung tranh và giải toán có lời văn.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-amber-50 text-[#75462A] font-bold px-2 py-0.5 rounded-md border border-amber-200">
                  Cộng trừ 100
                </span>
                <span className="text-[10px] bg-amber-50 text-[#75462A] font-bold px-2 py-0.5 rounded-md border border-amber-200">
                  Hình vuông, chữ nhật
                </span>
                <span className="text-[10px] bg-amber-50 text-[#75462A] font-bold px-2 py-0.5 rounded-md border border-amber-200">
                  Đo cm, kg
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#75462A]">
              <span>Vào giải toán mộc</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tiếng Việt */}
          <div 
            onClick={() => onNavigate('tieng_viet')}
            className="cursor-pointer bg-white rounded-3xl p-6 border-3 border-emerald-200 hover:border-[#42855B] shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#42855B] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📖
              </div>
              <div className="text-[11px] font-extrabold text-[#42855B] uppercase tracking-wider">
                Phân hệ 3
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-0.5 group-hover:text-[#42855B]">
                Con Chữ Làng Nghề AI
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Đọc hiểu đoạn văn về đức tính kiên trì của người thợ chạm khắc, nối từ ngữ với công cụ đồ mộc, sắp xếp câu và viết câu giới thiệu quê hương Phù Khê.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-emerald-50 text-[#42855B] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  Đoạn đọc mẫu
                </span>
                <span className="text-[10px] bg-emerald-50 text-[#42855B] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  Nối từ ngữ
                </span>
                <span className="text-[10px] bg-emerald-50 text-[#42855B] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  Viết câu tự hào
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#42855B]">
              <span>Vào học Tiếng Việt</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tự nhiên & Xã hội */}
          <div 
            onClick={() => onNavigate('tn_xh')}
            className="cursor-pointer bg-white rounded-3xl p-6 border-3 border-blue-200 hover:border-[#2563EB] shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🌿
              </div>
              <div className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-wider">
                Phân hệ 4
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-0.5 group-hover:text-[#2563EB]">
                Em Yêu Nghề Quê AI
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Tìm hiểu công việc người thợ mộc, trân quý giá trị lao động, phân biệt hành vi an toàn (tránh máy cưa, đục nhọn) và giữ gìn di tích lịch sử Đình Phù Khê.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-blue-50 text-[#2563EB] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                  An toàn xưởng mộc
                </span>
                <span className="text-[10px] bg-blue-50 text-[#2563EB] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                  Biết ơn lao động
                </span>
                <span className="text-[10px] bg-blue-50 text-[#2563EB] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                  Di tích Phù Khê
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB]">
              <span>Vào khám phá nghề quê</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Mở rộng: STEM & Làng nghề xanh banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-[#42855B] rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold bg-emerald-700/80 text-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Phân hệ 5 • Mở rộng Hoạt động trải nghiệm & STEM
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Làng Nghề Xanh: Tái chế bìa giấy sạch làm mô hình mộc
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Học sinh dùng bìa các-tông và kéo an toàn để thiết kế mô hình bàn ghế mini thân thiện môi trường. Tuyệt đối không để trẻ tiếp xúc vật liệu nguy hiểm trong xưởng!
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('stem')}
            className="flex-shrink-0 px-5 py-3 bg-[#F7C65F] hover:bg-amber-300 text-[#75462A] rounded-2xl font-black text-sm shadow-md transition-all active:scale-95"
          >
            Trải nghiệm STEM xanh
          </button>
        </div>
      </section>
    </div>
  );
};
