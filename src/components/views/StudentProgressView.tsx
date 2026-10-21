import React from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  Star, 
  RotateCcw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { StudentSession, QuestionTask } from '../../types';
import { MocMocAssistant } from '../MocMocAssistant';
import confetti from 'canvas-confetti';

interface StudentProgressViewProps {
  student: StudentSession;
  allTasks: QuestionTask[];
  onNavigate: (tab: string) => void;
  soundEnabled: boolean;
  largeText: boolean;
}

export const StudentProgressView: React.FC<StudentProgressViewProps> = ({
  student,
  allTasks,
  onNavigate,
  soundEnabled,
  largeText,
}) => {
  const completedCount = student.completedTasks.length;
  const totalApprovedTasks = allTasks.filter(t => t.status === 'approved').length;
  const progressPercent = Math.min(100, Math.round((completedCount / (totalApprovedTasks || 1)) * 100));

  // Determine craft apprentice title
  let rankTitle = 'Thợ mộc tập sự nhí';
  let rankColor = 'text-amber-700 bg-amber-100';
  if (student.points >= 60) {
    rankTitle = 'Nghệ nhân nhí Phù Khê';
    rankColor = 'text-[#75462A] bg-[#F7C65F]';
  } else if (student.points >= 30) {
    rankTitle = 'Thợ mộc khéo tay lớp 2';
    rankColor = 'text-emerald-800 bg-emerald-100';
  }

  const triggerCelebration = () => {
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#75462A] via-[#8B5A3C] to-[#55321E] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-[#F7C65F]/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold bg-[#F7C65F] text-[#75462A] px-3 py-1 rounded-full uppercase tracking-wider">
              Góc Tiến Bộ Cá Nhân
            </span>
            <h1 className={`font-black tracking-tight ${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              Hành Trình Học Tập Của Bạn {student.studentCode}
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm max-w-xl">
              Mỗi bài toán, mỗi câu văn và mỗi quy tắc an toàn con hoàn thành đều giúp con trở thành một nghệ nhân nhí tài năng của làng Phù Khê!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[160px] flex-shrink-0">
            <div className="text-xs text-amber-200 font-bold uppercase tracking-wider">
              Danh hiệu hiện tại:
            </div>
            <div className={`mt-1 text-sm font-black px-3 py-1 rounded-full ${rankColor}`}>
              {rankTitle}
            </div>
            <div className="text-2xl font-black text-[#F7C65F] mt-2">
              ⭐ {student.points} <span className="text-xs text-amber-200">điểm mộc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Nhiệm vụ đã hoàn thành
          </div>
          <div className="text-2xl font-black text-[#75462A] mt-1 flex items-baseline gap-1">
            <span>{completedCount}</span>
            <span className="text-xs text-slate-400 font-bold">/ {totalApprovedTasks} câu</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-[#42855B] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tự sửa đúng sau gợi ý
          </div>
          <div className="text-2xl font-black text-[#42855B] mt-1 flex items-baseline gap-1">
            <span>{student.errorLog.filter(e => e.correctedAfterHint).length}</span>
            <span className="text-xs text-slate-400 font-bold">lần</span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-2">
            💡 Tinh thần kiên trì theo tấm gương nghệ nhân Phù Khê!
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Huy hiệu đã đạt
          </div>
          <div className="text-2xl font-black text-[#2563EB] mt-1 flex items-baseline gap-1">
            <span>{student.badges.length}</span>
            <span className="text-xs text-slate-400 font-bold">huy hiệu</span>
          </div>
          <p className="text-[11px] text-blue-700 mt-2">
            🏅 Đạt thêm điểm để mở khóa huy hiệu cao cấp!
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-orange-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quyền riêng tư học sinh
          </div>
          <div className="text-sm font-bold text-emerald-700 mt-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Mã ẩn danh an toàn</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Không lưu thông tin cá nhân theo quy chuẩn quốc tế COPPA & GDPT 2018.
          </p>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#75462A]">
              Bộ Sưu Tập Huy Hiệu Nghệ Nhân Nhí
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Phần thưởng ghi nhận từng bước tiến bộ của học sinh lớp 2
            </p>
          </div>
          <button
            type="button"
            onClick={triggerCelebration}
            className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-[#75462A] rounded-xl text-xs font-bold transition-all"
          >
            Bắn pháo hoa ăn mừng 🎉
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Badge 1 */}
          <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
            student.points >= 10 ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200 opacity-60'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center text-2xl flex-shrink-0">
              🪵
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#75462A]">Thợ Mộc Nhập Môn</h4>
              <p className="text-[11px] text-slate-500">Hoàn thành bài tập đầu tiên</p>
              <span className="text-[10px] font-bold text-emerald-700 mt-1 inline-block">
                {student.points >= 10 ? 'Đã đạt được ✓' : 'Chưa mở'}
              </span>
            </div>
          </div>

          {/* Badge 2 */}
          <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
            student.points >= 30 ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 opacity-60'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-200 flex items-center justify-center text-2xl flex-shrink-0">
              📐
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-900">Bàn Tay Vàng Toán Mộc</h4>
              <p className="text-[11px] text-slate-500">Đạt từ 30 điểm mộc trở lên</p>
              <span className="text-[10px] font-bold text-emerald-700 mt-1 inline-block">
                {student.points >= 30 ? 'Đã đạt được ✓' : 'Cần thêm điểm'}
              </span>
            </div>
          </div>

          {/* Badge 3 */}
          <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
            student.points >= 50 ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200 opacity-60'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-blue-200 flex items-center justify-center text-2xl flex-shrink-0">
              📖
            </div>
            <div>
              <h4 className="text-xs font-bold text-blue-900">Hoa Văn Con Chữ</h4>
              <p className="text-[11px] text-slate-500">Đọc hiểu và viết câu xuất sắc</p>
              <span className="text-[10px] font-bold text-blue-700 mt-1 inline-block">
                {student.points >= 50 ? 'Đã đạt được ✓' : 'Cần thêm điểm'}
              </span>
            </div>
          </div>

          {/* Badge 4 */}
          <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
            student.points >= 70 ? 'bg-orange-50 border-orange-300' : 'bg-slate-50 border-slate-200 opacity-60'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-orange-200 flex items-center justify-center text-2xl flex-shrink-0">
              👑
            </div>
            <div>
              <h4 className="text-xs font-bold text-orange-900">Nghệ Nhân Phù Khê Nhí</h4>
              <p className="text-[11px] text-slate-500">Chinh phục toàn bộ các phân hệ</p>
              <span className="text-[10px] font-bold text-orange-700 mt-1 inline-block">
                {student.points >= 70 ? 'Đã đạt được ✓' : 'Cần thêm điểm'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('toan')}
          className="p-5 bg-white rounded-2xl border-2 border-amber-200 hover:border-[#75462A] text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#75462A] uppercase">Tiếp tục giải toán</span>
            <ChevronRight className="w-4 h-4 text-[#75462A] group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 mt-1">Xưởng Toán Mộc AI</h4>
          <p className="text-xs text-slate-500 mt-0.5">Luyện phép tính cộng trừ và nhận biết hình</p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('tieng_viet')}
          className="p-5 bg-white rounded-2xl border-2 border-emerald-200 hover:border-[#42855B] text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#42855B] uppercase">Luyện con chữ</span>
            <ChevronRight className="w-4 h-4 text-[#42855B] group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 mt-1">Con Chữ Làng Nghề AI</h4>
          <p className="text-xs text-slate-500 mt-0.5">Đọc hiểu đoạn văn mẫu và nối từ đồ mộc</p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('tn_xh')}
          className="p-5 bg-white rounded-2xl border-2 border-blue-200 hover:border-[#2563EB] text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2563EB] uppercase">Khám phá nghề quê</span>
            <ChevronRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 mt-1">Em Yêu Nghề Quê AI</h4>
          <p className="text-xs text-slate-500 mt-0.5">Ghi nhớ quy tắc an toàn xưởng mộc</p>
        </button>
      </div>
    </div>
  );
};
