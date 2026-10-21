import React, { useState } from 'react';
import { 
  Sparkles, 
  Recycle, 
  Layers, 
  CheckCircle, 
  Volume2, 
  Scissors, 
  Ruler, 
  AlertTriangle,
  Lightbulb,
  Heart
} from 'lucide-react';
import { STEM_ACTIVITIES } from '../../data/initialData';
import { aiService } from '../../services/aiService';
import confetti from 'canvas-confetti';

interface GreenStemViewProps {
  soundEnabled: boolean;
  largeText: boolean;
}

export const GreenStemView: React.FC<GreenStemViewProps> = ({
  soundEnabled,
  largeText,
}) => {
  const [selectedActivity, setSelectedActivity] = useState(STEM_ACTIVITIES[0]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [wasteSorting, setWasteSorting] = useState<Record<string, string>>({});

  const wasteCards = [
    { id: 'item1', name: 'Bìa hộp sữa giấy sạch', target: 'vang', desc: 'Tái chế làm mô hình bàn ghế' },
    { id: 'item2', name: 'Phoi bào gỗ sạch, mùn cưa mịn', target: 'xanh', desc: 'Ủ ấm cho gốc cây và trồng nấm' },
    { id: 'item3', name: 'Vụn đinh sắt gỉ sắc nhọn', target: 'do', desc: 'Nguy hiểm! Nhờ người lớn gom lại' },
    { id: 'item4', name: 'Bìa các-tông thùng bánh', target: 'vang', desc: 'Cắt dán khung tranh trang trí' },
  ];

  const handleToggleStep = (stepIdx: number) => {
    if (checkedSteps.includes(stepIdx)) {
      setCheckedSteps(checkedSteps.filter(s => s !== stepIdx));
    } else {
      setCheckedSteps([...checkedSteps, stepIdx]);
      if (checkedSteps.length + 1 === selectedActivity.steps.length) {
        confetti({ particleCount: 50, spread: 70 });
        if (soundEnabled) {
          aiService.speakText('Chúc mừng con đã hoàn thành tất cả các bước chế tạo mô hình STEM xanh!');
        }
      }
    }
  };

  const handleSortItem = (itemId: string, bin: string) => {
    const newSorting = { ...wasteSorting, [itemId]: bin };
    setWasteSorting(newSorting);

    const targetBin = wasteCards.find(c => c.id === itemId)?.target;
    if (bin === targetBin) {
      if (soundEnabled) {
        aiService.speakText('Chính xác rồi! Bé phân loại rác rất thông minh!');
      }
    } else {
      if (soundEnabled) {
        aiService.speakText('Con hãy xem lại công dụng của vật liệu để chọn đúng thùng nhé.');
      }
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-emerald-100 text-[#42855B] px-3 py-1 rounded-full uppercase tracking-wider">
              Phân hệ 5 • K4 Kiểm chứng & Vận dụng STEM
            </span>
            <span className="text-xs bg-amber-100 text-[#75462A] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Recycle className="w-3.5 h-3.5" />
              Làng nghề xanh 2026
            </span>
          </div>
          <h1 className={`font-black text-[#75462A] mt-2 ${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            Làng Nghề Xanh & STEM Nhí
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Tận dụng bìa giấy sạch tái chế để ứng dụng hình vuông, chữ nhật đã học, sáng tạo mô hình bàn ghế mộc Phù Khê thu nhỏ an toàn.
          </p>
        </div>

        {/* Safety Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-800 font-bold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Vật liệu sạch 100% • Kéo an toàn đầu tù</span>
        </div>
      </div>

      {/* Activity Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step-by-Step Hands-on Project */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#75462A]">
              Dự án: {selectedActivity.title}
            </h2>
            <button
              type="button"
              onClick={() => aiService.speakText(`${selectedActivity.title}. ${selectedActivity.objective}`)}
              className="p-2 bg-emerald-50 text-[#42855B] hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
              title="Nghe Mộc Mộc hướng dẫn"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
            🎯 <strong>Mục tiêu:</strong> {selectedActivity.objective}
          </p>

          {/* Materials */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#75462A] uppercase tracking-wider">
              Vật liệu chuẩn bị (Sạch sẽ & an toàn):
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {selectedActivity.materials.map((mat, i) => (
                <li key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#42855B]" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#75462A] uppercase tracking-wider">
              Các bước thực hiện (Bấm vào để đánh dấu đã làm):
            </h3>
            <div className="space-y-2">
              {selectedActivity.steps.map((step, idx) => {
                const isChecked = checkedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleStep(idx)}
                    className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      isChecked ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isChecked ? '✓' : idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1">
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eco Lesson & Safety */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex items-center gap-2 font-medium">
              <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Ý nghĩa xanh:</strong> {selectedActivity.ecoLesson}</span>
            </div>
            <div className="p-3 bg-rose-50 text-rose-900 rounded-xl border border-rose-200 flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span><strong>Chú ý:</strong> {selectedActivity.safetyWarning}</span>
            </div>
          </div>
        </div>

        {/* Right: Waste Classification Game for Craft Village */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-md space-y-4">
          <div>
            <span className="text-xs font-bold text-[#42855B] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Trò chơi phân loại
            </span>
            <h3 className="text-base font-bold text-[#75462A] mt-2">
              Phân loại vật liệu làng nghề xanh
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Bé hãy chọn đúng thùng chứa cho từng loại phế phẩm để giữ gìn làng nghề Phù Khê luôn xanh - sạch - đẹp!
            </p>
          </div>

          <div className="space-y-3">
            {wasteCards.map((card) => {
              const currentChoice = wasteSorting[card.id];
              const isCorrect = currentChoice === card.target;

              return (
                <div key={card.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{card.name}</span>
                    {currentChoice && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? 'Đúng vị trí ✓' : 'Chưa đúng'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">{card.desc}</p>

                  {/* 3 Bin Choices */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSortItem(card.id, 'xanh')}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        currentChoice === 'xanh'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                      }`}
                    >
                      Thùng Xanh (Ủ cây)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortItem(card.id, 'vang')}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        currentChoice === 'vang'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'
                      }`}
                    >
                      Thùng Vàng (Tái chế)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortItem(card.id, 'do')}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        currentChoice === 'do'
                          ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                          : 'bg-white border-rose-300 text-rose-800 hover:bg-rose-50'
                      }`}
                    >
                      Thùng Đỏ (Người lớn)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
