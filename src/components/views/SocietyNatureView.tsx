import React, { useState } from 'react';
import { 
  Leaf, 
  ShieldAlert, 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle, 
  AlertTriangle, 
  Volume2, 
  HelpCircle,
  Award
} from 'lucide-react';
import { QuestionTask, StudentSession, ErrorCategory } from '../../types';
import { aiService } from '../../services/aiService';
import confetti from 'canvas-confetti';

interface SocietyNatureViewProps {
  tasks: QuestionTask[];
  student: StudentSession;
  onRecordAnswer: (taskId: string, isCorrect: boolean, errorCategory?: ErrorCategory, usedHint?: boolean) => void;
  soundEnabled: boolean;
  largeText: boolean;
}

export const SocietyNatureView: React.FC<SocietyNatureViewProps> = ({
  tasks,
  student,
  onRecordAnswer,
  soundEnabled,
  largeText,
}) => {
  const tnxhTasks = tasks.filter(t => t.subject === 'tn_xh' && t.status === 'approved');
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTask = tnxhTasks[currentIndex] || tnxhTasks[0];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Workshop Safety Interactive Checklist
  const [safetyChecklist, setSafetyChecklist] = useState({
    mask: false,
    distance: false,
    noTouchMachines: false,
    noClimbingLogs: false
  });

  const isCorrect = selectedOption === currentTask?.correctAnswer;

  const handleSelectOption = (opt: string) => {
    if (isSubmitted && isCorrect) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || !currentTask) return;
    setIsSubmitted(true);
    const correct = selectedOption === currentTask.correctAnswer;
    onRecordAnswer(currentTask.id, correct, correct ? undefined : currentTask.errorCategory, false);

    if (correct) {
      confetti({ particleCount: 40, spread: 60 });
      if (soundEnabled) {
        aiService.speakText('Chính xác! Con đã ghi nhớ rất tốt quy tắc an toàn và giá trị lao động!');
      }
    } else {
      if (soundEnabled) {
        aiService.speakText('Con chú ý an toàn là trên hết nhé, cùng đọc lại hướng dẫn nào.');
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < tnxhTasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const allSafetyCompleted = Object.values(safetyChecklist).every(Boolean);

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-blue-100 text-[#2563EB] px-3 py-1 rounded-full uppercase tracking-wider">
              Phân hệ 4 • Tự nhiên & Xã hội Lớp 2
            </span>
            <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              An toàn lao động học đường
            </span>
          </div>
          <h1 className={`font-black text-[#75462A] mt-2 ${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            Em Yêu Nghề Quê AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Hiểu về công việc của bác thợ mộc Phù Khê, biết ơn lao động và luôn ghi nhớ các hành vi an toàn tuyệt đối.
          </p>
        </div>
      </div>

      {/* Critical Workshop Safety Box */}
      <div className="bg-rose-50 border-3 border-rose-300 rounded-3xl p-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-2xl flex-shrink-0 shadow">
            ⚠️
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-base sm:text-lg font-black text-rose-900">
              Ghi nhớ vàng: An toàn khi đến gần xưởng mộc làng Phù Khê
            </h3>
            <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
              Học sinh lớp 2 (7-8 tuổi) tuyệt đối:
              <strong> Không chạm vào máy cưa, máy bào đang chạy</strong>; 
              <strong> Không cầm đùa nghịch các loại đục sắc nhọn</strong>; 
              <strong> Không tiếp xúc hóa chất sơn bóng, keo dán</strong> và 
              <strong> Không leo trèo lên các cây gỗ lớn</strong>.
            </p>

            {/* Interactive Safety Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-rose-200 cursor-pointer text-xs font-bold text-slate-700 hover:bg-rose-50/50">
                <input
                  type="checkbox"
                  checked={safetyChecklist.mask}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, mask: e.target.checked })}
                  className="w-4 h-4 text-[#42855B] rounded"
                />
                <span>Đeo khẩu trang tránh bụi gỗ</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-rose-200 cursor-pointer text-xs font-bold text-slate-700 hover:bg-rose-50/50">
                <input
                  type="checkbox"
                  checked={safetyChecklist.distance}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, distance: e.target.checked })}
                  className="w-4 h-4 text-[#42855B] rounded"
                />
                <span>Đứng ở khoảng cách an toàn cùng cô giáo</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-rose-200 cursor-pointer text-xs font-bold text-slate-700 hover:bg-rose-50/50">
                <input
                  type="checkbox"
                  checked={safetyChecklist.noTouchMachines}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, noTouchMachines: e.target.checked })}
                  className="w-4 h-4 text-[#42855B] rounded"
                />
                <span>Không chạm tay vào máy cưa, đục sắc nhọn</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-rose-200 cursor-pointer text-xs font-bold text-slate-700 hover:bg-rose-50/50">
                <input
                  type="checkbox"
                  checked={safetyChecklist.noClimbingLogs}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, noClimbingLogs: e.target.checked })}
                  className="w-4 h-4 text-[#42855B] rounded"
                />
                <span>Không leo trèo lên đống gỗ lớn</span>
              </label>
            </div>

            {allSafetyCompleted && (
              <div className="mt-2 p-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Bé đã nắm vững 4 quy tắc an toàn! Bé xứng đáng là Hiệp sĩ an toàn làng nghề!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TN&XH Interactive Quiz Tasks */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md space-y-5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-blue-100 pb-3">
          <span className="text-[#2563EB]">
            Nhiệm vụ {currentIndex + 1} / {tnxhTasks.length} ({currentTask.skill})
          </span>
          <span className="bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-md">
            Chủ đề: Nghề truyền thống quê em
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <h2 className={`font-bold text-slate-800 leading-snug ${largeText ? 'text-xl' : 'text-base sm:text-lg'}`}>
            {currentTask.questionText}
          </h2>
          <button
            type="button"
            onClick={() => aiService.speakText(currentTask.questionText)}
            className="p-2 bg-blue-50 text-[#2563EB] hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors flex-shrink-0"
            title="Nghe Mộc Mộc đọc câu hỏi"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Choices */}
        <div className="space-y-2.5">
          {currentTask.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            let cardStyle = 'bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-800';

            if (isSelected && !isSubmitted) {
              cardStyle = 'bg-blue-50 border-2 border-[#2563EB] text-[#2563EB] font-bold shadow-md';
            } else if (isSubmitted) {
              if (opt === currentTask.correctAnswer) {
                cardStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-50 border-2 border-rose-400 text-rose-900 font-bold';
              } else {
                cardStyle = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-3 shadow-xs active:scale-98 ${cardStyle}`}
              >
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-xs sm:text-sm flex-1 leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-blue-100 flex items-center justify-between flex-wrap gap-2">
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 border border-blue-300 rounded-xl text-xs font-bold text-[#2563EB] hover:bg-blue-50"
          >
            Nhiệm vụ tiếp theo
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedOption || (isSubmitted && isCorrect)}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 ${
              !selectedOption || (isSubmitted && isCorrect)
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563EB] hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitted && isCorrect ? 'Đã hoàn thành ⭐' : 'Kiểm tra lựa chọn'}
          </button>
        </div>

        {/* Feedback */}
        {isSubmitted && (
          <div className={`p-4 rounded-2xl border-2 ${
            isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
          }`}>
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              {isCorrect ? '🎉 Con đã có nhận thức và cách ứng xử rất đúng đắn!' : '💡 Con hãy suy nghĩ kỹ về sự an toàn nhé!'}
            </p>
            <p className="text-xs text-slate-700 mt-1">
              {currentTask.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
