export type SubjectId = 'toan' | 'tieng_viet' | 'tn_xh' | 'stem';

export type DifficultyLevel = 'bat_dau' | 'tien_buoc' | 'thu_thach';

export type ErrorCategory =
  | 'Chưa hiểu yêu cầu đề'
  | 'Thực hiện phép tính chưa chính xác'
  | 'Nhầm đơn vị đo'
  | 'Chưa nhận biết đúng hình'
  | 'Bỏ sót thông tin khi đọc';

export type ApprovalStatus = 'approved' | 'pending_approval' | 'rejected';

export interface QuestionTask {
  id: string;
  subject: SubjectId;
  skill: string;
  level: DifficultyLevel;
  phuKheContext: string;
  questionText: string;
  illustrationType?: 'table_chair' | 'dragon_pattern' | 'ribbon_cm' | 'wood_blocks' | 'artisan' | 'safety_sign' | 'reading_passage' | 'stem_paper';
  illustrationData?: any;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hints: string[]; // Step 1, Step 2
  errorCategory: ErrorCategory;
  status: ApprovalStatus;
  source: string;
  isVerified: boolean;
  reviewedBy?: string;
  createdAt: string;
}

export interface HeritageItem {
  id: string;
  title: string;
  category: 'san_pham' | 'hoa_van' | 'cong_cu' | 'nguyen_lieu' | 'di_tich';
  shortDesc: string;
  detailedStory: string;
  imageUrl: string;
  imageCaption: string;
  sourceCredit: string;
  licenseNote: string;
  isVerified: boolean;
  subjectLinks: SubjectId[];
  grade2ObservationQuestion: {
    question: string;
    options: string[];
    correctAnswer: string;
    funFact: string;
  };
}

export interface StudentSession {
  studentCode: string; // e.g. HS01, HS02
  groupName: string;
  points: number;
  completedTasks: string[];
  badges: string[];
  currentLevel: DifficultyLevel;
  errorLog: {
    taskId: string;
    errorCategory: ErrorCategory;
    chosenWrongAnswer: string;
    correctedAfterHint: boolean;
    timestamp: string;
  }[];
}

export interface PrePostEvaluationRecord {
  id: string;
  studentCode: string; // e.g. HS01
  group: string; // Lớp 2A / 2B
  preTestScore: number; // 0 - 10
  postTestScore: number; // 0 - 10
  tasksCompleted: number;
  hintsUsed: number;
  correctedAfterHintCount: number;
  dominantErrorCategory?: ErrorCategory;
  assessmentDate: string;
  notes: string;
}

export interface TeacherSettings {
  isDemoMode: boolean; // Demo mode vs Real Experimental Data mode
  currentSessionCode: string;
  activeClass: string;
  autoHintEnabled: boolean;
  speechEnabled: boolean;
}
