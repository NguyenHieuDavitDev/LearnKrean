export type StoryMedia = {
  type: 'image' | 'video'
  url: string
}

export type StorySlide = {
  id: string
  bg: string
  korean?: string
  meaning?: string
  tip?: string
  media?: StoryMedia
}

export type StoryUser = {
  id: number
  name: string
  avatar: string
  verified: boolean
  time: string
  unread: boolean
  label: string
  previewBg: string
  cta: string
  likes: number
  comments: number
  shares: number
  slides: StorySlide[]
}

export const STORIES: StoryUser[] = [
  {
    id: 1,
    name: 'Minh Anh Kim',
    avatar: 'https://i.pravatar.cc/80?img=5',
    verified: true,
    time: '9 giờ trước',
    unread: true,
    label: '안녕하세요',
    previewBg: 'linear-gradient(160deg, #ff6b6b 0%, #ee5a24 50%, #c44569 100%)',
    cta: 'HỌC THỬ MIỄN PHÍ',
    likes: 128,
    comments: 24,
    shares: 8,
    slides: [
      {
        id: '1-1',
        bg: 'linear-gradient(160deg, #ff6b6b 0%, #ee5a24 55%, #c44569 100%)',
        korean: '안녕하세요!',
        meaning: 'Xin chào! (lịch sự)',
        tip: 'Dùng khi gặp người lớn tuổi hoặc lần đầu gặp mặt.',
      },
      {
        id: '1-2',
        bg: 'linear-gradient(160deg, #f857a6 0%, #ff5858 100%)',
        korean: '반갑습니다',
        meaning: 'Rất vui được gặp bạn',
        tip: 'Thường đi kèm với cúi chào nhẹ.',
      },
    ],
  },
  {
    id: 2,
    name: 'Thu Hà Park',
    avatar: 'https://i.pravatar.cc/80?img=9',
    verified: true,
    time: '2 thẻ mới',
    unread: true,
    label: '한글 ABC',
    previewBg: 'linear-gradient(160deg, #a18cd1 0%, #fbc2eb 100%)',
    cta: 'XEM BẢNG CHỮ CÁI',
    likes: 256,
    comments: 41,
    shares: 19,
    slides: [
      {
        id: '2-1',
        bg: 'linear-gradient(160deg, #a18cd1 0%, #fbc2eb 100%)',
        korean: 'ㄱ ㄴ ㄷ ㄹ',
        meaning: 'Phụ âm cơ bản Hangul',
        tip: 'Học 14 phụ âm trước, rồi đến nguyên âm.',
      },
      {
        id: '2-2',
        bg: 'linear-gradient(160deg, #667eea 0%, #764ba2 100%)',
        korean: '아 어 오 우',
        meaning: 'Nguyên âm cơ bản',
        tip: 'Miệng mở rộng với 아, tròn với 오.',
      },
    ],
  },
  {
    id: 3,
    name: 'Quỳnh Chi',
    avatar: 'https://i.pravatar.cc/80?img=16',
    verified: true,
    time: '5 giờ trước',
    unread: true,
    label: 'TOPIK tip',
    previewBg: 'linear-gradient(160deg, #4facfe 0%, #00f2fe 100%)',
    cta: 'LUYỆN ĐỀ TOPIK',
    likes: 89,
    comments: 12,
    shares: 5,
    slides: [
      {
        id: '3-1',
        bg: 'linear-gradient(160deg, #4facfe 0%, #00f2fe 100%)',
        korean: 'TOPIK I Tip',
        meaning: 'Đọc kỹ đề trước khi làm bài nghe',
        tip: 'Dành 30 giây xem trước đáp án mỗi câu.',
      },
    ],
  },
  {
    id: 4,
    name: 'Hàn Talk',
    avatar: 'https://i.pravatar.cc/80?img=32',
    verified: true,
    time: '1 ngày trước',
    unread: false,
    label: 'Giao tiếp',
    previewBg: 'linear-gradient(160deg, #43e97b 0%, #38f9d7 100%)',
    cta: 'LUYỆN GIAO TIẾP',
    likes: 412,
    comments: 67,
    shares: 33,
    slides: [
      {
        id: '4-1',
        bg: 'linear-gradient(160deg, #43e97b 0%, #38f9d7 100%)',
        korean: '얼마예요?',
        meaning: 'Cái này bao nhiêu tiền?',
        tip: 'Câu hỏi mua sắm siêu thông dụng.',
      },
      {
        id: '4-2',
        bg: 'linear-gradient(160deg, #11998e 0%, #38ef7d 100%)',
        korean: '맛있어요!',
        meaning: 'Ngon quá!',
        tip: 'Nói khi ăn món ngon ở nhà hàng Hàn.',
      },
    ],
  },
  {
    id: 5,
    name: 'Sơn Đặng KR',
    avatar: 'https://i.pravatar.cc/80?img=11',
    verified: true,
    time: '3 giờ trước',
    unread: true,
    label: 'Ngữ pháp',
    previewBg: 'linear-gradient(160deg, #fa709a 0%, #fee140 100%)',
    cta: 'XEM NGỮ PHÁP',
    likes: 175,
    comments: 29,
    shares: 11,
    slides: [
      {
        id: '5-1',
        bg: 'linear-gradient(160deg, #fa709a 0%, #fee140 100%)',
        korean: '~아요 / ~어요',
        meaning: 'Đuôi câu lịch sự hiện tại',
        tip: 'Nguyên âm cuối quyết định 아요 hay 어요.',
      },
    ],
  },
  {
    id: 6,
    name: 'Lan Anh',
    avatar: 'https://i.pravatar.cc/80?img=20',
    verified: false,
    time: '12 giờ trước',
    unread: true,
    label: 'Văn hóa',
    previewBg: 'linear-gradient(160deg, #ffecd2 0%, #fcb69f 100%)',
    cta: 'ĐỌC THÊM',
    likes: 64,
    comments: 9,
    shares: 3,
    slides: [
      {
        id: '6-1',
        bg: 'linear-gradient(160deg, #ffecd2 0%, #fcb69f 100%)',
        korean: '존댓말',
        meaning: 'Lối nói kính ngữ',
        tip: 'Luôn dùng kính ngữ với sếp và người lớn tuổi.',
      },
    ],
  },
]
