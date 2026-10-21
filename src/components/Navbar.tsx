import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Calculator, 
  BookOpen, 
  Leaf, 
  Award, 
  GraduationCap, 
  Info, 
  Volume2, 
  VolumeX, 
  Type, 
  User, 
  Menu, 
  X,
  Palette
} from 'lucide-react';
import { StudentSession } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  student: StudentSession;
  onUpdateStudentCode: (code: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  largeText: boolean;
  onToggleLargeText: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  student,
  onUpdateStudentCode,
  soundEnabled,
  onToggleSound,
  largeText,
  onToggleLargeText,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [tempCode, setTempCode] = useState(student.studentCode);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'kham_pha', label: 'Khám phá Làng nghề', icon: Palette, badge: 'K1' },
    { id: 'toan', label: 'Xưởng Toán Mộc', icon: Calculator, badge: 'K2-K3' },
    { id: 'tieng_viet', label: 'Con Chữ Làng Nghề', icon: BookOpen, badge: 'K2-K3' },
    { id: 'tn_xh', label: 'Em Yêu Nghề Quê', icon: Leaf, badge: 'K1-K4' },
    { id: 'stem', label: 'Làng Nghề Xanh & STEM', icon: Sparkles, badge: 'K4' },
    { id: 'tien_do', label: 'Tiến độ học tập', icon: Award },
    { id: 'giao_vien', label: 'Dành cho Giáo viên', icon: GraduationCap, highlight: true },
    { id: 'gioi_thieu', label: 'Giới thiệu dự án', icon: Info },
  ];

  const handleSelect = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  const handleSaveStudentCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempCode.trim()) {
      onUpdateStudentCode(tempCode.trim().toUpperCase());
      setShowStudentModal(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8EC]/95 backdrop-blur-md border-b-2 border-[#D4A373]/30 shadow-xs">
      {/* Top Banner with Author & School identity */}
      <div className="bg-[#75462A] text-amber-100 text-xs py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F7C65F]">TRƯỜNG TIỂU HỌC PHÙ KHÊ 2</span>
            <span className="hidden sm:inline text-amber-300">|</span>
            <span className="hidden sm:inline">Tác giả: Dương Thị Huệ - Bắc Ninh</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#42855B] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              Chương trình GDPT 2018 - Lớp 2
            </span>
            <span className="hidden md:inline bg-amber-500/30 text-amber-200 text-[11px] px-2 py-0.5 rounded-full border border-amber-400/40">
              Giải thưởng Tiên phong AI 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo & Product Name */}
          <button 
            type="button"
            onClick={() => handleSelect('home')} 
            className="flex items-center gap-3 text-left group transition-transform active:scale-95"
          >
            {/* Custom Brand Icon: Artisan Hand + AI Circuit */}
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-[#75462A] to-[#42855B] p-0.5 shadow-md flex-shrink-0 group-hover:shadow-lg transition-shadow">
              <div className="w-full h-full bg-[#FFF8EC] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                {/* Wood grain ring */}
                <div className="absolute inset-1 rounded-xl border border-[#D4A373]/60"></div>
                {/* Hand of Artisan + AI Sparks SVG */}
                <svg className="w-7 h-7 text-[#75462A] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  <circle cx="12" cy="12" r="1.5" fill="#2563EB" />
                  <path d="M12 2v2" stroke="#2563EB" />
                  <path d="M22 12h-2" stroke="#2563EB" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl font-extrabold text-[#75462A] tracking-tight">
                  PHÙ KHÊ THÔNG MINH AI
                </span>
                <span className="text-[10px] font-extrabold bg-[#2563EB] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                  2026
                </span>
              </div>
              <p className="text-xs text-[#42855B] font-semibold hidden sm:block">
                Từ làng nghề quê em đến lớp học thông minh
              </p>
            </div>
          </button>

          {/* Quick Controls & Student Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Accessibility Controls */}
            <div className="flex items-center bg-white border border-[#D4A373]/50 rounded-xl p-1 shadow-xs">
              <button
                type="button"
                onClick={onToggleSound}
                className={`p-1.5 sm:p-2 rounded-lg text-xs font-bold transition-colors ${
                  soundEnabled 
                    ? 'bg-amber-100 text-[#75462A]' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title={soundEnabled ? 'Đang bật giọng đọc Mộc Mộc' : 'Đang tắt âm thanh'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onToggleLargeText}
                className={`p-1.5 sm:p-2 rounded-lg text-xs font-bold transition-colors ${
                  largeText 
                    ? 'bg-[#42855B] text-white' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title={largeText ? 'Chữ lớn cho học sinh lớp 2 (Đang bật)' : 'Bật chữ lớn'}
              >
                <Type className="w-4 h-4" />
              </button>
            </div>

            {/* Student ID & Star Points */}
            <button
              type="button"
              onClick={() => setShowStudentModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 hover:to-orange-100 border-2 border-amber-300 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-left shadow-xs transition-transform active:scale-95"
              title="Nhấn để đổi mã học sinh"
            >
              <div className="w-7 h-7 rounded-lg bg-[#75462A] text-white flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden xs:block">
                <div className="text-[11px] font-bold text-[#75462A] leading-tight">
                  Mã: {student.studentCode}
                </div>
                <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                  <span>⭐ {student.points} điểm mộc</span>
                </div>
              </div>
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-[#D4A373] text-[#75462A] hover:bg-amber-100 lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-t border-amber-200/50 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#75462A] text-white shadow-md shadow-[#75462A]/20 scale-[1.02]'
                    : item.highlight
                    ? 'bg-amber-100/80 text-[#75462A] hover:bg-amber-200 border border-amber-300'
                    : 'text-[#75462A] hover:bg-amber-100/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F7C65F]' : 'text-[#75462A]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-[#42855B] text-white' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF8EC] border-b-2 border-[#D4A373] px-4 py-3 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-[#75462A] text-white'
                      : item.highlight
                      ? 'bg-amber-100 text-[#75462A] border border-amber-300'
                      : 'text-[#75462A] hover:bg-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Student Session Code Modal (Privacy compliant: Anonymous ID only, no phone or personal data) */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#D4A373] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#75462A] flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#75462A]">Phiên học sinh ẩn danh</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowStudentModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 text-xs text-emerald-800">
              <p className="font-bold mb-1">🛡️ Bảo vệ quyền riêng tư học sinh tiểu học:</p>
              <p>Hệ thống không thu thập họ tên đầy đủ, ngày sinh, số điện thoại hay ảnh cá nhân. Học sinh tham gia thông qua mã do cô giáo cấp (ví dụ: HS01, HS02, HS03...).</p>
            </div>

            <form onSubmit={handleSaveStudentCode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#75462A] uppercase mb-1">
                  Mã học sinh của em:
                </label>
                <input
                  type="text"
                  value={tempCode}
                  onChange={(e) => setTempCode(e.target.value)}
                  placeholder="Ví dụ: HS01, HS02, HS08..."
                  maxLength={10}
                  className="w-full px-4 py-2.5 border-2 border-amber-300 focus:border-[#75462A] rounded-xl font-mono text-base font-bold text-center tracking-wider outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#75462A] hover:bg-[#5c3721] text-white font-bold text-xs shadow-md"
                >
                  Xác nhận vào lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
