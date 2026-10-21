import { QuestionTask } from '../types';

export interface DiagnoseResult {
  diagnosis: string;
  gentleHint: string;
  encouragement: string;
}

export interface ReviewSentenceResult {
  isGood: boolean;
  score: number;
  praise: string;
  feedback: string;
  improvedSuggestion: string;
}

export const aiService = {
  async getStatus() {
    try {
      const res = await fetch('/api/status');
      return await res.json();
    } catch {
      return { status: 'offline', aiEnabled: false };
    }
  },

  async generateQuestion(params: {
    subject: string;
    skill: string;
    level: string;
    localContext?: string;
    extraNotes?: string;
  }): Promise<{ question: QuestionTask; note?: string }> {
    const res = await fetch('/api/ai/generate-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      throw new Error('Không thể kết nối máy chủ tạo câu hỏi AI');
    }
    return await res.json();
  },

  async diagnoseError(params: {
    questionText: string;
    chosenAnswer: string;
    correctAnswer: string;
    explanation: string;
    subject: string;
  }): Promise<DiagnoseResult> {
    try {
      const res = await fetch('/api/ai/diagnose-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Fallback error diagnosis:', err);
    }

    return {
      diagnosis: 'Con đã rất cố gắng suy nghĩ! Đáp án này chưa hoàn toàn khớp với đề bài.',
      gentleHint: 'Con hãy đọc lại câu hỏi xem bài toán đang hỏi về số lượng của sự vật nào nhé. Bác thợ mộc tin con sẽ tìm ra!',
      encouragement: 'Không sao đâu bé ngoan, làm sai là một phần của học tập. Hãy thử lại một lần nữa nhé!'
    };
  },

  async reviewSentence(sentence: string, promptText?: string): Promise<ReviewSentenceResult> {
    try {
      const res = await fetch('/api/ai/review-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence, promptText }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Fallback sentence review:', err);
    }

    // Fallback deterministic evaluation for Grade 2
    const trimmed = (sentence || '').trim();
    const startsWithCapital = /^[A-ZÀ-Ỹ]/.test(trimmed);
    const endsWithPunctuation = /[.!?]$/.test(trimmed);
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;

    let advice: string[] = [];
    if (!startsWithCapital) advice.push('Đầu câu con nhớ viết hoa chữ cái đầu tiên nhé.');
    if (!endsWithPunctuation) advice.push('Cuối câu con nhớ đặt dấu chấm (.) nhé.');
    if (wordCount < 4) advice.push('Con có thể mở rộng câu bằng cách thêm từ chỉ đặc điểm hoa văn gỗ hay người thợ mộc.');

    return {
      isGood: startsWithCapital && endsWithPunctuation && wordCount >= 4,
      score: startsWithCapital && endsWithPunctuation ? 10 : 8,
      praise: 'Mộc Mộc rất vui vì con đã tự tin đặt câu về làng nghề Phù Khê quê hương!',
      feedback: advice.length > 0 ? advice.join(' ') : 'Câu văn rất chuẩn ngữ pháp lớp 2: Đầu câu viết hoa, cuối câu có dấu chấm rõ ràng!',
      improvedSuggestion: `${trimmed || 'Làng Phù Khê quê em'} rất nổi tiếng với nghề chạm khắc gỗ tinh xảo.`
    };
  },

  // Web Speech API for Vietnamese child voice
  speakText(text: string) {
    if (!('speechSynthesis' in window)) {
      return false;
    }
    try {
      window.speechSynthesis.cancel(); // Stop any previous speech
      const cleanText = text.replace(/[*#_~]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9; // Slightly slower, clear for grade 2 kids
      utterance.pitch = 1.15; // Cheerful friendly pitch

      // Pick a Vietnamese voice if available in browser
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.startsWith('vi'));
      if (viVoice) {
        utterance.voice = viVoice;
      }
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      return false;
    }
  },

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
