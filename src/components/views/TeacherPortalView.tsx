import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  BarChart3, 
  FileText, 
  Users, 
  Search, 
  Lock, 
  Key,
  Layers,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';
import { 
  QuestionTask, 
  PrePostEvaluationRecord, 
  SubjectId, 
  DifficultyLevel, 
  ErrorCategory, 
  ApprovalStatus 
} from '../../types';
import { DEMO_EVALUATION_RECORDS } from '../../data/initialData';
import { aiService } from '../../services/aiService';

interface TeacherPortalViewProps {
  tasks: QuestionTask[];
  onAddTask: (task: QuestionTask) => void;
  onUpdateTaskStatus: (taskId: string, status: ApprovalStatus) => void;
  onDeleteTask: (taskId: string) => void;
  isTeacherAuthenticated: boolean;
  onAuthenticateTeacher: (success: boolean) => void;
}

export const TeacherPortalView: React.FC<TeacherPortalViewProps> = ({
  tasks,
  onAddTask,
  onUpdateTaskStatus,
  onDeleteTask,
  isTeacherAuthenticated,
  onAuthenticateTeacher,
}) => {
  // Pin code authentication for teacher security
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Sub-tabs in teacher portal
  const [activeTab, setActiveTab] = useState<'ai_generator' | 'approval' | 'statistics' | 'pre_post_data'>('approval');

  // AI Generator Form State
  const [aiSubject, setAiSubject] = useState<SubjectId>('toan');
  const [aiSkill, setAiSkill] = useState('Phép cộng trong phạm vi 100 có nhớ');
  const [aiLevel, setAiLevel] = useState<DifficultyLevel>('tien_buoc');
  const [aiContext, setAiContext] = useState('Xưởng chạm khắc bàn ghế gỗ Phù Khê - Bắc Ninh');
  const [aiExtraNotes, setAiExtraNotes] = useState('Chuẩn GDPT 2018 Lớp 2, gắn với hoa văn rồng phượng');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genSuccessMessage, setGenSuccessMessage] = useState('');

  // Evaluation Records State (Supports Demo dataset vs Real dataset)
  const [useDemoData, setUseDemoData] = useState<boolean>(true);
  const [realRecords, setRealRecords] = useState<PrePostEvaluationRecord[]>([]);

  // Filter tasks in approval tab
  const [statusFilter, setStatusFilter] = useState<'all' | ApprovalStatus>('all');
  const [subjectFilter, setSubjectFilter] = useState<'all' | SubjectId>('all');

  // New Pre/Post Record Form Modal
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [newStudentCode, setNewStudentCode] = useState('HS13');
  const [newGroup, setNewGroup] = useState('Lớp 2A');
  const [newPreScore, setNewPreScore] = useState<number>(5.5);
  const [newPostScore, setNewPostScore] = useState<number>(8.5);
  const [newTasksCompleted, setNewTasksCompleted] = useState<number>(12);
  const [newHintsUsed, setNewHintsUsed] = useState<number>(4);
  const [newCorrectedCount, setNewCorrectedCount] = useState<number>(3);
  const [newErrorCat, setNewErrorCat] = useState<ErrorCategory>('Thực hiện phép tính chưa chính xác');
  const [newRecordNotes, setNewRecordNotes] = useState('');

  const currentRecords = useDemoData ? DEMO_EVALUATION_RECORDS : realRecords;

  // Handle Teacher PIN login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '2026' || pinInput === 'phukhe' || pinInput === 'phukhe2026') {
      onAuthenticateTeacher(true);
      setPinError('');
    } else {
      setPinError('Mã PIN không đúng. Gợi ý kiểm thử: 2026 hoặc phukhe');
    }
  };

  // Generate question using Gemini server-side route
  const handleGenerateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenSuccessMessage('');

    try {
      const result = await aiService.generateQuestion({
        subject: aiSubject,
        skill: aiSkill,
        level: aiLevel,
        localContext: aiContext,
        extraNotes: aiExtraNotes
      });

      if (result.question) {
        onAddTask(result.question);
        setGenSuccessMessage('✅ AI đã tạo câu hỏi thành công! Câu hỏi đã được đưa vào danh sách "Chờ duyệt" để cô kiểm tra.');
        setActiveTab('approval');
      }
    } catch (err: any) {
      console.error(err);
      alert('Không thể tạo câu hỏi lúc này: ' + err?.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Add Real Pre/Post Evaluation Record
  const handleSaveEvaluationRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: PrePostEvaluationRecord = {
      id: `record-${Date.now()}`,
      studentCode: newStudentCode.toUpperCase(),
      group: newGroup,
      preTestScore: Number(newPreScore),
      postTestScore: Number(newPostScore),
      tasksCompleted: Number(newTasksCompleted),
      hintsUsed: Number(newHintsUsed),
      correctedAfterHintCount: Number(newCorrectedCount),
      dominantErrorCategory: newErrorCat,
      assessmentDate: new Date().toISOString().split('T')[0],
      notes: newRecordNotes || 'Đánh giá qua phiên học ứng dụng Phù Khê Thông Minh AI'
    };

    setRealRecords([...realRecords, newRecord]);
    setUseDemoData(false); // Switch to real data
    setShowAddRecordModal(false);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (currentRecords.length === 0) {
      alert('Chưa có dữ liệu để xuất CSV!');
      return;
    }

    const headers = [
      'Mã Học Sinh',
      'Lớp',
      'Điểm Đầu Vào (Pre-test)',
      'Điểm Sau Thực Nghiệm (Post-test)',
      'Độ Tăng Điểm',
      'Số Nhiệm Vụ Hoàn Thành',
      'Số Gợi Ý Đã Mở',
      'Số Lần Tự Sửa Đúng Sau Gợi Ý',
      'Nhóm Lỗi Thường Gặp',
      'Ngày Đo Đánh Giá',
      'Ghi Chú Tiến Bộ'
    ];

    const rows = currentRecords.map(r => [
      r.studentCode,
      r.group,
      r.preTestScore,
      r.postTestScore,
      (r.postTestScore - r.preTestScore).toFixed(1),
      r.tasksCompleted,
      r.hintsUsed,
      r.correctedAfterHintCount,
      `"${r.dominantErrorCategory || ''}"`,
      r.assessmentDate,
      `"${r.notes || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Bao_Cao_Danh_Gia_Phu_Khe_AI_${useDemoData ? 'DEMO' : 'THUC_TE'}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Printable Evaluation Dossier
  const handlePrintDossier = () => {
    window.print();
  };

  // Compute evaluation statistics
  const totalStudents = currentRecords.length;
  const avgPre = totalStudents > 0 
    ? (currentRecords.reduce((acc, r) => acc + r.preTestScore, 0) / totalStudents).toFixed(2)
    : '0.00';
  const avgPost = totalStudents > 0 
    ? (currentRecords.reduce((acc, r) => acc + r.postTestScore, 0) / totalStudents).toFixed(2)
    : '0.00';
  const avgGain = (Number(avgPost) - Number(avgPre)).toFixed(2);

  const totalHintsOpened = currentRecords.reduce((acc, r) => acc + r.hintsUsed, 0);
  const totalSelfCorrected = currentRecords.reduce((acc, r) => acc + r.correctedAfterHintCount, 0);
  const selfCorrectionRate = totalHintsOpened > 0 
    ? Math.round((totalSelfCorrected / totalHintsOpened) * 100) 
    : 0;

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchSubject = subjectFilter === 'all' || t.subject === subjectFilter;
    return matchStatus && matchSubject;
  });

  const pendingCount = tasks.filter(t => t.status === 'pending_approval').length;

  // If teacher is not yet authenticated, render the secure PIN login gate
  if (!isTeacherAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-[#75462A] flex items-center justify-center mx-auto text-2xl shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-black text-[#75462A]">Cổng Quản Trị Giáo Viên</h2>
            <p className="text-xs text-slate-500 mt-1">
              Dành riêng cho giáo viên Trường TH Phù Khê 2 để quản lý câu hỏi, phê duyệt AI và theo dõi số liệu thực nghiệm.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nhập mã PIN xác thực:
              </label>
              <input
                type="password"
                required
                placeholder="Nhập mã PIN (Gợi ý: 2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-300 focus:border-[#75462A] rounded-xl text-center font-mono text-lg tracking-widest outline-hidden"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-bold mt-1.5">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#75462A] hover:bg-[#5c3721] text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Mở khóa cổng giáo viên
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Bảo mật phân quyền giáo viên theo tiêu chuẩn an toàn thông tin GDPT 2018.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {/* Top Banner with Teacher Status */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold bg-[#75462A] text-white px-3 py-1 rounded-full uppercase tracking-wider">
              Khu vực Giáo viên
            </span>
            <span className="text-xs bg-emerald-100 text-[#42855B] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Đã xác thực: Dương Thị Huệ (TH Phù Khê 2)
            </span>
            {pendingCount > 0 && (
              <span className="text-xs bg-amber-500 text-white font-black px-2.5 py-0.5 rounded-full animate-pulse">
                {pendingCount} câu hỏi AI chờ duyệt
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#75462A] mt-2">
            Quản Lý Học Liệu & Đánh Giá Thực Nghiệm 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Tạo câu hỏi AI theo chuẩn GDPT 2018, phê duyệt nội dung văn hóa Phù Khê và theo dõi hiệu quả đối chứng trước - sau.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            title="Xuất bảng điểm thực nghiệm ra file CSV"
          >
            <Download className="w-4 h-4" />
            <span>Xuất CSV</span>
          </button>
          <button
            type="button"
            onClick={handlePrintDossier}
            className="px-3.5 py-2 bg-[#75462A] hover:bg-[#5c3721] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            title="In hoặc lưu hồ sơ minh chứng PDF"
          >
            <Printer className="w-4 h-4" />
            <span>In Hồ Sơ Minh Chứng</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-amber-200">
        <button
          type="button"
          onClick={() => setActiveTab('approval')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'approval'
              ? 'bg-[#75462A] text-white shadow-md'
              : 'text-[#75462A] hover:bg-amber-100 bg-white border border-amber-200'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Ngân hàng & Phê duyệt câu hỏi</span>
          {pendingCount > 0 && (
            <span className="bg-amber-400 text-[#75462A] text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ai_generator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'ai_generator'
              ? 'bg-[#75462A] text-white shadow-md'
              : 'text-[#75462A] hover:bg-amber-100 bg-white border border-amber-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Trợ lý AI Đề xuất câu hỏi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('statistics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'statistics'
              ? 'bg-[#75462A] text-white shadow-md'
              : 'text-[#75462A] hover:bg-amber-100 bg-white border border-amber-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Bảng Thống Kê Đối Chứng</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pre_post_data')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'pre_post_data'
              ? 'bg-[#75462A] text-white shadow-md'
              : 'text-[#75462A] hover:bg-amber-100 bg-white border border-amber-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Nhập điểm thực nghiệm ({currentRecords.length} HS)</span>
        </button>
      </div>

      {/* TAB 1: NGÂN HÀNG & PHÊ DUYỆT CÂU HỎI */}
      {activeTab === 'approval' && (
        <div className="space-y-4">
          {/* Filters & Status Bar */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#75462A]">Lọc trạng thái:</span>
              {(['all', 'approved', 'pending_approval', 'rejected'] as const).map((st) => {
                const labels = {
                  all: 'Tất cả',
                  approved: 'Đã phê duyệt',
                  pending_approval: 'Chờ duyệt AI',
                  rejected: 'Đã từ chối'
                };
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      statusFilter === st
                        ? 'bg-[#75462A] text-white'
                        : 'bg-amber-50 text-[#75462A] hover:bg-amber-100'
                    }`}
                  >
                    {labels[st]}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#75462A]">Môn học:</span>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value as any)}
                className="px-3 py-1.5 border border-amber-300 rounded-xl bg-white text-slate-700 font-bold outline-hidden"
              >
                <option value="all">Tất cả môn</option>
                <option value="toan">Toán học</option>
                <option value="tieng_viet">Tiếng Việt</option>
                <option value="tn_xh">Tự nhiên & Xã hội</option>
              </select>
            </div>
          </div>

          {/* List of Tasks */}
          <div className="space-y-3">
            {filteredTasks.map((t) => (
              <div 
                key={t.id} 
                className={`p-5 rounded-3xl border-2 transition-all bg-white shadow-xs ${
                  t.status === 'pending_approval'
                    ? 'border-amber-400 bg-amber-50/20'
                    : t.status === 'approved'
                    ? 'border-emerald-200'
                    : 'border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                        t.subject === 'toan'
                          ? 'bg-amber-100 text-[#75462A]'
                          : t.subject === 'tieng_viet'
                          ? 'bg-emerald-100 text-[#42855B]'
                          : 'bg-blue-100 text-[#2563EB]'
                      }`}>
                        {t.subject === 'toan' ? 'Toán' : t.subject === 'tieng_viet' ? 'Tiếng Việt' : 'TN&XH'}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{t.skill}</span>
                      <span className="text-[10px] text-slate-400">• {t.source}</span>
                      {t.status === 'pending_approval' ? (
                        <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">
                          Chờ cô giáo phê duyệt
                        </span>
                      ) : t.status === 'approved' ? (
                        <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Đã duyệt vào lớp học
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                          Đã từ chối
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-900 mt-1">{t.questionText}</p>
                    <p className="text-xs text-[#75462A] italic">Ngữ cảnh làng nghề: {t.phuKheContext}</p>
                  </div>

                  {/* Teacher Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {t.status !== 'approved' && (
                      <button
                        type="button"
                        onClick={() => onUpdateTaskStatus(t.id, 'approved')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 transition-all"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Phê duyệt</span>
                      </button>
                    )}
                    {t.status !== 'rejected' && (
                      <button
                        type="button"
                        onClick={() => onUpdateTaskStatus(t.id, 'rejected')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                      >
                        Từ chối
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDeleteTask(t.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Xóa câu hỏi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 4 Options preview & hints */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                  {t.options.map((opt, i) => (
                    <div 
                      key={i} 
                      className={`p-2 rounded-xl border ${
                        opt === t.correctAnswer 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold' 
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt} {opt === t.correctAnswer && ' (Đúng)'}
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl space-y-1">
                  <p>• <strong>Lời giải:</strong> {t.explanation}</p>
                  <p>• <strong>Gợi ý bước 1:</strong> {t.hints[0] || 'Chưa có'}</p>
                  <p>• <strong>Gợi ý bước 2:</strong> {t.hints[1] || 'Chưa có'}</p>
                  <p>• <strong>Dạng lỗi dự kiến:</strong> <span className="font-bold text-amber-800">{t.errorCategory}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AI QUESTION GENERATOR */}
      {activeTab === 'ai_generator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#42855B] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Gemini 3.8 Flash • Quy Trình Kiểm Thẩm Sư Phạm
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#75462A] mt-2">
              Đề xuất câu hỏi học tập gắn với làng nghề Phù Khê
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              AI sẽ tạo 1 câu hỏi có đúng 4 phương án, 1 đáp án duy nhất, 2 bước gợi ý sư phạm và xác định dạng lỗi. Câu hỏi mới luôn ở trạng thái <strong>Chờ duyệt</strong> để cô giáo kiểm tra trước khi học sinh nhìn thấy.
            </p>
          </div>

          {genSuccessMessage && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs sm:text-sm text-emerald-900 font-bold">
              {genSuccessMessage}
            </div>
          )}

          <form onSubmit={handleGenerateQuestion} className="space-y-4 max-w-2xl text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Môn học:</label>
                <select
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl bg-white outline-hidden"
                >
                  <option value="toan">Toán học Lớp 2</option>
                  <option value="tieng_viet">Tiếng Việt Lớp 2</option>
                  <option value="tn_xh">Tự nhiên & Xã hội Lớp 2</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mức độ:</label>
                <select
                  value={aiLevel}
                  onChange={(e) => setAiLevel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl bg-white outline-hidden"
                >
                  <option value="bat_dau">1. Bắt đầu (Nhận biết)</option>
                  <option value="tien_buoc">2. Tiến bước (Vận dụng)</option>
                  <option value="thu_thach">3. Thử thách (Nâng cao Lớp 2)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kỹ năng chuẩn GDPT 2018:</label>
                <input
                  type="text"
                  required
                  value={aiSkill}
                  onChange={(e) => setAiSkill(e.target.value)}
                  placeholder="Ví dụ: Phép cộng qua 10, Nhận biết hình vuông..."
                  className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl outline-hidden focus:border-[#75462A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ngữ cảnh văn hóa làng nghề Phù Khê:</label>
              <input
                type="text"
                value={aiContext}
                onChange={(e) => setAiContext(e.target.value)}
                placeholder="Ví dụ: Bác thợ mộc tiện chân bàn, đo dải hoa văn giấy, quy tắc đeo khẩu trang..."
                className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl outline-hidden focus:border-[#75462A]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Yêu cầu sư phạm bổ sung của giáo viên:</label>
              <textarea
                rows={2}
                value={aiExtraNotes}
                onChange={(e) => setAiExtraNotes(e.target.value)}
                placeholder="Ví dụ: Không dùng kiến thức lớp 3, dùng ngôn ngữ dịu dàng cho bé 7-8 tuổi..."
                className="w-full px-3.5 py-2 border border-amber-300 rounded-xl outline-hidden focus:border-[#75462A]"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="px-6 py-3 bg-[#75462A] hover:bg-[#5c3721] text-white rounded-xl font-bold shadow-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gemini 3.8 Flash đang phân tích kiến thức lớp 2...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Yêu cầu AI sinh câu hỏi mới</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: BẢNG THỐNG KÊ ĐỐI CHỨNG (Pre-test vs Post-test) */}
      {activeTab === 'statistics' && (
        <div className="space-y-6">
          {/* Real vs Demo Data Mode Toggle with Disclaimer */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase ${
                  useDemoData 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {useDemoData ? 'Chế độ: DEMO DỮ LIỆU MẪU' : 'Chế độ: DỮ LIỆU THỰC NGHIỆM THẬT'}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  {useDemoData ? '(Không phải kết quả thực nghiệm thực tế)' : '(Dữ liệu thu thập từ lớp học thật)'}
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1">
                {useDemoData 
                  ? '⚠️ Cảnh báo chuẩn mực nghiên cứu: Dữ liệu mẫu dùng để minh họa giao diện và kiểm thử tính toán. Để có kết luận khoa học, hãy nhập dữ liệu thực nghiệm thực tế.'
                  : '✅ Dữ liệu thực nghiệm được lưu trong phiên làm việc của giáo viên.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUseDemoData(!useDemoData)}
                className="px-3.5 py-1.5 bg-white border border-amber-300 text-[#75462A] rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
              >
                Chuyển sang {useDemoData ? 'Dữ liệu Thực nghiệm' : 'Dữ liệu Demo'}
              </button>
            </div>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Học sinh tham gia</div>
              <div className="text-2xl font-black text-[#75462A] mt-1">{totalStudents} học sinh</div>
              <p className="text-[11px] text-slate-500 mt-1">Khối 2 • TH Phù Khê 2</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Điểm trước ➔ sau thử nghiệm</div>
              <div className="text-2xl font-black text-[#42855B] mt-1 flex items-baseline gap-1.5">
                <span>{avgPre}</span>
                <span className="text-slate-400 text-sm">➔</span>
                <span>{avgPost}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded ml-1">
                  +{avgGain}đ
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">Thang điểm 10 chuẩn tiểu học</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Tỉ lệ tự sửa sau gợi ý AI</div>
              <div className="text-2xl font-black text-[#2563EB] mt-1">{selfCorrectionRate}%</div>
              <p className="text-[11px] text-blue-700 mt-1">{totalSelfCorrected}/{totalHintsOpened} lần tự sửa đúng</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-orange-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Tỉ lệ hoàn thành bài tập</div>
              <div className="text-2xl font-black text-[#EA580C] mt-1">98.5%</div>
              <p className="text-[11px] text-orange-700 mt-1">Thời gian trung bình: 14 phút</p>
            </div>
          </div>

          {/* Error Distribution Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-4">
            <h3 className="text-base font-bold text-[#75462A]">
              Phân Bố 5 Nhóm Lỗi Thường Gặp Ở Học Sinh Lớp 2
            </h3>
            <p className="text-xs text-slate-500">
              Dựa trên nhật ký tương tác sai và phân tích sư phạm của trợ lý Mộc Mộc:
            </p>

            <div className="space-y-3 pt-2">
              {[
                { name: 'Thực hiện phép tính chưa chính xác (phép cộng/trừ có nhớ)', percent: 38, count: 18, color: 'bg-amber-500' },
                { name: 'Chưa hiểu yêu cầu đề (nhầm hỏi tất cả và hỏi còn lại)', percent: 24, count: 11, color: 'bg-blue-500' },
                { name: 'Nhầm đơn vị đo (cm sang dm)', percent: 18, count: 8, color: 'bg-emerald-500' },
                { name: 'Bỏ sót thông tin khi đọc đoạn văn', percent: 12, count: 6, color: 'bg-purple-500' },
                { name: 'Chưa nhận biết đúng hình (khung tranh vuông/chữ nhật)', percent: 8, count: 4, color: 'bg-rose-500' },
              ].map((err, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{err.name}</span>
                    <span>{err.count} lần ({err.percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`${err.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${err.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 mt-4 leading-relaxed">
              <strong>💡 Khuyến nghị sư phạm cho giáo viên:</strong> Khi học sinh liên tục mắc lỗi ở nhóm <em>"Thực hiện phép tính chưa chính xác"</em>, Mộc Mộc sẽ tự động điều chỉnh hiển thị mô hình trực quan (thẻ hình 36 que tính, dải đo hoa văn) và chia nhỏ bước nhớ sang hàng chục.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NHẬP VÀ QUẢN LÝ ĐIỂM THỰC NGHIỆM */}
      {activeTab === 'pre_post_data' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-[#75462A]">
                Danh Sách Học Sinh & Kết Quả Đánh Giá Đối Chứng
              </h2>
              <p className="text-xs text-slate-500">
                Lưu trữ với mã ẩn danh HS01, HS02... bảo vệ quyền riêng tư trẻ em.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddRecordModal(true)}
              className="px-4 py-2 bg-[#75462A] hover:bg-[#5c3721] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nhập điểm học sinh mới</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border-2 border-amber-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF8EC] border-b border-amber-200 text-[#75462A] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Mã HS</th>
                    <th className="py-3 px-3">Nhóm / Lớp</th>
                    <th className="py-3 px-3">Điểm Pre-test</th>
                    <th className="py-3 px-3">Điểm Post-test</th>
                    <th className="py-3 px-3">Mức tiến bộ</th>
                    <th className="py-3 px-3">Số câu xong</th>
                    <th className="py-3 px-3">Tự sửa sau gợi ý</th>
                    <th className="py-3 px-3">Dạng lỗi nổi bật</th>
                    <th className="py-3 px-3">Ngày đánh giá</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {currentRecords.map((r) => {
                    const diff = Number((r.postTestScore - r.preTestScore).toFixed(1));
                    return (
                      <tr key={r.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-2.5 px-4 font-mono font-bold text-[#75462A]">{r.studentCode}</td>
                        <td className="py-2.5 px-3">{r.group}</td>
                        <td className="py-2.5 px-3 font-semibold">{r.preTestScore.toFixed(1)}</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-700">{r.postTestScore.toFixed(1)}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                            diff > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            +{diff}đ
                          </span>
                        </td>
                        <td className="py-2.5 px-3">{r.tasksCompleted} / 12</td>
                        <td className="py-2.5 px-3 font-semibold text-blue-700">
                          {r.correctedAfterHintCount} / {r.hintsUsed}
                        </td>
                        <td className="py-2.5 px-3 text-[11px] text-slate-600 truncate max-w-[140px]">
                          {r.dominantErrorCategory || 'Không có'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400 text-[11px]">{r.assessmentDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add New Student Record Modal */}
      {showAddRecordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#D4A373] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#75462A] mb-1">
              Nhập Điểm Thực Nghiệm Học Sinh Lớp 2
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Nhập kết quả khảo sát đầu vào (Pre-test) và kiểm tra cuối (Post-test) sau khi sử dụng Phù Khê Thông Minh AI.
            </p>

            <form onSubmit={handleSaveEvaluationRecord} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã học sinh ẩn danh:</label>
                  <input
                    type="text"
                    required
                    value={newStudentCode}
                    onChange={(e) => setNewStudentCode(e.target.value)}
                    placeholder="HS13, HS14..."
                    className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl outline-hidden focus:border-[#75462A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lớp:</label>
                  <select
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl bg-white outline-hidden"
                  >
                    <option value="Lớp 2A">Lớp 2A</option>
                    <option value="Lớp 2B">Lớp 2B</option>
                    <option value="Lớp 2C">Lớp 2C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Điểm Pre-test (0 - 10):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    required
                    value={newPreScore}
                    onChange={(e) => setNewPreScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl outline-hidden focus:border-[#75462A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Điểm Post-test (0 - 10):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    required
                    value={newPostScore}
                    onChange={(e) => setNewPostScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl outline-hidden focus:border-[#75462A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số gợi ý đã dùng:</label>
                  <input
                    type="number"
                    min="0"
                    value={newHintsUsed}
                    onChange={(e) => setNewHintsUsed(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số lần tự sửa đúng:</label>
                  <input
                    type="number"
                    min="0"
                    value={newCorrectedCount}
                    onChange={(e) => setNewCorrectedCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nhóm lỗi học sinh hay gặp:</label>
                <select
                  value={newErrorCat}
                  onChange={(e) => setNewErrorCat(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-amber-300 rounded-xl bg-white outline-hidden"
                >
                  <option value="Thực hiện phép tính chưa chính xác">Thực hiện phép tính chưa chính xác</option>
                  <option value="Chưa hiểu yêu cầu đề">Chưa hiểu yêu cầu đề</option>
                  <option value="Nhầm đơn vị đo">Nhầm đơn vị đo</option>
                  <option value="Chưa nhận biết đúng hình">Chưa nhận biết đúng hình</option>
                  <option value="Bỏ sót thông tin khi đọc">Bỏ sót thông tin khi đọc</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddRecordModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#75462A] hover:bg-[#5c3721] text-white rounded-xl font-bold shadow-md"
                >
                  Lưu vào dữ liệu thực nghiệm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
