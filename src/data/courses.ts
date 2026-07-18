export type ChuongKhoaHoc = {
  title: string
  lessons: string[]
}

export type KhoaHoc = {
  id: number
  title: string
  thumbTitle: string
  gradient: string
  price: string
  oldPrice?: string
  rating: number
  ratingCount: number
  students: string
  studentsCount: number
  lessons: number
  duration: string
  durationFull: string
  level: string
  isPro?: boolean
  teacher: {
    name: string
    avatar: string
    rating: number
    students: string
    soKhoaHoc: number
  }
  summary: string
  description: string[]
  learnings: string[]
  requirements: string[]
  chapters: ChuongKhoaHoc[]
  category: 'free' | 'pro'
}

export const DANH_SACH_KHOA_HOC: KhoaHoc[] = [
  {
    id: 1,
    title: 'Hangul cơ bản',
    thumbTitle: 'Hangeul\nABC',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    price: 'Miễn phí',
    rating: 4.8,
    ratingCount: 1240,
    students: '85.2K',
    studentsCount: 85200,
    lessons: 32,
    duration: '9h10p',
    durationFull: '09 giờ 10 phút',
    level: 'Trình độ cơ bản',
    category: 'free',
    teacher: {
      name: 'Minh Anh Kim',
      avatar: 'https://i.pravatar.cc/120?img=5',
      rating: 4.8,
      students: '85.2K',
      soKhoaHoc: 3,
    },
    summary:
      'Phần bảng chữ cái theo giáo trình «Tiếng Hàn Tổng Hợp Dành Cho Người Việt Nam» (Cho Hang Rok): nguyên âm, phụ âm, ghép âm, batchim — mỗi chữ bấm để nghe phát âm.',
    description: [
      'Khóa học bám sát phần mở đầu Sơ cấp 1 của giáo trình Cho Hang Rok – Lee Mi Hye: học đủ Hangul trước khi vào 15 bài chủ đề.',
      'Lộ trình chuẩn GT: nguyên âm cơ bản (모음) → nguyên âm kép (이중모음) → phụ âm (자음) → phụ âm đôi (쌍자음) → ghép âm & batchim (받침).',
      'Mỗi bảng chữ có nút phát âm (TTS tiếng Hàn). Kết hợp video, bài viết chi tiết và flashcard để ghi nhớ lâu.',
    ],
    learnings: [
      'Đọc – viết 10 nguyên âm cơ bản và 11 nguyên âm kép theo GT Tổng hợp',
      'Thuộc 14 phụ âm cơ bản và 5 phụ âm đôi (쌍자음)',
      'Phân biệt 평음 · 경음 · 격음',
      'Ghép âm tiết đúng quy tắc trên→dưới, trái→phải',
      'Đọc 7 âm batchim đại diện và quy tắc quy đổi',
      'Nghe phát âm từng chữ bằng nút bấm trên bảng chữ',
      'Đọc từ vựng sơ cấp và viết tên bằng Hangul',
      'Sẵn sàng học tiếp Sơ cấp 1 (15 bài đầu GT)',
    ],
    requirements: [
      'Không cần kiến thức tiếng Hàn trước đó',
      'Máy tính hoặc điện thoại có loa / tai nghe',
      'Giáo trình tham chiếu: Tiếng Hàn Tổng Hợp – Sơ cấp 1 (Cho Hang Rok)',
      'Luyện viết và nghe phát âm 15–20 phút mỗi ngày',
    ],
    chapters: [
      {
        title: 'Bài mở đầu — Làm quen Hangul',
        lessons: [
          'Hangul là gì? (theo GT Tổng hợp)',
          'Quy tắc viết chữ Hàn',
          'Cấu trúc âm tiết',
        ],
      },
      {
        title: 'Nguyên âm cơ bản (모음)',
        lessons: [
          'ㅏ ㅑ',
          'ㅓ ㅕ',
          'ㅗ ㅛ',
          'ㅜ ㅠ',
          'ㅡ ㅣ',
          'Bảng nguyên âm cơ bản — luyện phát âm',
          'Kiểm tra nguyên âm cơ bản',
        ],
      },
      {
        title: 'Nguyên âm kép (이중모음)',
        lessons: [
          'ㅐ ㅔ ㅒ ㅖ',
          'ㅘ ㅙ ㅚ',
          'ㅝ ㅞ ㅟ ㅢ',
          'Bảng nguyên âm kép — luyện phát âm',
          'Kiểm tra nguyên âm kép',
        ],
      },
      {
        title: 'Phụ âm cơ bản (자음)',
        lessons: [
          'ㄱ ㄴ ㄷ ㄹ',
          'ㅁ ㅂ ㅅ ㅇ',
          'ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ',
          'Bảng phụ âm cơ bản — luyện phát âm',
          'Kiểm tra phụ âm cơ bản',
        ],
      },
      {
        title: 'Phụ âm đôi (쌍자음)',
        lessons: [
          'ㄲ ㄸ ㅃ ㅆ ㅉ',
          'Phân biệt 평음 · 경음 · 격음',
          'Bảng phụ âm đôi — luyện phát âm',
          'Kiểm tra phụ âm đôi',
        ],
      },
      {
        title: 'Ghép âm & batchim (받침)',
        lessons: [
          'Ghép phụ âm + nguyên âm',
          'Bảy âm batchim cơ bản',
          'Cách đọc batchim theo GT Tổng hợp',
          'Đọc từ vựng sơ cấp',
          'Luyện phát âm tổng hợp',
        ],
      },
      {
        title: 'Ôn tập cuối khóa',
        lessons: [
          'Ôn toàn bộ bảng chữ cái',
          'Viết tên bằng Hangul',
          'Bài kiểm tra cuối khóa',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Tiếng Hàn sơ cấp 1',
    thumbTitle: 'Sơ cấp\n1',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    price: 'Miễn phí',
    rating: 4.7,
    ratingCount: 980,
    students: '62.1K',
    studentsCount: 62100,
    lessons: 48,
    duration: '18h30p',
    durationFull: '18 giờ 30 phút',
    level: 'Trình độ sơ cấp',
    category: 'free',
    teacher: {
      name: 'Thu Hà Park',
      avatar: 'https://i.pravatar.cc/120?img=9',
      rating: 4.7,
      students: '62.1K',
      soKhoaHoc: 4,
    },
    summary:
      'Khóa sơ cấp 1 giúp bạn giao tiếp các tình huống cơ bản: chào hỏi, tự giới thiệu, hỏi đường, mua sắm và nói về sở thích.',
    description: [
      'Sau khi biết Hangul, đây là bước tiếp theo để xây dựng nền tảng ngữ pháp và từ vựng sơ cấp.',
      'Khóa học đi theo giáo trình chuẩn (tương đương TOPIK I level 1-2), kết hợp hội thoại thực tế và bài tập sau mỗi chương.',
      'Bạn sẽ luyện nghe, nói, đọc, viết cân bằng qua 48 bài học có hướng dẫn chi tiết.',
    ],
    learnings: [
      'Tự giới thiệu bản thân bằng tiếng Hàn',
      'Dùng đuôi câu 아요/어요 thành thạo',
      'Hỏi và trả lời thông tin cá nhân',
      'Mua sắm và hỏi giá cơ bản',
      'Nói về thời gian, ngày tháng',
      'Miêu tả sở thích và thói quen',
      'Khoảng 500 từ vựng thông dụng',
      'Ngữ pháp sơ cấp cốt lõi',
    ],
    requirements: [
      'Đã biết đọc Hangul cơ bản',
      'Hoàn thành khóa Hangul cơ bản (khuyến nghị)',
      'Dành 30–45 phút học mỗi ngày',
      'Sổ tay ghi từ vựng',
    ],
    chapters: [
      { title: 'Chào hỏi & tự giới thiệu', lessons: ['안녕하세요', '저는 ...입니다', 'Quốc tịch & nghề nghiệp'] },
      { title: 'Đuôi câu lịch sự', lessons: ['아요/어요', '이에요/예요', 'Bài tập hội thoại'] },
      { title: 'Số đếm & thời gian', lessons: ['Số Hán – số thuần', 'Giờ và phút', 'Ngày trong tuần'] },
      { title: 'Mua sắm cơ bản', lessons: ['얼마예요?', 'Ở cửa hàng', 'Gọi món ăn'] },
      { title: 'Sở thích & thói quen', lessons: ['좋아하다', '동사 thường gặp', 'Ôn tập sơ cấp 1'] },
    ],
  },
  {
    id: 3,
    title: 'Giao tiếp hàng ngày',
    thumbTitle: 'Daily\nTalk',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    price: 'Miễn phí',
    rating: 4.9,
    ratingCount: 2105,
    students: '120K',
    studentsCount: 120000,
    lessons: 36,
    duration: '12h15p',
    durationFull: '12 giờ 15 phút',
    level: 'Trình độ sơ cấp',
    category: 'free',
    teacher: {
      name: 'Hàn Talk',
      avatar: 'https://i.pravatar.cc/120?img=32',
      rating: 4.9,
      students: '120K',
      soKhoaHoc: 5,
    },
    summary:
      'Tập trung luyện nói các mẫu câu giao tiếp thực tế: nhà hàng, giao thông, bệnh viện, công sở và cuộc sống thường ngày tại Hàn Quốc.',
    description: [
      'Khóa học dành cho người muốn nói tiếng Hàn tự nhiên, không chỉ học ngữ pháp trên giấy.',
      'Mỗi bài là một tình huống thật kèm audio bản ngữ, phần shadowing và hội thoại mẫu.',
      'Bạn sẽ tăng phản xạ nói và nghe trong vòng vài tuần nếu luyện đều.',
    ],
    learnings: [
      'Gọi món và thanh toán tại nhà hàng',
      'Hỏi đường và đi phương tiện công cộng',
      'Đặt lịch hẹn và gọi điện thoại',
      'Giao tiếp tại bệnh viện / hiệu thuốc',
      'Nói chuyện nhỏ với đồng nghiệp',
      'Xin lỗi, cảm ơn, từ chối lịch sự',
      'Phản xạ nghe – nói nhanh hơn',
      '50+ mẫu câu giao tiếp then chốt',
    ],
    requirements: [
      'Biết Hangul và ngữ pháp sơ cấp cơ bản',
      'Tai nghe để luyện nghe',
      'Thoải mái nói to khi luyện',
      'Luyện shadowing 20 phút/ngày',
    ],
    chapters: [
      { title: 'Nhà hàng & cà phê', lessons: ['Gọi món', 'Yêu cầu thêm', 'Thanh toán'] },
      { title: 'Đi lại trong thành phố', lessons: ['Hỏi đường', 'Xe buýt & tàu điện', 'Taxi'] },
      { title: 'Cuộc sống thường ngày', lessons: ['Siêu thị', 'Bưu điện', 'Ngân hàng'] },
      { title: 'Giao tiếp xã hội', lessons: ['Small talk', 'Mời & từ chối', 'Cảm ơn – xin lỗi'] },
    ],
  },
  {
    id: 4,
    title: 'Ngữ pháp TOPIK I',
    thumbTitle: 'TOPIK\nI',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    price: 'Miễn phí',
    rating: 4.6,
    ratingCount: 756,
    students: '41.8K',
    studentsCount: 41800,
    lessons: 52,
    duration: '22h40p',
    durationFull: '22 giờ 40 phút',
    level: 'Trình độ sơ cấp – trung cấp',
    category: 'free',
    teacher: {
      name: 'Quỳnh Chi',
      avatar: 'https://i.pravatar.cc/120?img=16',
      rating: 4.6,
      students: '41.8K',
      soKhoaHoc: 2,
    },
    summary:
      'Tổng hợp ngữ pháp trọng tâm cho kỳ thi TOPIK I. Có ví dụ, bài tập và mẹo ghi nhớ giúp bạn làm bài nhanh và chính xác hơn.',
    description: [
      'TOPIK I đòi hỏi nắm vững cấu trúc câu cơ bản và cách dùng đuôi câu trong ngữ cảnh.',
      'Khóa học hệ thống hóa ngữ pháp theo chủ đề, kèm bài luyện đọc hiểu và nghe tương tự đề thi.',
      'Phù hợp người đang ôn TOPIK I hoặc muốn củng cố nền tảng trước khi lên TOPIK II.',
    ],
    learnings: [
      'Hệ thống ngữ pháp TOPIK I đầy đủ',
      'Phân biệt các đuôi câu dễ nhầm',
      'Làm bài đọc hiểu hiệu quả',
      'Chiến lược làm bài nghe',
      'Mẹo ghi nhớ cấu trúc nhanh',
      'Luyện đề mẫu theo từng chủ đề',
      'Tránh lỗi sai phổ biến',
      'Tự tin vào phòng thi TOPIK I',
    ],
    requirements: [
      'Đã học sơ cấp 1 hoặc tương đương',
      'Có mục tiêu thi TOPIK I',
      'Làm bài tập sau mỗi chương',
      'Ôn lại từ vựng thường xuyên',
    ],
    chapters: [
      { title: 'Ngữ pháp nền tảng', lessons: ['조사', '시제', '부정문'] },
      { title: 'Đuôi câu & nối câu', lessons: ['고 / 아서 / 지만', '으면 / 니까', '려고 하다'] },
      { title: 'Luyện đề nghe', lessons: ['Dạng đề nghe', 'Mẹo chọn đáp án', 'Đề thử 1'] },
      { title: 'Luyện đề đọc', lessons: ['Dạng đề đọc', 'Chiến lược skim/scan', 'Đề thử 2'] },
    ],
  },
  {
    id: 5,
    title: 'TOPIK Pro',
    thumbTitle: 'TOPIK\nPRO',
    gradient: 'linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%)',
    price: '1.299.000đ',
    oldPrice: '2.500.000đ',
    rating: 4.9,
    ratingCount: 432,
    students: '12.4K',
    studentsCount: 12400,
    lessons: 120,
    duration: '80h',
    durationFull: '80 giờ',
    level: 'Trình độ trung – cao cấp',
    isPro: true,
    category: 'pro',
    teacher: {
      name: 'Sơn Đặng KR',
      avatar: 'https://i.pravatar.cc/120?img=11',
      rating: 4.9,
      students: '12.4K',
      soKhoaHoc: 6,
    },
    summary:
      'Lộ trình Pro chinh phục TOPIK II với giáo trình chuyên sâu, chữa bài viết và chiến lược đạt điểm cao từng kỹ năng.',
    description: [
      'TOPIK Pro được thiết kế cho người muốn đạt TOPIK 4–6 trong thời gian ngắn.',
      'Bao gồm ngân hàng đề, chữa bài viết 1-1 định kỳ, và lộ trình học theo tuần rõ ràng.',
      'Học viên Pro được vào nhóm hỗ trợ và cập nhật đề mới liên tục.',
    ],
    learnings: [
      'Chiến lược đạt TOPIK 4–6',
      'Ngữ pháp trung – cao cấp',
      'Kỹ năng viết luận TOPIK',
      'Đọc hiểu văn bản dài',
      'Nghe tốc độ đề thật',
      'Quản lý thời gian phòng thi',
      'Chữa lỗi cá nhân hóa',
      'Luyện đề full giống thi thật',
    ],
    requirements: [
      'Đã đạt hoặc gần TOPIK I',
      'Cam kết học 1–1.5 giờ/ngày',
      'Có tài khoản để nộp bài viết',
      'Sẵn sàng nhận feedback',
    ],
    chapters: [
      { title: 'Định hướng TOPIK II', lessons: ['Cấu trúc đề', 'Lộ trình 12 tuần', 'Đánh giá đầu vào'] },
      { title: 'Ngữ pháp nâng cao', lessons: ['Cấu trúc phức', 'Liên kết đoạn văn', 'Ôn tập'] },
      { title: 'Viết luận', lessons: ['Dàn ý', 'Mẫu câu ăn điểm', 'Chữa bài mẫu'] },
      { title: 'Đề thi thử', lessons: ['Full test 1', 'Full test 2', 'Phân tích điểm yếu'] },
    ],
  },
  {
    id: 6,
    title: 'Tiếng Hàn thương mại',
    thumbTitle: 'Business\nKorean',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    price: '1.599.000đ',
    oldPrice: '2.999.000đ',
    rating: 4.8,
    ratingCount: 218,
    students: '5.6K',
    studentsCount: 5600,
    lessons: 90,
    duration: '55h',
    durationFull: '55 giờ',
    level: 'Trình độ trung cấp',
    isPro: true,
    category: 'pro',
    teacher: {
      name: 'Lan Anh',
      avatar: 'https://i.pravatar.cc/120?img=20',
      rating: 4.8,
      students: '5.6K',
      soKhoaHoc: 2,
    },
    summary:
      'Tiếng Hàn dành cho môi trường công sở: email, họp, thuyết trình, đàm phán và văn hóa doanh nghiệp Hàn Quốc.',
    description: [
      'Nếu bạn làm việc với đối tác hoặc công ty Hàn, khóa này giúp giao tiếp chuyên nghiệp hơn.',
      'Học kính ngữ công sở, mẫu email, cách báo cáo và xử lý tình huống họp.',
      'Có case study thực tế từ doanh nghiệp Việt – Hàn.',
    ],
    learnings: [
      'Viết email công việc chuẩn',
      'Thuyết trình và báo cáo',
      'Họp và lấy ý kiến',
      'Đàm phán lịch sự',
      'Kính ngữ trong công sở',
      'Văn hóa doanh nghiệp Hàn',
      'Xưng hô đúng cấp bậc',
      'Xử lý tình huống khó',
    ],
    requirements: [
      'Tiếng Hàn tối thiểu sơ cấp 2',
      'Có nhu cầu dùng tiếng Hàn đi làm',
      'Máy tính để luyện viết email',
      'Tham gia bài tập tình huống',
    ],
    chapters: [
      { title: 'Kính ngữ công sở', lessons: ['Xưng hô', 'Câu lịch sự', 'Lỗi cần tránh'] },
      { title: 'Email & tài liệu', lessons: ['Cấu trúc email', 'Mẫu thông báo', 'Báo cáo ngắn'] },
      { title: 'Họp & thuyết trình', lessons: ['Mở đầu họp', 'Trình bày ý kiến', 'Kết luận'] },
      { title: 'Đàm phán', lessons: ['Đề xuất', 'Thương lượng', 'Chốt thỏa thuận'] },
    ],
  },
  {
    id: 7,
    title: 'Luyện nói với bản ngữ',
    thumbTitle: 'Speaking\nPro',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    price: '999.000đ',
    oldPrice: '1.799.000đ',
    rating: 5.0,
    ratingCount: 156,
    students: '3.2K',
    studentsCount: 3200,
    lessons: 60,
    duration: '40h',
    durationFull: '40 giờ',
    level: 'Mọi trình độ',
    isPro: true,
    category: 'pro',
    teacher: {
      name: 'Kim Soo',
      avatar: 'https://i.pravatar.cc/120?img=13',
      rating: 5.0,
      students: '3.2K',
      soKhoaHoc: 1,
    },
    summary:
      'Luyện nói trực tiếp với giáo viên bản ngữ qua lộ trình Speaking Pro. Tập trung sửa phát âm, ngữ điệu và phản xạ hội thoại.',
    description: [
      'Mỗi tuần có buổi live luyện nói theo chủ đề và nhận feedback cá nhân.',
      'Giáo viên bản ngữ giúp bạn nghe – bắt chước – sửa lỗi ngay lập tức.',
      'Phù hợp ai muốn nói tự nhiên như giao tiếp thật, không chỉ học thuộc.',
    ],
    learnings: [
      'Phát âm và ngữ điệu chuẩn hơn',
      'Phản xạ trả lời nhanh',
      'Tự tin nói trước người bản ngữ',
      'Sửa lỗi nói thường gặp',
      'Mở rộng vốn câu nói thực tế',
      'Luyện theo chủ đề yêu thích',
      'Ghi âm và theo dõi tiến bộ',
      'Xây dựng thói quen nói mỗi ngày',
    ],
    requirements: [
      'Biết Hangul và giao tiếp cơ bản',
      'Microphone và camera ổn định',
      'Tham gia đúng lịch live',
      'Chuẩn bị trước chủ đề buổi học',
    ],
    chapters: [
      { title: 'Phát âm nền', lessons: ['Nguyên âm khó', 'Phụ âm đôi', 'Ngữ điệu câu'] },
      { title: 'Hội thoại thực tế', lessons: ['Giới thiệu bản thân', 'Kể chuyện', 'Tranh luận nhẹ'] },
      { title: 'Live speaking', lessons: ['Buổi 1-1', 'Feedback', 'Bài tập về nhà'] },
    ],
  },
  {
    id: 8,
    title: 'Biên phiên dịch Hàn',
    thumbTitle: 'Translate\nPro',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    price: 'Liên hệ',
    rating: 4.7,
    ratingCount: 89,
    students: '1.1K',
    studentsCount: 1100,
    lessons: 100,
    duration: '70h',
    durationFull: '70 giờ',
    level: 'Trình độ cao cấp',
    isPro: true,
    category: 'pro',
    teacher: {
      name: 'Ngọc Mai',
      avatar: 'https://i.pravatar.cc/120?img=28',
      rating: 4.7,
      students: '1.1K',
      soKhoaHoc: 2,
    },
    summary:
      'Khóa chuyên sâu về biên dịch và phiên dịch Việt – Hàn: kỹ thuật dịch, thuật ngữ chuyên ngành và thực hành dự án thật.',
    description: [
      'Dành cho người có nền tảng tiếng Hàn tốt muốn theo hướng dịch thuật chuyên nghiệp.',
      'Thực hành dịch văn bản, phụ đề, và phiên dịch nối tiếp trong workshop.',
      'Học viên xuất sắc được giới thiệu việc dịch freelance.',
    ],
    learnings: [
      'Nguyên lý biên – phiên dịch',
      'Dịch văn bản hành chính',
      'Dịch phụ đề & truyền thông',
      'Phiên dịch nối tiếp cơ bản',
      'Thuật ngữ chuyên ngành',
      'Công cụ hỗ trợ dịch thuật',
      'Đạo đức nghề dịch',
      'Xây portfolio dịch thuật',
    ],
    requirements: [
      'Tiếng Hàn tối thiểu TOPIK 4',
      'Tiếng Việt tốt',
      'Máy tính để thực hành',
      'Cam kết hoàn thành dự án cuối khóa',
    ],
    chapters: [
      { title: 'Nền tảng dịch thuật', lessons: ['Lý thuyết dịch', 'Các lỗi thường gặp', 'Công cụ CAT'] },
      { title: 'Biên dịch thực hành', lessons: ['Văn bản hành chính', 'Marketing', 'Phụ đề'] },
      { title: 'Phiên dịch', lessons: ['Ghi chú', 'Nối tiếp', 'Workshop'] },
      { title: 'Dự án tốt nghiệp', lessons: ['Chọn đề tài', 'Nộp bài', 'Nhận xét'] },
    ],
  },
]

export function getKhoaHocById(id: number): KhoaHoc | undefined {
  return DANH_SACH_KHOA_HOC.find((c) => c.id === id)
}

export function getKhoaHocLienQuan(khoaHocId: number, limit = 3): KhoaHoc[] {
  const current = getKhoaHocById(khoaHocId)
  if (!current) return DANH_SACH_KHOA_HOC.slice(0, limit)
  return DANH_SACH_KHOA_HOC.filter((c) => c.id !== khoaHocId && c.category === current.category).slice(0, limit)
}

export const KHOA_HOC_MIEN_PHI = DANH_SACH_KHOA_HOC.filter((c) => c.category === 'free')
export const KHOA_HOC_PRO = DANH_SACH_KHOA_HOC.filter((c) => c.category === 'pro')
