import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Volume2,
  Award,
  Layers,
  Check
} from 'lucide-react';
import { QuestionTask, DifficultyLevel, StudentSession, ErrorCategory } from '../../types';
import { MathManipulative } from '../MathManipulative';
import { MocMocAssistant } from '../MocMocAssistant';
import { aiService, DiagnoseResult } from '../../services/aiService';
import confetti from 'canvas-confetti';

interface MathWoodshopViewProps {
  tasks: QuestionTask[];
  student: StudentSession;
  onRecordAnswer: (taskId: string, isCorrect: boolean, errorCategory?: ErrorCategory, usedHint?: boolean) => void;
  soundEnabled: boolean;
  largeText: boolean;
}

export const MathWoodshopView: React.FC<MathWoodshopViewProps> = ({
  tasks,
  student,
  onRecordAnswer,
  soundEnabled,
  largeText,
}) => {
  const mathTasks = tasks.filter(t => t.subject === 'toan' && t.status === 'approved');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>('bat_dau');
  
  // Filter by selected level or fallback to all math tasks
  const filteredTasks = mathTasks.filter(t => t.level === selectedLevel).length > 0 
    ? mathTasks.filter(t => t.level === selectedLevel)
    : mathTasks;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTask = filteredTasks[currentIndex] || mathTasks[0];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hintStep, setHintStep] = useState(0); // 0: no hint, 1: hint 1, 2: hint 2
  const [aiDiagnosis, setAiDiagnosis] = useState<DiagnoseResult | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const isCompleted = student.completedTasks.includes(currentTask?.id);
  const isCorrect = selectedOption === currentTask?.correctAnswer;

  const handleSelectOption = (opt: string) => {
    if (isSubmitted && isCorrect) return; // already solved correctly
    setSelectedOption(opt);
  };

  const handleSubmit = async () => {
    if (!selectedOption || !currentTask) return;
    setIsSubmitted(true);

    const correct = selectedOption === currentTask.correctAnswer;
    onRecordAnswer(
      currentTask.id, 
      correct, 
      correct ? undefined : currentTask.errorCategory,
      hintStep > 0
    );

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (soundEnabled) {
        aiService.speakText('Tuyệt vời lắm! Con đã tính đúng rồi! Bác thợ mộc tặng con điểm sao!');
      }
    } else {
      // Analyze error with Gemini AI on the server
      setIsDiagnosing(true);
      const diagnosis = await aiService.diagnoseError({
        questionText: currentTask.questionText,
        chosenAnswer: selectedOption,
        correctAnswer: currentTask.correctAnswer,
        explanation: currentTask.explanation,
        subject: 'Toán học lớp 2 - Làng nghề Phù Khê'
      });
      setAiDiagnosis(diagnosis);
      setIsDiagnosing(false);

      if (soundEnabled) {
        aiService.speakText(diagnosis.gentleHint || 'Con ơi, hãy bình tĩnh xem lại phép tính nháp nhé.');
      }
    }
  };

  const handleNextTask = () => {
    if (currentIndex < filteredTasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    // Reset state for new task
    setSelectedOption(null);
    setIsSubmitted(false);
    setHintStep(0);
    setAiDiagnosis(null);
  };

  const handlePrevTask = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setHintStep(0);
      setAiDiagnosis(null);
    }
  };

  const handleRequestHint = () => {
    if (hintStep < currentTask.hints.length) {
      setHintStep(hintStep + 1);
      if (soundEnabled) {
        aiService.speakText(currentTask.hints[hintStep]);
      }
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-amber-100 text-[#75462A] px-3 py-1 rounded-full uppercase tracking-wider">
              Phân hệ 2 • K2 Kết nối & K3 Khắc sâu
            </span>
            <span className="text-xs bg-emerald-100 text-[#42855B] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Chuẩn GDPT 2018
            </span>
          </div>
          <h1 className={`font-black text-[#75462A] mt-2 ${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            Xưởng Toán Mộc AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ứng dụng kiến thức toán học lớp 2 vào công việc của người thợ mộc làng Phù Khê quê em.
          </p>
        </div>

        {/* 3 Level Selector Tabs */}
        <div className="flex items-center bg-amber-50 p-1.5 rounded-2xl border border-amber-200 gap-1">
          {(['bat_dau', 'tien_buoc', 'thu_thach'] as DifficultyLevel[]).map((lvl) => {
            const labels: Record<DifficultyLevel, string> = {
              bat_dau: '1. Bắt đầu',
              tien_buoc: '2. Tiến bước',
              thu_thach: '3. Thử thách'
            };
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  setSelectedLevel(lvl);
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setIsSubmitted(false);
                  setHintStep(0);
                  setAiDiagnosis(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#75462A] text-white shadow-xs'
                    : 'text-[#75462A] hover:bg-amber-100'
                }`}
              >
                {labels[lvl]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question & Workspace Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Task & Manipulative */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-5">
          {/* Progress Header within current level */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-amber-100 pb-3">
            <span className="text-[#75462A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#42855B]"></span>
              Nhiệm vụ {currentIndex + 1} / {filteredTasks.length} ({currentTask.skill})
            </span>
            <span className="bg-amber-100 text-[#75462A] px-2 py-0.5 rounded-md">
              Ngữ cảnh: {currentTask.phuKheContext}
            </span>
          </div>

          {/* Question Text & Sound */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h2 className={`font-black text-[#75462A] leading-snug ${largeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                {currentTask.questionText}
              </h2>
              <button
                type="button"
                onClick={() => aiService.speakText(currentTask.questionText)}
                className="p-2 bg-amber-50 hover:bg-amber-100 text-[#75462A] rounded-xl border border-amber-200 transition-colors flex-shrink-0"
                title="Nghe Mộc Mộc đọc đề bài"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Visual Manipulative for Grade 2 (tables/chairs, ribbons, token blocks, etc.) */}
          {currentTask.illustrationType && (
            <MathManipulative
              type={currentTask.illustrationType}
              data={currentTask.illustrationData}
            />
          )}

          {/* 4 Deterministic Option Choices */}
          <div className="space-y-2.5 pt-2">
            <label className="text-xs font-bold text-[#75462A] uppercase tracking-wider block">
              Con hãy chọn một đáp án đúng nhất:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTask.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let cardStyle = 'bg-white border-2 border-amber-200 hover:border-amber-400 text-slate-800';

                if (isSelected && !isSubmitted) {
                  cardStyle = 'bg-amber-100/70 border-2 border-[#75462A] text-[#75462A] font-bold shadow-md';
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
                    disabled={isSubmitted && isCorrect}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 flex items-center gap-3 shadow-xs active:scale-98 ${cardStyle}`}
                  >
                    <span className="w-8 h-8 rounded-xl bg-amber-200/60 text-[#75462A] font-bold flex items-center justify-center text-sm flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-sm sm:text-base ${largeText ? 'text-lg' : ''}`}>
                      {opt}
                    </span>
                    {isSubmitted && opt === currentTask.correctAnswer && (
                      <Check className="w-5 h-5 text-emerald-600 ml-auto flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button Bar */}
          <div className="pt-4 border-t border-amber-100 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevTask}
                disabled={currentIndex === 0}
                className="px-3 py-2 border border-amber-300 rounded-xl text-xs font-bold text-[#75462A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-50"
              >
                <ChevronLeft className="w-4 h-4 inline" /> Câu trước
              </button>
              <button
                type="button"
                onClick={handleNextTask}
                className="px-3 py-2 border border-amber-300 rounded-xl text-xs font-bold text-[#75462A] hover:bg-amber-50"
              >
                Câu tiếp theo <ChevronRight className="w-4 h-4 inline" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isSubmitted && !isCorrect && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-[#75462A] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Con làm lại câu này</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedOption || (isSubmitted && isCorrect)}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 ${
                  !selectedOption || (isSubmitted && isCorrect)
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-[#42855B] hover:bg-[#346d4a] text-white shadow-emerald-900/20'
                }`}
              >
                {isSubmitted && isCorrect ? 'Đã hoàn thành xuất sắc ⭐' : 'Kiểm tra kết quả'}
              </button>
            </div>
          </div>

          {/* Result & Pedagogical Feedback */}
          {isSubmitted && (
            <div className={`p-5 rounded-2xl border-2 animate-in fade-in duration-200 ${
              isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
            }`}>
              <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <span className="text-emerald-900">Hoan hô con! Đáp án hoàn toàn chính xác!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                    <span className="text-amber-900">Chưa chính xác rồi bé ngoan! Cùng Mộc Mộc xem lại nhé.</span>
                  </>
                )}
              </div>

              {/* Clear Explanation */}
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                📖 <strong>Lời giải chi tiết:</strong> {currentTask.explanation}
              </p>

              {/* Gemini AI Error Diagnosis if student was wrong */}
              {!isCorrect && aiDiagnosis && (
                <div className="mt-3 p-3 bg-white/80 rounded-xl border border-amber-200 space-y-1 text-xs text-[#75462A]">
                  <p className="font-bold text-[#42855B]">
                    🤖 Trợ lý AI Phù Khê chẩn đoán:
                  </p>
                  <p>{aiDiagnosis.diagnosis}</p>
                  <p className="italic text-slate-600">"{aiDiagnosis.encouragement}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Moc Moc Assistant Guidance & Progressive Hints */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm">
            <h3 className="text-xs font-bold text-[#75462A] uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Trợ lý Mộc Mộc đồng hành</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                AI Hỗ trợ
              </span>
            </h3>

            <MocMocAssistant
              currentHint={hintStep > 0 ? currentTask.hints[hintStep - 1] : undefined}
              hintStep={hintStep}
              totalHints={currentTask.hints.length}
              onRequestHint={handleRequestHint}
              message={
                isSubmitted && isCorrect
                  ? 'Tuyệt vời lắm! Con đã tính đúng và kiếm thêm 10 điểm mộc!'
                  : isSubmitted && !isCorrect
                  ? 'Đừng lo bé ơi! Bác thợ mộc cũng phải đục từng nét mới thành công. Hãy bấm nút gợi ý bên dưới để Mộc Mộc hướng dẫn con nhé!'
                  : 'Chào bạn nhỏ! Con hãy đọc kĩ đề bài, quan sát mô hình và chọn đáp án đúng nhé!'
              }
              mood={isSubmitted && isCorrect ? 'cheering' : isSubmitted && !isCorrect ? 'guiding' : 'happy'}
              soundEnabled={soundEnabled}
            />
          </div>

          {/* Grade 2 Woodshop Learning Tips */}
          <div className="bg-gradient-to-br from-amber-50 to-[#FFF8EC] rounded-3xl p-5 border-2 border-amber-200/80 text-xs text-[#75462A] space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-[#42855B]">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ghi nhớ toán học lớp 2:</span>
            </h4>
            <p>• Khi đề bài hỏi <strong>"tất cả bao nhiêu"</strong> hoặc <strong>"tổng cộng"</strong>, chúng mình làm phép tính <strong>cộng</strong>.</p>
            <p>• Khi đề bài hỏi <strong>"còn lại bao nhiêu"</strong> hoặc <strong>"nặng hơn / dài hơn bao nhiêu"</strong>, chúng mình làm phép tính <strong>trừ</strong>.</p>
            <p>• <strong>1 dm = 10 cm</strong>, con nhớ giữ đúng đơn vị đo nhé!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
