import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Volume2, 
  Sparkles, 
  Plus, 
  Trash2, 
  Tag, 
  BookOpen, 
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  Info
} from 'lucide-react';
import { HeritageItem, SubjectId } from '../../types';
import { aiService } from '../../services/aiService';
import confetti from 'canvas-confetti';

interface HeritageExplorerViewProps {
  items: HeritageItem[];
  onAddItem: (item: HeritageItem) => void;
  onDeleteItem: (id: string) => void;
  soundEnabled: boolean;
  largeText: boolean;
  isTeacherMode?: boolean;
}

export const HeritageExplorerView: React.FC<HeritageExplorerViewProps> = ({
  items,
  onAddItem,
  onDeleteItem,
  soundEnabled,
  largeText,
  isTeacherMode = false,
}) => {
  const [selectedItem, setSelectedItem] = useState<HeritageItem>(items[0]);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state for teachers
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<HeritageItem['category']>('san_pham');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newDetailedStory, setNewDetailedStory] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newSourceCredit, setNewSourceCredit] = useState('Trường TH Phù Khê 2');
  const [newLicenseNote, setNewLicenseNote] = useState('Đã thẩm định chuẩn GDPT 2018');
  const [newVerified, setNewVerified] = useState(true);

  const handleSelectObservationAnswer = (option: string) => {
    setUserAnswer(option);
    setShowFeedback(true);
    if (option === selectedItem.grade2ObservationQuestion.correctAnswer) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
      if (soundEnabled) {
        aiService.speakText('Hoan hô con! Con quan sát rất tinh tế và chọn đúng rồi đó!');
      }
    } else {
      if (soundEnabled) {
        aiService.speakText('Con hãy nhìn kỹ lại hình ảnh hoặc đọc lại lời bạn Mộc Mộc nhé.');
      }
    }
  };

  const handleReadText = (text: string) => {
    aiService.speakText(text);
  };

  const handleSaveNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: HeritageItem = {
      id: `pk-item-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      shortDesc: newShortDesc || 'Tư liệu học tập làng nghề mộc Phù Khê.',
      detailedStory: newDetailedStory || 'Tư liệu văn hóa được sưu tầm phục vụ bài dạy khối 2.',
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      imageCaption: `Hình minh họa: ${newTitle}`,
      sourceCredit: newSourceCredit,
      licenseNote: newLicenseNote,
      isVerified: newVerified,
      subjectLinks: ['toan', 'tieng_viet', 'tn_xh'],
      grade2ObservationQuestion: {
        question: `Quan sát ${newTitle}, con thấy điểm nổi bật nhất là gì?`,
        options: ['Đường nét thủ công tỉ mỉ', 'Được làm từ nhựa dẻo', 'Không có hình dạng', 'Rất nhẹ và mềm'],
        correctAnswer: 'Đường nét thủ công tỉ mỉ',
        funFact: 'Sản phẩm mộc Phù Khê luôn được làm từ tâm huyết của các nghệ nhân quê hương.'
      }
    };

    onAddItem(newItem);
    setSelectedItem(newItem);
    setShowAddModal(false);
    // Reset form
    setNewTitle('');
    setNewShortDesc('');
    setNewDetailedStory('');
    setNewImageUrl('');
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#F7C65F] text-[#75462A] px-3 py-1 rounded-full uppercase tracking-wider">
              Phân hệ 1 • K1 Khám phá
            </span>
            <span className="text-xs bg-emerald-100 text-[#42855B] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tư liệu kiểm chứng
            </span>
          </div>
          <h1 className={`font-black text-[#75462A] mt-2 ${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            Kho Học Liệu Làng Nghề Phù Khê
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Khám phá vẻ đẹp bàn tay nghệ nhân quê hương, tìm hiểu dụng cụ đồ mộc và hoa văn truyền thống qua đôi mắt học sinh lớp 2.
          </p>
        </div>

        {/* Teacher add material button */}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#75462A] hover:bg-[#5c3721] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm tư liệu học liệu mới</span>
        </button>
      </div>

      {/* Main Split Layout: Item list & Detailed Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Thumbnail Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-sm font-bold text-[#75462A] uppercase tracking-wider flex items-center justify-between">
            <span>Danh mục tư liệu ({items.length})</span>
            <span className="text-xs text-slate-400 font-normal">Chọn để xem</span>
          </h2>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {items.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setUserAnswer(null);
                    setShowFeedback(false);
                  }}
                  className={`cursor-pointer rounded-2xl p-3 border-2 transition-all duration-200 flex items-center gap-3 relative ${
                    isSelected
                      ? 'bg-[#FFF8EC] border-[#75462A] shadow-md scale-[1.01]'
                      : 'bg-white border-amber-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-amber-200 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {item.isVerified ? (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          Đã duyệt
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          Chờ duyệt
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 capitalize">{item.category}</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.shortDesc}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-8 bg-[#75462A] rounded-full absolute right-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Card & Observation Task */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md">
            {/* Image Preview & Caption */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-100 bg-amber-50 group">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-medium text-amber-200">
                    {selectedItem.imageCaption}
                  </span>
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    Nguồn: {selectedItem.sourceCredit}
                  </span>
                </div>
              </div>
            </div>

            {/* Title & Speech reading */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#42855B] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      Chủ đề: {selectedItem.category === 'hoa_van' ? 'Hoa văn điêu khắc' : selectedItem.category === 'cong_cu' ? 'Dụng cụ nghề mộc' : selectedItem.category === 'san_pham' ? 'Sản phẩm bàn ghế gỗ' : 'Di tích quê hương'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Bản quyền: {selectedItem.licenseNote}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#75462A] mt-1.5">
                    {selectedItem.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => handleReadText(`${selectedItem.title}. ${selectedItem.detailedStory}`)}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[#75462A] rounded-xl text-xs font-bold transition-all shadow-xs"
                  title="Mộc Mộc đọc cho bé nghe"
                >
                  <Volume2 className="w-4 h-4 text-[#42855B]" />
                  <span>Nghe đọc</span>
                </button>
              </div>

              {/* Story for Grade 2 */}
              <div className="bg-[#FFF8EC] rounded-2xl p-4 border border-amber-200 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>{selectedItem.detailedStory}</p>
              </div>

              {/* Observation Mission for Student */}
              <div className="mt-6 pt-5 border-t border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-[#75462A]">
                  <HelpCircle className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="font-bold text-base">
                    Nhiệm vụ quan sát dành cho thợ mộc nhí:
                  </h3>
                </div>

                <p className="text-sm sm:text-base font-semibold text-slate-800">
                  {selectedItem.grade2ObservationQuestion.question}
                </p>

                {/* 4 Interactive Choice Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {selectedItem.grade2ObservationQuestion.options.map((opt, i) => {
                    const isSelected = userAnswer === opt;
                    const isCorrect = opt === selectedItem.grade2ObservationQuestion.correctAnswer;
                    let btnStyle = 'bg-white border-2 border-amber-200 hover:border-amber-400 text-slate-800';

                    if (showFeedback && isSelected) {
                      btnStyle = isCorrect 
                        ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-rose-50 border-2 border-rose-400 text-rose-900 font-bold';
                    } else if (showFeedback && isCorrect) {
                      btnStyle = 'bg-emerald-50/50 border-2 border-emerald-400 text-emerald-900';
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectObservationAnswer(opt)}
                        className={`text-left p-3.5 rounded-2xl transition-all shadow-xs active:scale-98 text-xs sm:text-sm ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-[#75462A] text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback box */}
                {showFeedback && (
                  <div className={`p-4 rounded-2xl border-2 transition-all mt-3 ${
                    userAnswer === selectedItem.grade2ObservationQuestion.correctAnswer
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {userAnswer === selectedItem.grade2ObservationQuestion.correctAnswer ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span>Chính xác tuyệt vời!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          <span>Chưa chính xác rồi bé ơi!</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm mt-1.5 leading-relaxed">
                      💡 <strong>Mộc Mộc bật mí:</strong> {selectedItem.grade2ObservationQuestion.funFact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Heritage Item Modal (Teacher Capability) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#D4A373] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#75462A] mb-1">
              Thêm tư liệu học liệu Phù Khê mới
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Giáo viên kiểm chứng nguồn gốc, hình ảnh và gắn nhãn bản quyền trước khi đưa vào lớp học.
            </p>

            <form onSubmit={handleSaveNewItem} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên tư liệu / sản phẩm:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoa văn hoa sen chạm lộng trên gỗ dổi"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl focus:border-[#75462A] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chủ đề:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl bg-white outline-hidden"
                  >
                    <option value="hoa_van">Hoa văn điêu khắc</option>
                    <option value="cong_cu">Dụng cụ thợ mộc</option>
                    <option value="san_pham">Sản phẩm mỹ nghệ</option>
                    <option value="di_tich">Di tích văn hóa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kiểm duyệt:</label>
                  <div className="flex items-center gap-2 h-10 px-2">
                    <input
                      type="checkbox"
                      id="verifiedCheck"
                      checked={newVerified}
                      onChange={(e) => setNewVerified(e.target.checked)}
                      className="w-4 h-4 text-[#42855B] rounded accent-[#42855B]"
                    />
                    <label htmlFor="verifiedCheck" className="text-xs font-bold text-[#42855B]">
                      Đã xác nhận kiểm chứng
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Đường dẫn ảnh minh họa (URL):</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl focus:border-[#75462A] outline-hidden"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Lưu ý bản quyền: Chỉ dùng ảnh chụp thực tế đã được phép hoặc tranh minh họa nguyên gốc.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mô tả ngắn cho học sinh lớp 2:</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả dễ hiểu, thân thiện lứa tuổi 7-8..."
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  className="w-full px-3.5 py-2 border border-amber-300 rounded-xl focus:border-[#75462A] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nguồn thông tin & Bản quyền sử dụng:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Trường Tiểu học Phù Khê 2 / Phòng GD&ĐT Từ Sơn"
                  value={newSourceCredit}
                  onChange={(e) => setNewSourceCredit(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl focus:border-[#75462A] outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 font-bold"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#75462A] hover:bg-[#5c3721] text-white rounded-xl font-bold shadow-md"
                >
                  Lưu vào kho học liệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
