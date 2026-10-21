import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Volume2, 
  Sparkles, 
  PenTool, 
  ArrowRight, 
  Send,
  HelpCircle,
  Award
} from 'lucide-react';
import { QuestionTask, StudentSession, ErrorCategory } from '../../types';
import { INITIAL_VOCABULARY_MATCHING } from '../../data/initialData';
import { MocMocAssistant } from '../MocMocAssistant';
import { aiService, ReviewSentenceResult } from '../../services/aiService';
import confetti from 'canvas-confetti';

interface LanguageCraftViewProps {
  tasks: QuestionTask[];
  student: StudentSession;
  onRecordAnswer: (taskId: string, isCorrect: boolean, errorCategory?: ErrorCategory, usedHint?: boolean) => void;
  soundEnabled: boolean;
  largeText: boolean;
}

export const LanguageCraftView: React.FC<LanguageCraftViewProps> = ({
  tasks,
  student,
  onRecordAnswer,
  soundEnabled,
  largeText,
}) => {
  const [activeTab, setActiveTab] = useState<'reading' | 'matching' | 'writing'>('reading');
  
  // Reading Comprehension state
  const tvTasks = tasks.filter(t => t.subject === 'tieng_viet' && t.status === 'approved');
  const [currentTvIndex, setCurrentTvIndex] = useState(0);
  const currentTask = tvTasks[currentTvIndex] || tvTasks[0];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hintStep, setHintStep] = useState(0);

  // Vocabulary Matching state
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchingFeedback, setMatchingFeedback] = useState<string | null>(null);

  // Creative Sentence Writing state
  const [studentSentence, setStudentSentence] = useState('');
  const [isEvaluatingSentence, setIsEvaluatingSentence] = useState(false);
  const [sentenceReview, setSentenceReview] = useState<ReviewSentenceResult | null>(null);

  const isCorrect = selectedOption === currentTask?.correctAnswer;

  const sampleReadingPassage = `“Quê em có nghề chạm khắc gỗ. Những người thợ khéo léo tạo nên các hoa văn đẹp. Để hoàn thành sản phẩm, người thợ cần chăm chỉ và kiên trì. Em yêu quý những người lao động và tự hào về quê hương mình.”`;

  const handleSelectOption = (opt: string) => {
    if (isSubmitted && isCorrect) return;
    setSelectedOption(opt);
  };

  const handleSubmitReadingAnswer = () => {
    if (!selectedOption || !currentTask) return;
    setIsSubmitted(true);
    const correct = selectedOption === currentTask.correctAnswer;
    onRecordAnswer(currentTask.id, correct, correct ? undefined : currentTask.errorCategory, hintStep > 0);

    if (correct) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      if (soundEnabled) {
        aiService.speakText('Con trả lời đúng rồi! Con đọc hiểu rất xuất sắc!');
      }
    } else {
      if (soundEnabled) {
        aiService.speakText('Con hãy đọc lại đoạn văn mẫu để tìm câu trả lời nhé.');
      }
    }
  };

  const handleNextReadingTask = () => {
    if (currentTvIndex < tvTasks.length - 1) {
      setCurrentTvIndex(currentTvIndex + 1);
    } else {
      setCurrentTvIndex(0);
    }
    setSelectedOption(null);
    setIsSubmitted(false);
    setHintStep(0);
  };

  // Vocabulary item click
  const handleTermClick = (term: string) => {
    if (matchedPairs.includes(term)) return;
    setSelectedTerm(term);
  };

  const handleCardMatch = (itemTerm: string) => {
    if (!selectedTerm) return;
    if (selectedTerm === itemTerm) {
      setMatchedPairs([...matchedPairs, itemTerm]);
      setSelectedTerm(null);
      setMatchingFeedback(`Chính xác! Con đã ghép đúng từ "${itemTerm}".`);
      confetti({ particleCount: 30, spread: 50 });
      if (soundEnabled) {
        aiService.speakText(`Đúng rồi! Đó chính là ${itemTerm}`);
      }
    } else {
      setMatchingFeedback('Chưa đúng rồi bé ơi! Hãy đọc lại công dụng của đồ vật nhé.');
      if (soundEnabled) {
        aiService.speakText('Chưa đúng rồi bé ơi, con hãy thử lại nhé.');
      }
    }
  };

  // Sentence evaluation with AI
  const handleReviewSentence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentSentence.trim()) return;

    setIsEvaluatingSentence(true);
    const result = await aiService.reviewSentence(
      studentSentence,
      'Viết 1 câu giới thiệu về người thợ mộc hoặc làng nghề Phù Khê quê em'
    );
    setSentenceReview(result);
    setIsEvaluatingSentence(false);

    if (result.isGood) {
      confetti({ particleCount: 50, spread: 70 });
      onRecordAnswer(`sentence-${Date.now()}`, true, undefined, false);
      if (soundEnabled) {
        aiService.speakText(result.praise);
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
              Phân hệ 3 • K2 Kết nối & K3 Khắc sâu
            </span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Tiếng Việt Lớp 2
            </span>
          </div>
          <h1 className={`font-black text-[#75462A] mt-2 ${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            Con Chữ Làng Nghề AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Luyện đọc diễn cảm, mở rộng vốn từ nghề truyền thống và tập viết câu ca ngợi quê hương Phù Khê.
          </p>
        </div>

        {/* 3 Activity Sub-tabs */}
        <div className="flex items-center bg-emerald-50 p-1.5 rounded-2xl border border-emerald-200 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('reading')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'reading'
                ? 'bg-[#42855B] text-white shadow-xs'
                : 'text-[#42855B] hover:bg-emerald-100'
            }`}
          >
            1. Đọc hiểu & Đoạn văn
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matching')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'matching'
                ? 'bg-[#42855B] text-white shadow-xs'
                : 'text-[#42855B] hover:bg-emerald-100'
            }`}
          >
            2. Nối từ đồ mộc
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('writing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'writing'
                ? 'bg-[#42855B] text-white shadow-xs'
                : 'text-[#42855B] hover:bg-emerald-100'
            }`}
          >
            3. Tập viết câu tự hào
          </button>
        </div>
      </div>

      {/* Tab 1: Đọc hiểu và đoạn văn mẫu */}
      {activeTab === 'reading' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Reading Passage Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 to-[#FFF8EC] rounded-3xl p-6 border-2 border-emerald-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#42855B] uppercase tracking-wider">
                Đoạn đọc mẫu chuẩn GDPT 2018
              </span>
              <button
                type="button"
                onClick={() => aiService.speakText(sampleReadingPassage)}
                className="p-2 bg-white text-[#42855B] hover:bg-emerald-100 rounded-xl border border-emerald-300 transition-colors shadow-xs"
                title="Nghe Mộc Mộc đọc mẫu đoạn văn"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-inner">
              <p className={`text-slate-800 leading-relaxed font-serif ${largeText ? 'text-lg' : 'text-base sm:text-lg'}`}>
                {sampleReadingPassage}
              </p>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-[#42855B]">💡 Từ ngữ cần ghi nhớ:</p>
              <p>• <strong>Chạm khắc gỗ:</strong> Dùng đục tạo hình hoa văn nổi bật trên gỗ.</p>
              <p>• <strong>Kiên trì:</strong> Làm việc cẩn thận, không nản lòng khi gặp việc khó.</p>
            </div>
          </div>

          {/* Right: Interactive Reading Questions */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-md space-y-5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-emerald-100 pb-3">
              <span className="text-[#42855B]">
                Câu hỏi {currentTvIndex + 1} / {tvTasks.length} ({currentTask.skill})
              </span>
              <span className="bg-emerald-100 text-[#42855B] px-2 py-0.5 rounded-md">
                Mức độ: {currentTask.level === 'bat_dau' ? 'Bắt đầu' : currentTask.level === 'tien_buoc' ? 'Tiến bước' : 'Thử thách'}
              </span>
            </div>

            <h2 className={`font-bold text-slate-800 leading-snug ${largeText ? 'text-xl' : 'text-base sm:text-lg'}`}>
              {currentTask.questionText}
            </h2>

            {/* Options */}
            <div className="space-y-2.5">
              {currentTask.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let cardStyle = 'bg-white border-2 border-emerald-200 hover:border-emerald-400 text-slate-800';

                if (isSelected && !isSubmitted) {
                  cardStyle = 'bg-emerald-100/70 border-2 border-[#42855B] text-[#42855B] font-bold shadow-md';
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
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#42855B] font-bold flex items-center justify-center text-sm flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="pt-4 border-t border-emerald-100 flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={handleNextReadingTask}
                className="px-4 py-2 border border-emerald-300 rounded-xl text-xs font-bold text-[#42855B] hover:bg-emerald-50"
              >
                Câu tiếp theo <ArrowRight className="w-4 h-4 inline" />
              </button>

              <button
                type="button"
                onClick={handleSubmitReadingAnswer}
                disabled={!selectedOption || (isSubmitted && isCorrect)}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 ${
                  !selectedOption || (isSubmitted && isCorrect)
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-[#42855B] hover:bg-[#346d4a] text-white'
                }`}
              >
                {isSubmitted && isCorrect ? 'Đã hoàn thành ⭐' : 'Kiểm tra câu trả lời'}
              </button>
            </div>

            {/* Feedback */}
            {isSubmitted && (
              <div className={`p-4 rounded-2xl border-2 ${
                isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
              }`}>
                <p className="text-xs sm:text-sm font-bold">
                  {isCorrect ? '🎉 Tuyệt vời! Con chọn rất chính xác!' : '💡 Con đọc lại câu thứ 3 của đoạn văn nhé!'}
                </p>
                <p className="text-xs text-slate-700 mt-1">
                  {currentTask.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Nối từ ngữ với đồ vật mộc */}
      {activeTab === 'matching' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#42855B] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Trò chơi ghép từ
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#75462A] mt-2">
              Nối từ ngữ chỉ dụng cụ & hoa văn làng nghề Phù Khê
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Bấm chọn một từ ngữ màu nâu bên dưới, sau đó bấm vào bức tranh tương ứng để hoàn thành mảnh ghép!
            </p>
          </div>

          {/* Terms Palette */}
          <div className="flex flex-wrap gap-3 p-4 bg-[#FFF8EC] rounded-2xl border border-amber-200">
            <span className="text-xs font-bold text-[#75462A] self-center mr-2">
              Chọn từ:
            </span>
            {INITIAL_VOCABULARY_MATCHING.map((item) => {
              const isMatched = matchedPairs.includes(item.term);
              const isSelected = selectedTerm === item.term;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTermClick(item.term)}
                  disabled={isMatched}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                    isMatched
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400 line-through opacity-70 cursor-default'
                      : isSelected
                      ? 'bg-[#75462A] text-white scale-105 shadow-md'
                      : 'bg-white border-2 border-amber-300 text-[#75462A] hover:bg-amber-100'
                  }`}
                >
                  {item.term} {isMatched && '✓'}
                </button>
              );
            })}
          </div>

          {/* Feedback message */}
          {matchingFeedback && (
            <div className="text-center text-xs sm:text-sm font-bold text-[#42855B] bg-emerald-50 py-2 rounded-xl border border-emerald-200">
              {matchingFeedback}
            </div>
          )}

          {/* Illustrated Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INITIAL_VOCABULARY_MATCHING.map((item) => {
              const isMatched = matchedPairs.includes(item.term);
              return (
                <div
                  key={item.id}
                  onClick={() => handleCardMatch(item.term)}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.term}
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <div className="space-y-1.5">
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {item.meaning}
                    </p>
                    <div className="pt-2 border-t border-slate-100">
                      {isMatched ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Đã ghép: {item.term}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-700">
                          Bấm để ghép với từ đang chọn
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Viết câu giới thiệu quê hương với AI hỗ trợ */}
      {activeTab === 'writing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-md space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#42855B] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Thực hành viết câu lớp 2
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#75462A] mt-2">
              Viết câu giới thiệu làng nghề mộc Phù Khê quê em
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Gợi ý: Con hãy viết 1 câu nêu tình cảm của con với quê hương Phù Khê hoặc ca ngợi sự khéo léo của người thợ mộc nhé!
            </p>
          </div>

          <form onSubmit={handleReviewSentence} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-bold text-[#75462A] uppercase mb-1.5">
                Câu văn của con:
              </label>
              <textarea
                rows={3}
                required
                value={studentSentence}
                onChange={(e) => setStudentSentence(e.target.value)}
                placeholder="Ví dụ: Em rất tự hào về làng nghề chạm khắc gỗ Phù Khê quê em."
                className={`w-full p-4 border-2 border-amber-300 focus:border-[#42855B] rounded-2xl outline-hidden text-slate-800 leading-relaxed ${
                  largeText ? 'text-lg' : 'text-base'
                }`}
              />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-500">
                ⭐ Nhớ viết hoa chữ cái đầu câu và đặt dấu chấm ở cuối câu con nhé!
              </span>

              <button
                type="submit"
                disabled={isEvaluatingSentence || !studentSentence.trim()}
                className="px-6 py-2.5 bg-[#42855B] hover:bg-[#346d4a] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isEvaluatingSentence ? (
                  <span>Mộc Mộc đang đọc câu của con...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi cho bạn Mộc Mộc nhận xét</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Pedagogical Evaluation Output */}
          {sentenceReview && (
            <div className="max-w-2xl p-5 bg-gradient-to-br from-emerald-50 to-[#FFF8EC] rounded-2xl border-2 border-emerald-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#42855B] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Mộc Mộc nhận xét câu văn của con:
                </span>
                <span className="text-xs font-extrabold bg-[#F7C65F] text-[#75462A] px-2.5 py-0.5 rounded-full">
                  Điểm mộc: {sentenceReview.score} / 10
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-[#75462A]">
                💖 {sentenceReview.praise}
              </p>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-1">
                <p>• <strong>Góp ý sư phạm:</strong> {sentenceReview.feedback}</p>
                <p>• <strong>Gợi ý câu mở rộng để con tham khảo:</strong> <em>"{sentenceReview.improvedSuggestion}"</em></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
