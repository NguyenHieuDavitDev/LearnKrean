export type VideoTopic = 'hangul' | 'vocab' | 'speaking' | 'listening' | 'topik' | 'culture' | 'other'

export type Video = {
  id: number
  title: string
  description: string
  topic: VideoTopic
  duration: string
  views: string
  viewsCount: number
  likes: string
  likesCount: number
  comments: string
  commentsCount: number
  publishedAt: string
  author: string
  avatar: string
  gradient: string
  tags: string[]
}

export const VIDEO_TOPICS: { id: VideoTopic | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'hangul', label: 'Hangul' },
  { id: 'vocab', label: 'Từ vựng' },
  { id: 'speaking', label: 'Giao tiếp' },
  { id: 'listening', label: 'Luyện nghe' },
  { id: 'topik', label: 'TOPIK' },
  { id: 'culture', label: 'Văn hóa' },
  { id: 'other', label: 'Khác' },
]

export const VIDEOS: Video[] = [
  {
    id: 1,
    title: 'Bạn sẽ làm được gì sau khóa học tiếng Hàn?',
    description:
      'Video giới thiệu lộ trình học tại Cô Huyền Tiếng Hàn: từ Hangul, giao tiếp hàng ngày đến chuẩn bị TOPIK. Xem để biết bạn có thể đạt được gì sau 3–6 tháng học đều.',
    topic: 'other',
    duration: '03:16',
    views: '1.147.934',
    viewsCount: 1147934,
    likes: '6.735',
    likesCount: 6735,
    comments: '150',
    commentsCount: 150,
    publishedAt: '1 năm trước',
    author: 'Cô Huyền',
    avatar: 'https://i.pravatar.cc/80?img=5',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tags: ['Giới thiệu', 'Lộ trình'],
  },
  {
    id: 2,
    title: 'Bảng chữ cái Hangul là gì? Hướng dẫn đọc viết',
    description:
      'Hướng dẫn chi tiết phụ âm, nguyên âm và cách ghép âm tiết Hangul. Phù hợp người mới bắt đầu — học xong có thể đọc được từ cơ bản ngay trong ngày.',
    topic: 'hangul',
    duration: '12:40',
    views: '892.104',
    viewsCount: 892104,
    likes: '12.340',
    likesCount: 12340,
    comments: '428',
    commentsCount: 428,
    publishedAt: '8 tháng trước',
    author: 'Minh Hàn',
    avatar: 'https://i.pravatar.cc/80?img=11',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tags: ['Hangul', 'Cơ bản'],
  },
  {
    id: 3,
    title: 'Các mẫu câu giao tiếp thông dụng nhất',
    description:
      'Tổng hợp mẫu câu chào hỏi, hỏi đường, gọi món và làm việc. Luyện shadowing theo từng đoạn để phản xạ nói nhanh hơn.',
    topic: 'speaking',
    duration: '08:22',
    views: '654.210',
    viewsCount: 654210,
    likes: '8.901',
    likesCount: 8901,
    comments: '312',
    commentsCount: 312,
    publishedAt: '5 tháng trước',
    author: 'Kim Soo',
    avatar: 'https://i.pravatar.cc/80?img=13',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    tags: ['Giao tiếp', 'Mẫu câu'],
  },
  {
    id: 4,
    title: 'Cách học từ vựng tiếng Hàn hiệu quả',
    description:
      'Phương pháp học từ theo chủ đề, dùng flashcard và đặt câu thực tế. Tránh học thuộc lòng thụ động.',
    topic: 'vocab',
    duration: '15:05',
    views: '421.880',
    viewsCount: 421880,
    likes: '5.432',
    likesCount: 5432,
    comments: '198',
    commentsCount: 198,
    publishedAt: '4 tháng trước',
    author: 'Thu Trang',
    avatar: 'https://i.pravatar.cc/80?img=12',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    tags: ['Từ vựng', 'Mẹo học'],
  },
  {
    id: 5,
    title: 'Luyện nghe tiếng Hàn qua K-Drama',
    description:
      'Cách chọn phân đoạn phim phù hợp trình độ, luyện nghe – nhắc lại và ghi chú cụm hay dùng.',
    topic: 'listening',
    duration: '10:18',
    views: '378.552',
    viewsCount: 378552,
    likes: '9.210',
    likesCount: 9210,
    comments: '267',
    commentsCount: 267,
    publishedAt: '3 tháng trước',
    author: 'Hàn Talk',
    avatar: 'https://i.pravatar.cc/80?img=25',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    tags: ['Luyện nghe', 'Drama'],
  },
  {
    id: 6,
    title: 'Chiến lược làm bài thi TOPIK I',
    description:
      'Phân tích cấu trúc đề TOPIK I, mẹo quản lý thời gian và cách luyện từng kỹ năng nghe – đọc.',
    topic: 'topik',
    duration: '22:31',
    views: '298.441',
    viewsCount: 298441,
    likes: '4.876',
    likesCount: 4876,
    comments: '145',
    commentsCount: 145,
    publishedAt: '2 tháng trước',
    author: 'Thu Trang',
    avatar: 'https://i.pravatar.cc/80?img=12',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    tags: ['TOPIK', 'Chiến lược'],
  },
  {
    id: 7,
    title: 'Phát âm tiếng Hàn: lỗi thường gặp',
    description:
      'Chữa các lỗi phát âm phổ biến của người Việt: batchim, nguyên âm khó và nối âm trong câu nói nhanh.',
    topic: 'speaking',
    duration: '09:47',
    views: '512.003',
    viewsCount: 512003,
    likes: '7.654',
    likesCount: 7654,
    comments: '221',
    commentsCount: 221,
    publishedAt: '6 tuần trước',
    author: 'Cô Huyền',
    avatar: 'https://i.pravatar.cc/80?img=5',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    tags: ['Phát âm', 'Giao tiếp'],
  },
  {
    id: 8,
    title: 'Văn hóa Hàn Quốc dành cho người đi làm',
    description:
      'Kính ngữ công sở, văn hóa họp và vài lưu ý khi làm việc với đồng nghiệp / đối tác Hàn Quốc.',
    topic: 'culture',
    duration: '14:02',
    views: '189.776',
    viewsCount: 189776,
    likes: '3.210',
    likesCount: 3210,
    comments: '98',
    commentsCount: 98,
    publishedAt: '1 tháng trước',
    author: 'Lan Anh',
    avatar: 'https://i.pravatar.cc/80?img=20',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    tags: ['Văn hóa', 'Công sở'],
  },
  {
    id: 9,
    title: 'Ôn 50 từ vựng nhà hàng trong 10 phút',
    description:
      'Từ vựng order món, hỏi độ cay, thanh toán — đủ dùng khi đi ăn Hàn lần đầu.',
    topic: 'vocab',
    duration: '10:05',
    views: '156.220',
    viewsCount: 156220,
    likes: '2.880',
    likesCount: 2880,
    comments: '74',
    commentsCount: 74,
    publishedAt: '3 tuần trước',
    author: 'Foodie KR',
    avatar: 'https://i.pravatar.cc/80?img=32',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    tags: ['Từ vựng', 'Ẩm thực'],
  },
  {
    id: 10,
    title: 'Luyện đề nghe TOPIK II — dạng khó',
    description:
      'Phân tích dạng câu nghe dài, cách note nhanh và mẹo chọn đáp án khi chưa nghe rõ hết.',
    topic: 'topik',
    duration: '18:44',
    views: '112.540',
    viewsCount: 112540,
    likes: '1.945',
    likesCount: 1945,
    comments: '52',
    commentsCount: 52,
    publishedAt: '2 tuần trước',
    author: 'Minh Hàn',
    avatar: 'https://i.pravatar.cc/80?img=11',
    gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    tags: ['TOPIK II', 'Nghe'],
  },
  {
    id: 11,
    title: 'Đọc Hangul nhanh với bài tập thực hành',
    description:
      'Bài tập ghép âm tiết, đọc biển hiệu và tên món ăn — củng cố Hangul sau phần lý thuyết.',
    topic: 'hangul',
    duration: '11:20',
    views: '203.110',
    viewsCount: 203110,
    likes: '4.120',
    likesCount: 4120,
    comments: '119',
    commentsCount: 119,
    publishedAt: '10 ngày trước',
    author: 'Minh Hàn',
    avatar: 'https://i.pravatar.cc/80?img=11',
    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    tags: ['Hangul', 'Thực hành'],
  },
  {
    id: 12,
    title: 'Nghe tin tức tiếng Hàn tốc độ chậm',
    description:
      'Bản tin rút gọn tốc độ chậm kèm từ khóa quan trọng — phù hợp trung cấp muốn lên cao cấp.',
    topic: 'listening',
    duration: '13:55',
    views: '87.430',
    viewsCount: 87430,
    likes: '1.560',
    likesCount: 1560,
    comments: '41',
    commentsCount: 41,
    publishedAt: '5 ngày trước',
    author: 'Ngọc Mai',
    avatar: 'https://i.pravatar.cc/80?img=28',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    tags: ['Luyện nghe', 'Tin tức'],
  },
]

export function getVideoById(id: number) {
  return VIDEOS.find((v) => v.id === id)
}

export function getVideosByTopic(topic: VideoTopic | 'all') {
  if (topic === 'all') return VIDEOS
  return VIDEOS.filter((v) => v.topic === topic)
}

export function getRelatedVideos(videoId: number, limit = 6) {
  const current = getVideoById(videoId)
  if (!current) return VIDEOS.slice(0, limit)
  const sameTopic = VIDEOS.filter((v) => v.id !== videoId && v.topic === current.topic)
  const others = VIDEOS.filter((v) => v.id !== videoId && v.topic !== current.topic)
  return [...sameTopic, ...others].slice(0, limit)
}
