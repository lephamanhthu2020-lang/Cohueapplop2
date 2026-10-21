import React from 'react';

interface MathManipulativeProps {
  type?: string;
  data?: any;
}

export const MathManipulative: React.FC<MathManipulativeProps> = ({ type, data }) => {
  if (type === 'table_chair') {
    return (
      <div className="bg-[#FFF8EC] border-2 border-[#D4A373]/40 rounded-2xl p-4 my-3">
        <div className="text-xs font-bold text-[#75462A] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Góc trực quan: Bàn & Ghế gỗ</span>
          <span className="text-xs font-normal text-slate-500">Mỗi biểu tượng tương ứng với 1 bức ảnh</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-[#75462A]">Ảnh Bàn gỗ (12)</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">1 chục 2 đơn vị</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-sm shadow-xs hover:scale-110 transition-transform"
                  title={`Bàn gỗ số ${i + 1}`}
                >
                  🪵
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-[#42855B]">Ảnh Ghế gỗ (8)</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">8 đơn vị</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-sm shadow-xs hover:scale-110 transition-transform"
                  title={`Ghế gỗ số ${i + 1}`}
                >
                  🪑
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'ribbon_cm') {
    return (
      <div className="bg-[#FFF8EC] border-2 border-[#D4A373]/40 rounded-2xl p-4 my-3">
        <div className="text-xs font-bold text-[#75462A] uppercase tracking-wider mb-2">
          Mô hình thước đo xăng-ti-mét (cm)
        </div>
        <div className="space-y-3">
          {/* Ribbon 1: 24 cm */}
          <div>
            <div className="flex justify-between text-xs font-bold text-amber-900 mb-1">
              <span>Dải hoa văn thứ nhất:</span>
              <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded">24 cm</span>
            </div>
            <div className="w-full bg-amber-100 h-8 rounded-lg border-2 border-amber-400 relative flex items-center overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-xs font-bold text-white px-2"
                style={{ width: '60%' }}
              >
                24 cm (hoa cúc)
              </div>
            </div>
          </div>

          {/* Ribbon 2: 16 cm */}
          <div>
            <div className="flex justify-between text-xs font-bold text-emerald-900 mb-1">
              <span>Dải hoa văn thứ hai:</span>
              <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">16 cm</span>
            </div>
            <div className="w-full bg-emerald-50 h-8 rounded-lg border-2 border-emerald-400 relative flex items-center overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-xs font-bold text-white px-2"
                style={{ width: '40%' }}
              >
                16 cm (hoa mai)
              </div>
            </div>
          </div>

          {/* Combined visual connector */}
          <div className="pt-1 border-t border-dashed border-amber-300 flex items-center justify-between text-xs text-[#75462A] font-medium">
            <span>Ghép liền 2 dải hoa văn lại:</span>
            <span className="font-bold text-[#2563EB]">24 cm + 16 cm = ? cm</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'wood_blocks') {
    return (
      <div className="bg-[#FFF8EC] border-2 border-[#D4A373]/40 rounded-2xl p-4 my-3">
        <div className="text-xs font-bold text-[#75462A] uppercase tracking-wider mb-2 flex justify-between">
          <span>Thẻ hình trang trí mô hình gỗ</span>
          <span className="text-xs font-bold text-[#42855B]">36 thẻ ban đầu - bớt 14 thẻ</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-amber-200 flex flex-wrap gap-1.5 justify-center">
          {Array.from({ length: 36 }).map((_, i) => {
            const isUsed = i < 14;
            return (
              <div
                key={i}
                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold border transition-all ${
                  isUsed
                    ? 'bg-slate-100 text-slate-400 border-slate-300 line-through opacity-50'
                    : 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                }`}
                title={isUsed ? `Thẻ đã sử dụng số ${i + 1}` : `Thẻ còn lại`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-slate-600 px-1">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-slate-200 border border-slate-300 inline-block"></span>
            14 thẻ đã dùng (bỏ đi)
          </span>
          <span className="flex items-center gap-1 font-bold text-[#75462A]">
            <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300 inline-block"></span>
            Đếm số thẻ còn lại: 36 - 14 = ?
          </span>
        </div>
      </div>
    );
  }

  if (type === 'dragon_pattern') {
    return (
      <div className="bg-[#FFF8EC] border-2 border-[#D4A373]/40 rounded-2xl p-4 my-3 text-center">
        <div className="inline-block p-4 bg-white rounded-2xl border-4 border-[#75462A] shadow-md relative">
          <div className="w-28 h-28 sm:w-36 sm:h-36 bg-[#EAD5B7] flex flex-col items-center justify-center relative p-2 border-2 border-dashed border-[#75462A]/40 rounded-lg">
            <div className="text-3xl mb-1">🖼️</div>
            <span className="text-xs font-bold text-[#75462A]">Khung tranh gỗ</span>
            <span className="text-[10px] text-amber-800">4 cạnh bằng nhau</span>
            {/* 4 corner right-angle markers */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#75462A]"></div>
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#75462A]"></div>
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#75462A]"></div>
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#75462A]"></div>
          </div>
        </div>
        <p className="text-xs text-[#75462A] mt-2 font-medium">
          Dấu góc vuông ở 4 góc và 4 cạnh có độ dài bằng nhau hoàn toàn.
        </p>
      </div>
    );
  }

  if (type === 'safety_sign') {
    return (
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 my-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-2xl flex-shrink-0 shadow">
            ⚠️
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">Quy tắc an toàn xưởng mộc lớp 2</h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Học sinh luôn đi cùng thầy cô, đeo khẩu trang và không bao giờ chạm vào lưỡi cưa, mũi đục nhọn!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
