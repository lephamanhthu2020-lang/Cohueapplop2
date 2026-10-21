import { QuestionTask, HeritageItem, PrePostEvaluationRecord } from '../types';

export const INITIAL_HERITAGE_ITEMS: HeritageItem[] = [
  {
    id: 'pk-item-01',
    title: 'Hoa văn rồng chầu mặt nguyệt chạm khắc gỗ',
    category: 'hoa_van',
    shortDesc: 'Nét chạm tinh xảo trên gỗ mít của các nghệ nhân làng Phù Khê.',
    detailedStory: 'Từ đôi bàn tay khéo léo và chiếc đục nhỏ, các nghệ nhân làng Phù Khê (Bắc Ninh) đã thổi hồn vào từng thớ gỗ. Hoa văn rồng uốn lượn tượng trưng cho sự dũng cảm, mạnh mẽ và thịnh vượng của quê hương ta.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Hình minh họa: Tác phẩm điêu khắc gỗ thủ công truyền thống',
    sourceCredit: 'Tư liệu giáo dục địa phương - Trường TH Phù Khê 2',
    licenseNote: 'Ảnh học liệu giáo dục, đã kiểm duyệt sử dụng trong trường học',
    isVerified: true,
    subjectLinks: ['tieng_viet', 'tn_xh'],
    grade2ObservationQuestion: {
      question: 'Quan sát hoa văn rồng trên thớ gỗ, con thấy những đường nét của vảy rồng như thế nào?',
      options: ['Thô cứng, đứt đoạn', 'Uốn lượn, đều đặn và mềm mại', 'Thẳng tuột không uốn cong', 'Không có hình dạng rõ ràng'],
      correctAnswer: 'Uốn lượn, đều đặn và mềm mại',
      funFact: 'Người nghệ nhân Phù Khê phải học nghề từ 3 đến 5 năm mới chạm khắc được nét rồng sinh động như vậy đấy con ạ!'
    }
  },
  {
    id: 'pk-item-02',
    title: 'Bộ dụng cụ đồ mộc: Đục vũm, đục bạt và bào gỗ',
    category: 'cong_cu',
    shortDesc: 'Những người bạn đồng hành của nghệ nhân Phù Khê qua nhiều thế hệ.',
    detailedStory: 'Để tạo hình đồ gỗ, người thợ mộc dùng đục bạt để xén phẳng, đục vũm để chạm đường cong, bào để làm nhẵn mặt gỗ và thước mộc để đo chính xác từng xăng-ti-mét.',
    imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Hình minh họa: Bộ dụng cụ thủ công mộc truyền thống',
    sourceCredit: 'Bộ môn Tự nhiên và Xã hội 2 - Nhóm tác giả Phù Khê 2',
    licenseNote: 'Tư liệu mở phục vụ nghiên cứu GDPT 2018',
    isVerified: true,
    subjectLinks: ['toan', 'tn_xh', 'stem'],
    grade2ObservationQuestion: {
      question: 'Chiếc thước mộc giúp bác thợ mộc làm công việc gì quan trọng?',
      options: ['Để gõ vào gỗ cho kêu', 'Để đo độ dài chính xác từng xăng-ti-mét', 'Để cưa đứt thanh gỗ', 'Để sơn màu cho gỗ'],
      correctAnswer: 'Để đo độ dài chính xác từng xăng-ti-mét',
      funFact: 'Trong toán học lớp 2, chúng mình cũng học đo độ dài bằng xăng-ti-mét (cm) và đề-xi-mét (dm) giống các bác thợ mộc đấy!'
    }
  },
  {
    id: 'pk-item-03',
    title: 'Góc trưng bày sản phẩm bàn ghế rồng đỉnh',
    category: 'san_pham',
    shortDesc: 'Sản phẩm mộc mỹ nghệ nổi tiếng của vùng đất Phù Khê - Từ Sơn.',
    detailedStory: 'Phù Khê nổi danh khắp cả nước với những bộ bàn ghế rồng đỉnh, sập gụ, tủ chè được đục chạm kênh bong nhiều tầng lớp. Sản phẩm không chỉ đẹp mà còn bền chắc qua hàng chục năm.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Hình minh họa: Không gian nội thất gỗ truyền thống',
    sourceCredit: 'Tư liệu hợp tác Giáo viên - Làng nghề Phù Khê',
    licenseNote: 'Đã kiểm tra an toàn học đường và nội dung phù hợp lứa tuổi 7-8',
    isVerified: true,
    subjectLinks: ['toan', 'tieng_viet'],
    grade2ObservationQuestion: {
      question: 'Bàn ghế làm từ gỗ tốt ở làng Phù Khê có đặc điểm gì nổi bật?',
      options: ['Dễ gãy và rất mềm', 'Bền chắc, hoa văn tinh tế và ấm áp', 'Dễ tan trong nước', 'Nhẹ như bọt xốp'],
      correctAnswer: 'Bền chắc, hoa văn tinh tế và ấm áp',
      funFact: 'Gỗ mít vừa thơm vừa có màu vàng ấm áp, thường được các nghệ nhân ưu tiên dùng để tạc tượng và làm đồ gia dụng.'
    }
  },
  {
    id: 'pk-item-04',
    title: 'Di tích Đình Phù Khê Thượng và cây đa cổ thụ',
    category: 'di_tich',
    shortDesc: 'Nơi lưu giữ những mảng chạm khắc gỗ thế kỷ cổ kính của quê hương.',
    detailedStory: 'Đình làng Phù Khê là niềm tự hào của quê hương Bắc Ninh, nơi ghi dấu sự hình thành của nghề mộc từ hàng trăm năm trước. Mỗi cột gỗ, vì kèo đều là một tác phẩm điêu khắc vô giá.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Hình minh họa: Kiến trúc mái đình làng cổ truyền thống Việt Nam',
    sourceCredit: 'Sở GD&ĐT Bắc Ninh - Tài liệu Giáo dục Địa phương',
    licenseNote: 'Nguồn tư liệu di sản giáo dục Bắc Ninh',
    isVerified: true,
    subjectLinks: ['tieng_viet', 'tn_xh'],
    grade2ObservationQuestion: {
      question: 'Khi đến thăm di tích lịch sử đình làng Phù Khê, học sinh chúng mình cần làm gì?',
      options: ['Chạy nhảy la hét, khắc tên lên cột gỗ', 'Đi nhẹ, nói khẽ, giữ gìn vệ sinh và không vẽ bậy', 'Hái trộm hoa và bẻ cành cây cổ thụ', 'Vứt rác bừa bãi xuống sân đình'],
      correctAnswer: 'Đi nhẹ, nói khẽ, giữ gìn vệ sinh và không vẽ bậy',
      funFact: 'Giữ gìn di tích cũng chính là thể hiện lòng biết ơn các thế hệ nghệ nhân đi trước đấy các con!'
    }
  }
];

export const INITIAL_QUESTION_TASKS: QuestionTask[] = [
  // --- TOÁN (6 câu mẫu chuẩn quy chuẩn GDPT 2018 Lớp 2) ---
  {
    id: 'toan-01',
    subject: 'toan',
    skill: 'Phép cộng trong phạm vi 100',
    level: 'bat_dau',
    phuKheContext: 'Góc trưng bày ảnh sản phẩm mộc Phù Khê',
    questionText: 'Trong góc trưng bày có 12 bức ảnh bàn gỗ và 8 bức ảnh ghế gỗ. Hỏi có tất cả bao nhiêu bức ảnh?',
    illustrationType: 'table_chair',
    illustrationData: { tables: 12, chairs: 8 },
    options: ['18 bức ảnh', '20 bức ảnh', '22 bức ảnh', '24 bức ảnh'],
    correctAnswer: '20 bức ảnh',
    explanation: 'Muốn biết có tất cả bao nhiêu bức ảnh, ta lấy số ảnh bàn gỗ cộng với số ảnh ghế gỗ: 12 + 8 = 20 (bức ảnh).',
    hints: [
      'Bước 1: Khi đề bài hỏi "có tất cả bao nhiêu", chúng mình dùng phép tính gì con nhỉ?',
      'Bước 2: Con thực hiện phép cộng: 12 + 8 = ? (Hãy lấy 2 đơn vị cộng 8 đơn vị bằng 10, rồi cộng với 1 chục nhé).'
    ],
    errorCategory: 'Thực hiện phép tính chưa chính xác',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'toan-02',
    subject: 'toan',
    skill: 'Đo độ dài - Xăng-ti-mét (cm)',
    level: 'tien_buoc',
    phuKheContext: 'Dải hoa văn trang trí bằng giấy của xưởng mộc',
    questionText: 'Hai dải hoa văn bằng giấy có độ dài 24 cm và 16 cm. Tổng độ dài hai dải hoa văn là bao nhiêu?',
    illustrationType: 'ribbon_cm',
    illustrationData: { len1: 24, len2: 16, unit: 'cm' },
    options: ['38 cm', '40 cm', '40 dm', '42 cm'],
    correctAnswer: '40 cm',
    explanation: 'Tổng độ dài hai dải hoa văn là: 24 cm + 16 cm = 40 cm. (Chú ý giữ nguyên đơn vị đo cm, không nhầm sang dm).',
    hints: [
      'Bước 1: "Tổng độ dài" nghĩa là con làm phép cộng hai số đo với nhau.',
      'Bước 2: Con tính 24 + 16. Nhớ viết kèm đơn vị đo "cm" vào sau kết quả nhé!'
    ],
    errorCategory: 'Nhầm đơn vị đo',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'toan-03',
    subject: 'toan',
    skill: 'Phép trừ có nhớ/không nhớ trong phạm vi 100',
    level: 'bat_dau',
    phuKheContext: 'Thẻ hình trang trí mô hình nhà gỗ',
    questionText: 'Có 36 thẻ hình trang trí. Các bạn đã sử dụng 14 thẻ. Hỏi còn bao nhiêu thẻ?',
    illustrationType: 'wood_blocks',
    illustrationData: { total: 36, used: 14 },
    options: ['20 thẻ', '22 thẻ', '24 thẻ', '50 thẻ'],
    correctAnswer: '22 thẻ',
    explanation: 'Số thẻ còn lại là: 36 - 14 = 22 (thẻ).',
    hints: [
      'Bước 1: Đề bài cho biết có 36 thẻ và đã dùng 14 thẻ. Để tìm số thẻ còn lại, ta làm phép trừ.',
      'Bước 2: Con lấy 6 trừ 4 bằng 2; 3 trừ 1 bằng 2. Ghép lại được số nào nhỉ?'
    ],
    errorCategory: 'Thực hiện phép tính chưa chính xác',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'toan-04',
    subject: 'toan',
    skill: 'Nhận biết hình học cơ bản (Hình vuông, chữ nhật, tam giác)',
    level: 'bat_dau',
    phuKheContext: 'Khung tranh gỗ nghệ nhân Phù Khê chạm trổ',
    questionText: 'Bác thợ mộc cưa một khung tranh gỗ có 4 cạnh dài bằng nhau và có 4 góc vuông. Khung tranh gỗ đó có dạng hình gì?',
    illustrationType: 'dragon_pattern',
    options: ['Hình tam giác', 'Hình chữ nhật', 'Hình vuông', 'Hình tròn'],
    correctAnswer: 'Hình vuông',
    explanation: 'Hình có 4 cạnh bằng nhau và 4 góc vuông chính là đặc điểm của hình vuông trong môn Toán lớp 2.',
    hints: [
      'Bước 1: Hãy đếm số cạnh: có 4 cạnh và đặc biệt là 4 cạnh này dài bằng nhau.',
      'Bước 2: Hình chữ nhật thì có 2 cạnh dài và 2 cạnh ngắn, còn hình nào 4 cạnh đều bằng nhau con nhỉ?'
    ],
    errorCategory: 'Chưa nhận biết đúng hình',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'toan-05',
    subject: 'toan',
    skill: 'Đại lượng ki-lô-gam (kg)',
    level: 'tien_buoc',
    phuKheContext: 'Cân các thanh gỗ mít làm chân bàn',
    questionText: 'Khối gỗ của bạn An nặng 35 kg, khối gỗ của bạn Bình nặng 28 kg. Khối gỗ của bạn An nặng hơn khối gỗ của bạn Bình bao nhiêu ki-lô-gam?',
    illustrationType: 'wood_blocks',
    options: ['5 kg', '7 kg', '8 kg', '63 kg'],
    correctAnswer: '7 kg',
    explanation: 'Để tìm khối gỗ An nặng hơn Bình bao nhiêu ki-lô-gam, ta lấy: 35 - 28 = 7 (kg).',
    hints: [
      'Bước 1: Khi đề bài hỏi "nặng hơn bao nhiêu", chúng mình cần so sánh bằng phép tính trừ.',
      'Bước 2: Con thực hiện phép trừ có nhớ: 15 trừ 8 bằng 7; 3 bớt 1 bằng 2; 2 trừ 2 bằng 0.'
    ],
    errorCategory: 'Thực hiện phép tính chưa chính xác',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'toan-06',
    subject: 'toan',
    skill: 'Toán có lời văn - Phép trừ trong phạm vi 100',
    level: 'thu_thach',
    phuKheContext: 'Hộp đựng dụng cụ đục mộc Phù Khê',
    questionText: 'Trên giá treo có 48 chiếc đục nhỏ. Bác thợ mộc lấy đi 19 chiếc để mài sắc lại. Hỏi trên giá còn lại bao nhiêu chiếc đục?',
    illustrationType: 'artisan',
    options: ['29 chiếc', '31 chiếc', '39 chiếc', '67 chiếc'],
    correctAnswer: '29 chiếc',
    explanation: 'Số chiếc đục còn lại trên giá là: 48 - 19 = 29 (chiếc).',
    hints: [
      'Bước 1: Bác thợ mộc đã lấy bớt đi 19 chiếc, vậy số đục còn lại sẽ ít hơn lúc đầu.',
      'Bước 2: Con đặt tính phép trừ: 48 - 19. Chú ý phép trừ có nhớ ở hàng đơn vị (18 - 9 = 9).'
    ],
    errorCategory: 'Thực hiện phép tính chưa chính xác',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },

  // --- TIẾNG VIỆT (4 câu chuẩn ngữ liệu làng nghề Phù Khê) ---
  {
    id: 'tv-01',
    subject: 'tieng_viet',
    skill: 'Đọc hiểu đoạn văn ngắn',
    level: 'bat_dau',
    phuKheContext: 'Đoạn đọc mẫu về tình yêu làng nghề quê em',
    questionText: 'Đọc đoạn văn sau:\n"Quê em có nghề chạm khắc gỗ. Những người thợ khéo léo tạo nên các hoa văn đẹp. Để hoàn thành sản phẩm, người thợ cần chăm chỉ và kiên trì. Em yêu quý những người lao động và tự hào về quê hương mình."\n\nTheo bài đọc, để hoàn thành sản phẩm, người thợ mộc cần những đức tính nào?',
    illustrationType: 'reading_passage',
    options: ['Nhanh nhảu và vội vàng', 'Chăm chỉ và kiên trì', 'Vui vẻ và ồn ào', 'Thích chơi đùa'],
    correctAnswer: 'Chăm chỉ và kiên trì',
    explanation: 'Trong câu thứ ba của bài đọc có viết rõ: "Để hoàn thành sản phẩm, người thợ cần chăm chỉ và kiên trì."',
    hints: [
      'Bước 1: Con hãy đọc lại câu thứ ba trong đoạn văn trên nhé.',
      'Bước 2: Tìm từ ngữ đứng sau cụm từ "người thợ cần..."'
    ],
    errorCategory: 'Bỏ sót thông tin khi đọc',
    status: 'approved',
    source: 'Đặc tả chuẩn chuyên môn - Dương Thị Huệ',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'tv-02',
    subject: 'tieng_viet',
    skill: 'Mở rộng vốn từ chỉ hoạt động, nghề nghiệp',
    level: 'bat_dau',
    phuKheContext: 'Công việc hàng ngày của người thợ Phù Khê',
    questionText: 'Từ ngữ nào sau đây chỉ hoạt động lao động đặc trưng của người thợ mộc làng Phù Khê?',
    illustrationType: 'artisan',
    options: ['Chạm khắc hoa văn', 'Cày ruộng, cấy lúa', 'Kéo lưới bắt cá', 'Lái máy bay'],
    correctAnswer: 'Chạm khắc hoa văn',
    explanation: 'Người thợ mộc làng Phù Khê chuyên làm công việc chạm khắc gỗ, đục đẽo để tạo nên hoa văn tinh xảo.',
    hints: [
      'Bước 1: Làng nghề Phù Khê là làng nghề mộc truyền thống nổi tiếng về đồ gỗ mỹ nghệ.',
      'Bước 2: Hoạt động nào gắn liền với việc cầm đục, cầm búa tạo hình trên gỗ?'
    ],
    errorCategory: 'Chưa hiểu yêu cầu đề',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'tv-03',
    subject: 'tieng_viet',
    skill: 'Sắp xếp từ ngữ thành câu hoàn chỉnh',
    level: 'tien_buoc',
    phuKheContext: 'Lòng tự hào của học sinh tiểu học Phù Khê',
    questionText: 'Sắp xếp các từ sau thành một câu hoàn chỉnh thể hiện tình cảm của em: [Em] / [rất tự hào] / [về làng nghề Phù Khê] / [quê hương.]',
    illustrationType: 'reading_passage',
    options: [
      'Em rất tự hào về làng nghề Phù Khê quê hương.',
      'Quê hương em rất tự hào về làng nghề Phù Khê.',
      'Làng nghề Phù Khê em rất tự hào về quê hương.',
      'Rất tự hào em về làng nghề Phù Khê quê hương.'
    ],
    correctAnswer: 'Em rất tự hào về làng nghề Phù Khê quê hương.',
    explanation: 'Câu sắp xếp đúng ngữ pháp: Đầu câu có từ "Em" viết hoa, tiếp đến là cảm xúc "rất tự hào", địa điểm "về làng nghề Phù Khê quê hương" và kết thúc bằng dấu chấm.',
    hints: [
      'Bước 1: Chữ cái đầu câu thường viết hoa (từ "Em").',
      'Bước 2: Câu kể diễn đạt tự nhiên: Ai (Em) - Thế nào (rất tự hào về...) - Ở đâu.'
    ],
    errorCategory: 'Chưa hiểu yêu cầu đề',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'tv-04',
    subject: 'tieng_viet',
    skill: 'Nhận biết từ chỉ đặc điểm của sự vật',
    level: 'tien_buoc',
    phuKheContext: 'Mô tả nét hoa văn trên sản phẩm mộc',
    questionText: 'Trong câu: "Những hoa văn trên bàn gỗ trông thật tinh xảo và sống động.", các từ nào là từ chỉ đặc điểm?',
    illustrationType: 'dragon_pattern',
    options: ['hoa văn, bàn gỗ', 'tinh xảo, sống động', 'những, trên', 'trông, thật'],
    correctAnswer: 'tinh xảo, sống động',
    explanation: '"Tinh xảo" và "sống động" là những từ dùng để miêu tả nét đẹp, đặc điểm của hoa văn gỗ do nghệ nhân tạo nên.',
    hints: [
      'Bước 1: Từ chỉ đặc điểm là từ trả lời cho câu hỏi "thế nào?".',
      'Bước 2: Hoa văn gỗ trông như thế nào? (Chúng ta thấy chúng đẹp, khéo léo, sinh động...).'
    ],
    errorCategory: 'Chưa hiểu yêu cầu đề',
    status: 'approved',
    source: 'Tài liệu chuẩn - Dương Thị Huệ (TH Phù Khê 2)',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },

  // --- TỰ NHIÊN VÀ XÃ HỘI (2 câu chuẩn an toàn & giáo dục giá trị) ---
  {
    id: 'tnxh-01',
    subject: 'tn_xh',
    skill: 'Nhận biết các hành vi an toàn trong cuộc sống',
    level: 'bat_dau',
    phuKheContext: 'Quy tắc an toàn khi đi gần khu vực xưởng mộc Phù Khê',
    questionText: 'Khi đi học ngang qua hoặc được đi tham quan xưởng gỗ, hành động nào sau đây là ĐÚNG và AN TOÀN cho học sinh lớp 2?',
    illustrationType: 'safety_sign',
    options: [
      'Thò tay vào máy cưa đang quay để thử xem có sắc không',
      'Đeo khẩu trang, đi theo lối dẫn của cô giáo và không chạm vào đồ nghề sắc nhọn',
      'Cầm những chiếc đục sắc nhọn lên đùa nghịch cùng bạn',
      'Leo trèo lên các đống gỗ lớn xếp cao trong xưởng'
    ],
    correctAnswer: 'Đeo khẩu trang, đi theo lối dẫn của cô giáo và không chạm vào đồ nghề sắc nhọn',
    explanation: 'Xưởng gỗ có máy cưa, đục sắc nhọn nguy hiểm và nhiều bụi gỗ. Học sinh tiểu học cần đeo khẩu trang bảo vệ đường hô hấp và tuyệt đối không chạm vào máy móc công cụ.',
    hints: [
      'Bước 1: Hãy nghĩ xem trong xưởng mộc có những vật gì có thể làm con bị thương?',
      'Bước 2: Hành động thông minh nào giúp con vừa được ngắm nhìn sản phẩm vừa được an toàn tuyệt đối?'
    ],
    errorCategory: 'Chưa hiểu yêu cầu đề',
    status: 'approved',
    source: 'Chuyên đề Giáo dục An toàn Tiểu học - Dương Thị Huệ',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'tnxh-02',
    subject: 'tn_xh',
    skill: 'Tìm hiểu nghề nghiệp và giá trị của lao động',
    level: 'tien_buoc',
    phuKheContext: 'Lòng biết ơn người lao động làng nghề quê hương',
    questionText: 'Tại sao chúng mình cần yêu quý và tôn trọng những người thợ mộc làng Phù Khê quê em?',
    illustrationType: 'artisan',
    options: [
      'Vì họ đã vất vả, chăm chỉ tạo ra những đồ dùng và tác phẩm gỗ đẹp cho đời',
      'Vì họ có nhiều gỗ to để chơi trốn tìm',
      'Vì họ tạo ra nhiều bụi gỗ',
      'Vì nghề mộc không cần phải học tập hay rèn luyện'
    ],
    correctAnswer: 'Vì họ đã vất vả, chăm chỉ tạo ra những đồ dùng và tác phẩm gỗ đẹp cho đời',
    explanation: 'Mỗi sản phẩm bàn ghế, tượng gỗ là mồ hôi, công sức và sự kiên trì của các nghệ nhân. Chúng mình cần biết ơn và trân trọng giá trị lao động của họ.',
    hints: [
      'Bước 1: Hãy nhớ lại để làm được một chiếc bàn đẹp, người thợ phải mất bao nhiêu ngày công vất vả.',
      'Bước 2: Lòng biết ơn bắt nguồn từ sự thấu hiểu công lao của người lao động.'
    ],
    errorCategory: 'Chưa hiểu yêu cầu đề',
    status: 'approved',
    source: 'Giáo dục Đạo đức & Văn hóa Địa phương - TH Phù Khê 2',
    isVerified: true,
    reviewedBy: 'Dương Thị Huệ - Tổ trưởng chuyên môn Khối 2',
    createdAt: '2026-09-01T08:00:00Z'
  }
];

// 15 Anonymous Student Records (HS01 to HS15) for Experimental Evaluation
export const DEMO_EVALUATION_RECORDS: PrePostEvaluationRecord[] = [
  {
    id: 'eval-01',
    studentCode: 'HS01',
    group: 'Lớp 2A',
    preTestScore: 6.0,
    postTestScore: 9.0,
    tasksCompleted: 12,
    hintsUsed: 3,
    correctedAfterHintCount: 3,
    dominantErrorCategory: 'Thực hiện phép tính chưa chính xác',
    assessmentDate: '2026-10-15',
    notes: 'Tiến bộ rõ rệt về phép trừ có nhớ sau khi dùng gợi ý trực quan'
  },
  {
    id: 'eval-02',
    studentCode: 'HS02',
    group: 'Lớp 2A',
    preTestScore: 5.5,
    postTestScore: 8.5,
    tasksCompleted: 12,
    hintsUsed: 5,
    correctedAfterHintCount: 4,
    dominantErrorCategory: 'Nhầm đơn vị đo',
    assessmentDate: '2026-10-15',
    notes: 'Đã phân biệt được cm và dm nhờ hình ảnh thước mộc'
  },
  {
    id: 'eval-03',
    studentCode: 'HS03',
    group: 'Lớp 2A',
    preTestScore: 7.0,
    postTestScore: 9.5,
    tasksCompleted: 12,
    hintsUsed: 2,
    correctedAfterHintCount: 2,
    dominantErrorCategory: 'Bỏ sót thông tin khi đọc',
    assessmentDate: '2026-10-15',
    notes: 'Đọc hiểu tốt, yêu thích phần đọc về đức tính người thợ'
  },
  {
    id: 'eval-04',
    studentCode: 'HS04',
    group: 'Lớp 2A',
    preTestScore: 4.5,
    postTestScore: 8.0,
    tasksCompleted: 11,
    hintsUsed: 6,
    correctedAfterHintCount: 5,
    dominantErrorCategory: 'Chưa hiểu yêu cầu đề',
    assessmentDate: '2026-10-15',
    notes: 'Cần hướng dẫn kỹ bước 1, tự sửa đúng sau khi có gợi ý Mộc Mộc'
  },
  {
    id: 'eval-05',
    studentCode: 'HS05',
    group: 'Lớp 2A',
    preTestScore: 8.0,
    postTestScore: 10.0,
    tasksCompleted: 12,
    hintsUsed: 1,
    correctedAfterHintCount: 1,
    dominantErrorCategory: 'Thực hiện phép tính chưa chính xác',
    assessmentDate: '2026-10-15',
    notes: 'Hoàn thành xuất sắc cả 3 môn'
  },
  {
    id: 'eval-06',
    studentCode: 'HS06',
    group: 'Lớp 2A',
    preTestScore: 6.5,
    postTestScore: 9.0,
    tasksCompleted: 12,
    hintsUsed: 4,
    correctedAfterHintCount: 3,
    dominantErrorCategory: 'Chưa nhận biết đúng hình',
    assessmentDate: '2026-10-15',
    notes: 'Phân biệt tốt hình vuông và hình chữ nhật qua khung tranh mộc'
  },
  {
    id: 'eval-07',
    studentCode: 'HS07',
    group: 'Lớp 2B',
    preTestScore: 5.0,
    postTestScore: 8.5,
    tasksCompleted: 12,
    hintsUsed: 5,
    correctedAfterHintCount: 4,
    dominantErrorCategory: 'Thực hiện phép tính chưa chính xác',
    assessmentDate: '2026-10-16',
    notes: 'Tiến bộ ở phép cộng qua 10'
  },
  {
    id: 'eval-08',
    studentCode: 'HS08',
    group: 'Lớp 2B',
    preTestScore: 6.0,
    postTestScore: 9.0,
    tasksCompleted: 12,
    hintsUsed: 3,
    correctedAfterHintCount: 3,
    dominantErrorCategory: 'Chưa hiểu yêu cầu đề',
    assessmentDate: '2026-10-16',
    notes: 'Đã biết gạch chân từ khóa "tất cả", "còn lại"'
  },
  {
    id: 'eval-09',
    studentCode: 'HS09',
    group: 'Lớp 2B',
    preTestScore: 7.5,
    postTestScore: 10.0,
    tasksCompleted: 12,
    hintsUsed: 1,
    correctedAfterHintCount: 1,
    dominantErrorCategory: 'Nhầm đơn vị đo',
    assessmentDate: '2026-10-16',
    notes: 'Thao tác nhanh, tư duy trực quan sắc bén'
  },
  {
    id: 'eval-10',
    studentCode: 'HS10',
    group: 'Lớp 2B',
    preTestScore: 4.0,
    postTestScore: 7.5,
    tasksCompleted: 10,
    hintsUsed: 7,
    correctedAfterHintCount: 5,
    dominantErrorCategory: 'Thực hiện phép tính chưa chính xác',
    assessmentDate: '2026-10-16',
    notes: 'Mức độ ban đầu còn chậm, sau gợi ý Mộc Mộc đã tự tin hơn nhiều'
  },
  {
    id: 'eval-11',
    studentCode: 'HS11',
    group: 'Lớp 2B',
    preTestScore: 6.5,
    postTestScore: 8.5,
    tasksCompleted: 12,
    hintsUsed: 4,
    correctedAfterHintCount: 3,
    dominantErrorCategory: 'Bỏ sót thông tin khi đọc',
    assessmentDate: '2026-10-16',
    notes: 'Đọc diễn cảm tốt hơn, chú ý câu chữ'
  },
  {
    id: 'eval-12',
    studentCode: 'HS12',
    group: 'Lớp 2B',
    preTestScore: 7.0,
    postTestScore: 9.0,
    tasksCompleted: 12,
    hintsUsed: 2,
    correctedAfterHintCount: 2,
    dominantErrorCategory: 'Chưa hiểu yêu cầu đề',
    assessmentDate: '2026-10-16',
    notes: 'Hứng thú với kiến thức an toàn làng nghề'
  }
];

export const INITIAL_VOCABULARY_MATCHING = [
  {
    id: 'v1',
    term: 'Đục mộc',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=400&q=80',
    meaning: 'Dụng cụ bằng thép sắc có cán gỗ dùng để đục đẽo, chạm khắc gỗ.'
  },
  {
    id: 'v2',
    term: 'Bào gỗ',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    meaning: 'Dụng cụ làm nhẵn và phẳng bề mặt các thanh gỗ xù xì.'
  },
  {
    id: 'v3',
    term: 'Hoa văn rồng',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
    meaning: 'Họa tiết truyền thống uốn lượn uyển chuyển biểu tượng cho sự thịnh vượng.'
  },
  {
    id: 'v4',
    term: 'Thước mộc',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=400&q=80',
    meaning: 'Thước đo dùng để vạch dấu và đo độ dài từng xăng-ti-mét.'
  }
];

export const STEM_ACTIVITIES = [
  {
    id: 'stem-01',
    title: 'Mô hình Bàn Ghế Mini từ Bìa Giấy Tái Chế',
    objective: 'Ứng dụng hình chữ nhật, hình vuông đã học để cắt dán mô hình bàn ghế mộc quê em.',
    materials: ['Bìa các-tông sạch từ hộp sữa hoặc thùng bánh', 'Kéo thủ công đầu tù an toàn', 'Thước kẻ học sinh có vạch cm', 'Keo dán giấy'],
    steps: [
      'Bước 1: Dùng thước đo và vẽ 1 hình chữ nhật (dài 12 cm, rộng 8 cm) làm mặt bàn.',
      'Bước 2: Cắt 4 thanh giấy cuộn tròn cao 6 cm làm 4 chân bàn.',
      'Bước 3: Dán chân bàn vào 4 góc của mặt bàn bằng keo dán giấy.',
      'Bước 4: Vẽ trang trí hoa văn lá cúc đơn giản lên mặt bàn giống nghệ nhân Phù Khê!'
    ],
    ecoLesson: 'Tận dụng bìa giấy sạch giúp giảm rác thải, bảo vệ cây xanh và rừng gỗ tự nhiên.',
    safetyWarning: 'Luôn dùng kéo an toàn dành cho học sinh, không dùng dao nhọn của người lớn!'
  },
  {
    id: 'stem-02',
    title: 'Phân Loại Phế Phẩm Xưởng Mộc Thân Thiện',
    objective: 'Rèn luyện thói quen bảo vệ môi trường làng nghề sạch đẹp.',
    materials: ['Thùng phân loại xanh (phoi bào gỗ sạch làm phân bón hữu cơ)', 'Thùng vàng (bìa giấy tái chế)', 'Thùng đỏ (vật sắc nhọn phải nhờ người lớn gom)'],
    steps: [
      'Bước 1: Quan sát thẻ hình các loại vật liệu.',
      'Bước 2: Thảo luận cùng bạn bè để đưa vật liệu vào đúng thùng phân loại.',
      'Bước 3: Hiểu rằng mạt cưa và mùn cưa sạch có thể dùng trồng nấm hoặc ủ ấm cây trồng!'
    ],
    ecoLesson: 'Làng nghề xanh là làng nghề giữ gìn không khí trong lành cho các em nhỏ lớn khôn.',
    safetyWarning: 'Không tự ý thu gom phế phẩm sắc nhọn trong xưởng sản xuất!'
  }
];
