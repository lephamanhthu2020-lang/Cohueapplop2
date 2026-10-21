import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, MessageCircle, HelpCircle, X, ChevronRight } from 'lucide-react';
import { aiService } from '../services/aiService';

interface MocMocAssistantProps {
  currentHint?: string;
  hintStep?: number;
  totalHints?: number;
  onRequestHint?: () => void;
  message?: string;
  mood?: 'happy' | 'thinking' | 'cheering' | 'guiding';
  soundEnabled?: boolean;
}

export const MocMocAssistant: React.FC<MocMocAssistantProps> = ({
  currentHint,
  hintStep = 0,
  totalHints = 2,
  onRequestHint,
  message = 'Chào con! Mộc Mộc là bạn học thông minh của làng Phù Khê đây!',
  mood = 'happy',
  soundEnabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text: string) => {
    if (!soundEnabled) return;
    setIsSpeaking(true);
    aiService.speakText(text);
    setTimeout(() => setIsSpeaking(false), 3500);
  };

  return (
    <div className="relative">
      {/* Mascot bubble & character container */}
      <div className="flex items-end gap-3 max-w-xl">
        {/* Animated Moc Moc avatar */}
        <div 
          onClick={() => handleSpeak(currentHint || message)}
          className="relative group cursor-pointer flex-shrink-0"
          title="Bấm để nghe Mộc Mộc đọc nhé!"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#F7C65F] via-[#D4A373] to-[#75462A] p-1 shadow-lg shadow-[#75462A]/20 transition-all duration-300 hover:scale-105 border-2 border-white">
            <div className="w-full h-full bg-[#FFF8EC] rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Wooden head & eyes */}
              <div className="relative flex items-center justify-center">
                {/* Wood grain pattern subtle ring */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EAD5B7] border-2 border-[#75462A] flex items-center justify-center relative">
                  {/* Eyes */}
                  <div className="flex gap-2">
                    <div className={`w-2 h-2.5 rounded-full bg-[#75462A] ${mood === 'thinking' ? 'animate-bounce' : ''}`} />
                    <div className={`w-2 h-2.5 rounded-full bg-[#75462A] ${mood === 'thinking' ? 'animate-bounce delay-75' : ''}`} />
                  </div>
                  {/* Smile */}
                  <div className="absolute bottom-1.5 w-3 h-1.5 border-b-2 border-[#75462A] rounded-full" />
                  {/* Craft Cap / Artisan headband */}
                  <div className="absolute -top-1 w-8 h-2 bg-[#42855B] rounded-t-sm" />
                </div>
              </div>
              {/* AI Circuit badge on chest */}
              <div className="absolute bottom-0.5 bg-[#2563EB] text-[9px] text-white font-bold px-1 rounded-full flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                AI
              </div>
            </div>
          </div>
          {/* Audio wave ping if speaking */}
          {isSpeaking && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-white text-[8px] items-center justify-center font-bold">♪</span>
            </span>
          )}
        </div>

        {/* Speech Bubble */}
        {isOpen ? (
          <div className="flex-1 bg-white border-2 border-[#D4A373]/50 rounded-2xl p-3.5 shadow-md relative text-slate-800">
            {/* Triangular arrow */}
            <div className="absolute -left-2 bottom-4 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white" />
            
            <div className="flex items-center justify-between gap-2 border-b border-amber-100 pb-1.5 mb-2">
              <span className="text-xs font-bold text-[#75462A] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#42855B] animate-pulse"></span>
                Trợ lý Mộc Mộc
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSpeak(currentHint || message)}
                  className="p-1 text-[#75462A] hover:bg-amber-100 rounded-md transition-colors"
                  title="Nghe giọng đọc"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  title="Thu gọn"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Display message or current active hint */}
            <p className="text-sm sm:text-base leading-relaxed text-[#75462A]">
              {currentHint || message}
            </p>

            {/* Step-by-step Hint control (strictly reveals step 1 then step 2 without spoiling answer) */}
            {onRequestHint && (
              <div className="mt-2.5 pt-2 border-t border-dashed border-amber-200 flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs font-medium text-slate-500">
                  {hintStep === 0 ? (
                    <span>Chưa mở gợi ý</span>
                  ) : (
                    <span className="text-[#42855B] font-bold">
                      Đang xem gợi ý bước {hintStep}/{totalHints}
                    </span>
                  )}
                </div>
                {hintStep < totalHints ? (
                  <button
                    type="button"
                    onClick={onRequestHint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF8EC] hover:bg-amber-100 text-[#75462A] border border-[#D4A373] rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Mộc Mộc gợi ý cho con (Bước {hintStep + 1})</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded font-medium">
                    Con đã mở đủ 2 bước gợi ý rồi đó! Giờ con hãy tự tin chọn nhé.
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 bg-white border border-[#D4A373] text-[#75462A] rounded-xl text-xs font-bold shadow hover:bg-[#FFF8EC] flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#42855B]" />
            Mở lời khuyên của Mộc Mộc
          </button>
        )}
      </div>
    </div>
  );
};
