import {
  faBookOpen,
  faBug,
  faCircleQuestion,
  faClipboardList,
  faComments,
  faGamepad,
  faGraduationCap,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type QaCategory =
  | 'all'
  | 'theory'
  | 'practice'
  | 'exercise'
  | 'flashcard'
  | 'offtopic'
  | 'bug'
  | 'showcase'

export type QaStatus = 'pending' | 'resolved'

export type QaQuestion = {
  id: number
  title: string
  author: string
  avatar: string
  publishedAt: string
  category: Exclude<QaCategory, 'all'>
  courseTag: string
  status: QaStatus
  views: number
  replies: number
  participants: string[]
}

export type QaComment = {
  id: number
  author: string
  avatar: string
  verified?: boolean
  time: string
  content: string
  likes: number
  replies?: QaComment[]
}

export type QaQuestionDetail = QaQuestion & {
  content: string
  lesson: string
  timeAgo: string
  attachments?: string[]
  comments: QaComment[]
}

export const QA_CATEGORIES: {
  id: QaCategory
  label: string
  icon: IconDefinition
}[] = [
  { id: 'all', label: 'Tất cả', icon: faComments },
  { id: 'theory', label: 'Bài học lý thuyết', icon: faBookOpen },
  { id: 'practice', label: 'Bài luyện nói', icon: faGraduationCap },
  { id: 'exercise', label: 'Bài tập ngữ pháp', icon: faClipboardList },
  { id: 'flashcard', label: 'Flashcard từ vựng', icon: faLightbulb },
  { id: 'offtopic', label: 'Chủ đề khác', icon: faCircleQuestion },
  { id: 'bug', label: 'Báo lỗi hệ thống', icon: faBug },
  { id: 'showcase', label: 'Chia sẻ kết quả học', icon: faGamepad },
]

export const QA_FILTERS = [
  { id: 'all', label: 'Tất cả câu hỏi' },
  { id: 'pending', label: 'Chờ trả lời' },
  { id: 'resolved', label: 'Đã giải quyết' },
] as const

export const QA_QUESTIONS: QaQuestion[] = [
  {
    id: 1,
    title: 'Khi nào dùng 아요 và khi nào dùng 어요?',
    author: 'Minh Anh',
    avatar: 'https://i.pravatar.cc/40?img=5',
    publishedAt: 'đăng 2 giờ trước',
    category: 'theory',
    courseTag: 'Hangul cơ bản',
    status: 'pending',
    views: 48,
    replies: 0,
    participants: ['https://i.pravatar.cc/40?img=5'],
  },
  {
    id: 2,
    title: 'Cách nhớ batchim (받침) nhanh hơn cho người mới?',
    author: 'Thu Trang',
    avatar: 'https://i.pravatar.cc/40?img=12',
    publishedAt: 'đăng 5 giờ trước',
    category: 'theory',
    courseTag: 'Hangul cơ bản',
    status: 'resolved',
    views: 312,
    replies: 6,
    participants: [
      'https://i.pravatar.cc/40?img=12',
      'https://i.pravatar.cc/40?img=11',
      'https://i.pravatar.cc/40?img=5',
    ],
  },
  {
    id: 3,
    title: 'Trong hội thoại gọi món, nói “맵지 않게 해주세요” có tự nhiên không?',
    author: 'Kim Soo',
    avatar: 'https://i.pravatar.cc/40?img=13',
    publishedAt: 'đăng 1 ngày trước',
    category: 'practice',
    courseTag: 'Giao tiếp hàng ngày',
    status: 'resolved',
    views: 189,
    replies: 4,
    participants: ['https://i.pravatar.cc/40?img=13', 'https://i.pravatar.cc/40?img=20'],
  },
  {
    id: 4,
    title: 'Bài tập chia đuôi câu: 가다 / 먹다 / 하다 mình làm đúng chưa?',
    author: 'Lan Anh',
    avatar: 'https://i.pravatar.cc/40?img=20',
    publishedAt: 'đăng 2 ngày trước',
    category: 'exercise',
    courseTag: 'Tiếng Hàn sơ cấp 1',
    status: 'pending',
    views: 76,
    replies: 1,
    participants: ['https://i.pravatar.cc/40?img=20', 'https://i.pravatar.cc/40?img=11'],
  },
  {
    id: 5,
    title: 'Flashcard từ vựng tuần 3 bị trùng nghĩa — nên gom thế nào?',
    author: 'Ngọc Mai',
    avatar: 'https://i.pravatar.cc/40?img=28',
    publishedAt: 'đăng 3 ngày trước',
    category: 'flashcard',
    courseTag: 'TOPIK nâng cao',
    status: 'resolved',
    views: 421,
    replies: 8,
    participants: [
      'https://i.pravatar.cc/40?img=28',
      'https://i.pravatar.cc/40?img=12',
      'https://i.pravatar.cc/40?img=5',
    ],
  },
  {
    id: 6,
    title: 'Nên học TOPIK I trước hay nhảy thẳng TOPIK II nếu đã giao tiếp được?',
    author: 'Hàn Talk',
    avatar: 'https://i.pravatar.cc/40?img=25',
    publishedAt: 'đăng 4 ngày trước',
    category: 'offtopic',
    courseTag: 'TOPIK nâng cao',
    status: 'resolved',
    views: 890,
    replies: 15,
    participants: [
      'https://i.pravatar.cc/40?img=25',
      'https://i.pravatar.cc/40?img=11',
      'https://i.pravatar.cc/40?img=12',
    ],
  },
  {
    id: 7,
    title: 'Video bài Luyện nói bị đứng ở phút 08:12 trên iPhone',
    author: 'Đức Huy',
    avatar: 'https://i.pravatar.cc/40?img=15',
    publishedAt: 'đăng 5 ngày trước',
    category: 'bug',
    courseTag: 'Luyện nói với bản ngữ',
    status: 'pending',
    views: 54,
    replies: 2,
    participants: ['https://i.pravatar.cc/40?img=15', 'https://i.pravatar.cc/40?img=5'],
  },
  {
    id: 8,
    title: 'Mình đạt TOPIK 4 sau 5 tháng — chia sẻ lộ trình học mỗi ngày',
    author: 'Foodie KR',
    avatar: 'https://i.pravatar.cc/40?img=32',
    publishedAt: 'đăng 1 tuần trước',
    category: 'showcase',
    courseTag: 'TOPIK nâng cao',
    status: 'resolved',
    views: 1520,
    replies: 23,
    participants: [
      'https://i.pravatar.cc/40?img=32',
      'https://i.pravatar.cc/40?img=12',
      'https://i.pravatar.cc/40?img=20',
    ],
  },
  {
    id: 9,
    title: 'Khác nhau giữa 고 싶다 và 고 싶어 하다?',
    author: 'Minh Hàn',
    avatar: 'https://i.pravatar.cc/40?img=11',
    publishedAt: 'đăng 1 tuần trước',
    category: 'theory',
    courseTag: 'Ngữ pháp TOPIK I',
    status: 'resolved',
    views: 667,
    replies: 9,
    participants: ['https://i.pravatar.cc/40?img=11', 'https://i.pravatar.cc/40?img=13'],
  },
  {
    id: 10,
    title: 'Trong email công sở, mở đầu bằng 안녕하세요 có quá thân mật không?',
    author: 'Lan Anh',
    avatar: 'https://i.pravatar.cc/40?img=20',
    publishedAt: 'đăng 2 tuần trước',
    category: 'practice',
    courseTag: 'Tiếng Hàn thương mại',
    status: 'pending',
    views: 203,
    replies: 3,
    participants: [
      'https://i.pravatar.cc/40?img=20',
      'https://i.pravatar.cc/40?img=28',
      'https://i.pravatar.cc/40?img=5',
    ],
  },
  {
    id: 11,
    title: 'Bài tập viết luận TOPIK: dàn ý mình có logic không?',
    author: 'Thu Trang',
    avatar: 'https://i.pravatar.cc/40?img=12',
    publishedAt: 'đăng 2 tuần trước',
    category: 'exercise',
    courseTag: 'TOPIK nâng cao',
    status: 'resolved',
    views: 445,
    replies: 7,
    participants: ['https://i.pravatar.cc/40?img=12', 'https://i.pravatar.cc/40?img=11'],
  },
  {
    id: 12,
    title: 'Không xem được phụ đề trong video luyện nghe K-Drama',
    author: 'Ngọc Mai',
    avatar: 'https://i.pravatar.cc/40?img=28',
    publishedAt: 'đăng 3 tuần trước',
    category: 'bug',
    courseTag: 'Giao tiếp hàng ngày',
    status: 'resolved',
    views: 118,
    replies: 5,
    participants: ['https://i.pravatar.cc/40?img=28', 'https://i.pravatar.cc/40?img=15'],
  },
]

export function getCategoryLabel(id: QaCategory) {
  return QA_CATEGORIES.find((c) => c.id === id)?.label ?? id
}

const QA_DETAIL_EXTRA: Record<
  number,
  Pick<QaQuestionDetail, 'content' | 'lesson' | 'timeAgo' | 'attachments' | 'comments'>
> = {
  1: {
    content:
      'Dạ em đang học phần đuôi câu lịch sự. Em hay bị lẫn 아요 và 어요 — có mẹo nào để nhớ nhanh khi chia động từ không ạ? Em hay viết nhầm 먹아요 thành 먹어요.',
    lesson: '03.12 Đuôi câu 아요 / 어요',
    timeAgo: '2 giờ trước',
    comments: [],
  },
  2: {
    content:
      'Em học Hangul được 2 tuần nhưng batchim (받침) vẫn hay đọc sai, đặc biệt ㄱ/ㅋ/ㄲ. Mọi người có tip nhớ phát âm khi đứng cuối âm tiết không ạ?',
    lesson: '02.08 Phụ âm cuối (받침)',
    timeAgo: '5 giờ trước',
    comments: [
      {
        id: 21,
        author: 'Cô Huyền',
        avatar: 'https://i.pravatar.cc/40?img=47',
        verified: true,
        time: '4 giờ trước',
        content:
          'Em thử ghép theo nhóm: ㄱ đọc gần “k” nhẹ, ㅋ mạnh hơn, ㄲ tắc mạnh. Luyện đọc bảng âm cuối 10 phút/ngày sẽ quen nhanh.',
        likes: 12,
        replies: [
          {
            id: 211,
            author: 'Thu Trang',
            avatar: 'https://i.pravatar.cc/40?img=12',
            time: '3 giờ trước',
            content: 'Cảm ơn cô ạ! Em sẽ luyện thêm phần này.',
            likes: 2,
          },
        ],
      },
      {
        id: 22,
        author: 'Minh Anh',
        avatar: 'https://i.pravatar.cc/40?img=5',
        time: '3 giờ trước',
        content: 'Mình hay nghe lại file audio bài 02.08 rồi shadowing, nhớ lâu hơn viết tay.',
        likes: 5,
      },
    ],
  },
  3: {
    content:
      'Khi gọi món ở nhà hàng, em muốn nói “làm ít cay giúp em”. Câu “맵지 않게 해주세요” có tự nhiên không, hay người Hàn hay dùng cách khác ạ?',
    lesson: '08.04 Gọi món nhà hàng',
    timeAgo: '1 ngày trước',
    comments: [
      {
        id: 31,
        author: 'Kim Soo',
        avatar: 'https://i.pravatar.cc/40?img=13',
        verified: true,
        time: '20 giờ trước',
        content:
          'Câu đó tự nhiên rồi em. Có thể thêm 조금 맵지 않게 해주세요 nếu muốn nhấn “một chút”.',
        likes: 8,
      },
    ],
  },
  4: {
    content:
      'Em làm bài chia đuôi: 가다  đến  가요, 먹다  đến  먹어요, 하다  đến  해요. Phần 하다 em còn hơi phân vân — cô/các bạn check giúp em với ạ.',
    lesson: '04.15 Bài tập chia đuôi câu',
    timeAgo: '2 ngày trước',
    comments: [
      {
        id: 41,
        author: 'Minh Hàn',
        avatar: 'https://i.pravatar.cc/40?img=11',
        time: '1 ngày trước',
        content: 'Phần 하다  đến  해요 đúng rồi. Nhớ quy tắc đặc biệt của 하다 nhé.',
        likes: 3,
      },
    ],
  },
  5: {
    content:
      'Flashcard tuần 3 có vài thẻ nghĩa gần nhau (먹다 / 드시다 / 잡수시다). Em nên gom theo mức lịch sự hay tách theo ngữ cảnh ạ?',
    lesson: 'Tuần 3 — Từ vựng ăn uống',
    timeAgo: '3 ngày trước',
    comments: [
      {
        id: 51,
        author: 'Cô Huyền',
        avatar: 'https://i.pravatar.cc/40?img=47',
        verified: true,
        time: '2 ngày trước',
        content:
          'Nên gom theo mức lịch sự: 먹다 (thường) — 드시다 / 잡수시다 (tôn kính). Gắn thêm ví dụ hội thoại sẽ dễ nhớ.',
        likes: 15,
        replies: [
          {
            id: 511,
            author: 'Ngọc Mai',
            avatar: 'https://i.pravatar.cc/40?img=28',
            time: '2 ngày trước',
            content: 'Dạ em đã chỉnh lại bộ thẻ theo hướng này ạ.',
            likes: 1,
          },
        ],
      },
    ],
  },
  6: {
    content:
      'Em giao tiếp được mức cơ bản (đặt món, hỏi đường). Nên học TOPIK I cho vững nền hay nhảy thẳng TOPIK II để tiết kiệm thời gian ạ?',
    lesson: 'Tư vấn lộ trình TOPIK',
    timeAgo: '4 ngày trước',
    comments: [
      {
        id: 61,
        author: 'Foodie KR',
        avatar: 'https://i.pravatar.cc/40?img=32',
        verified: true,
        time: '3 ngày trước',
        content:
          'Nếu mục tiêu điểm số, làm thử đề TOPIK I trước. Đạt ổn định thì lên II. Giao tiếp tốt ≠ nắm vững ngữ pháp đọc hiểu.',
        likes: 22,
      },
    ],
  },
  7: {
    content:
      'Dạ hiện tại khi em xem video Luyện nói trên iPhone thì bị đứng ở phút 08:12, không tua được tiếp. Em thử Safari và Chrome đều vậy ạ.',
    lesson: 'Luyện nói — Bài 12 Hội thoại cà phê',
    timeAgo: '5 ngày trước',
    attachments: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
    ],
    comments: [
      {
        id: 71,
        author: 'Đức Huy',
        avatar: 'https://i.pravatar.cc/40?img=15',
        time: '4 ngày trước',
        content: 'Em vừa thử lại trên Wi-Fi khác vẫn lỗi ạ.',
        likes: 1,
      },
      {
        id: 72,
        author: 'CSKH Cô Huyền',
        avatar: 'https://i.pravatar.cc/40?img=33',
        verified: true,
        time: '3 ngày trước',
        content:
          'Cảm ơn em đã báo. Team đang kiểm tra file encode bài 12. Em tạm xem bản dự phòng trong mục Tài liệu nhé.',
        likes: 4,
      },
    ],
  },
  8: {
    content:
      'Mình muốn chia sẻ lộ trình 5 tháng đạt TOPIK 4: sáng flashcard 20’, trưa nghe podcast, tối ngữ pháp + đề. Ai cần mình gửi checklist chi tiết nhé!',
    lesson: 'Chia sẻ cộng đồng',
    timeAgo: '1 tuần trước',
    comments: [
      {
        id: 81,
        author: 'Thu Trang',
        avatar: 'https://i.pravatar.cc/40?img=12',
        time: '6 ngày trước',
        content: 'Cho mình xin checklist với ạ!',
        likes: 6,
        replies: [
          {
            id: 811,
            author: 'Foodie KR',
            avatar: 'https://i.pravatar.cc/40?img=32',
            time: '6 ngày trước',
            content: 'Mình inbox file Notion cho bạn nhé.',
            likes: 2,
          },
        ],
      },
    ],
  },
  9: {
    content:
      'Em chưa phân biệt rõ 고 싶다 (tôi muốn) và 고 싶어 하다 (muốn [ai đó] làm…). Có ví dụ đối chiếu ngắn để nhớ không ạ?',
    lesson: '11.03 Biểu đạt mong muốn',
    timeAgo: '1 tuần trước',
    comments: [
      {
        id: 91,
        author: 'Cô Huyền',
        avatar: 'https://i.pravatar.cc/40?img=47',
        verified: true,
        time: '6 ngày trước',
        content:
          '나는 학교에 가고 싶다 = tôi muốn đi học. 엄마는 내가 일찍 자고 싶어 한다 = mẹ muốn tôi ngủ sớm. Chủ ngữ khác nhau là chìa khóa.',
        likes: 18,
      },
    ],
  },
  10: {
    content:
      'Khi viết email công sở lần đầu, mở đầu bằng 안녕하세요 có quá thân mật không? Hay nên dùng 안녕하십니까 / kính gửi… ạ?',
    lesson: '05.02 Email công sở',
    timeAgo: '2 tuần trước',
    comments: [
      {
        id: 101,
        author: 'Lan Anh',
        avatar: 'https://i.pravatar.cc/40?img=20',
        time: '13 ngày trước',
        content: 'Em hay thấy mẫu dùng 안녕하십니까 ạ.',
        likes: 2,
      },
    ],
  },
  11: {
    content:
      'Em viết luận TOPIK theo dàn: mở — nêu quan điểm — 2 luận điểm — kết. Phần luận điểm 2 hơi ngắn, mọi người góp ý giúp em với ạ.',
    lesson: 'Viết luận TOPIK — Buổi 6',
    timeAgo: '2 tuần trước',
    comments: [
      {
        id: 111,
        author: 'Minh Hàn',
        avatar: 'https://i.pravatar.cc/40?img=11',
        verified: true,
        time: '12 ngày trước',
        content: 'Thêm 1 ví dụ thực tế ở luận điểm 2 là ổn. Độ dài 2 đoạn nên cân bằng hơn.',
        likes: 7,
      },
    ],
  },
  12: {
    content:
      'Video luyện nghe K-Drama không hiện phụ đề dù em đã bật CC. Em dùng Chrome trên macOS. Có ai bị giống vậy không ạ?',
    lesson: 'Nghe hiểu — Series Café Dating',
    timeAgo: '3 tuần trước',
    attachments: [
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&q=80',
    ],
    comments: [
      {
        id: 121,
        author: 'CSKH Cô Huyền',
        avatar: 'https://i.pravatar.cc/40?img=33',
        verified: true,
        time: '2 tuần trước',
        content: 'Đã cập nhật track phụ đề. Em hard refresh (Cmd+Shift+R) giúp mình nhé.',
        likes: 9,
        replies: [
          {
            id: 1211,
            author: 'Ngọc Mai',
            avatar: 'https://i.pravatar.cc/40?img=28',
            time: '2 tuần trước',
            content: 'Em xem được rồi ạ, cảm ơn!',
            likes: 1,
          },
        ],
      },
    ],
  },
}

export function getQaById(id: number): QaQuestionDetail | undefined {
  const base = QA_QUESTIONS.find((q) => q.id === id)
  const extra = QA_DETAIL_EXTRA[id]
  if (!base || !extra) return undefined
  return { ...base, ...extra }
}

export function filterQuestions(
  questions: QaQuestion[],
  opts: {
    category: QaCategory
    status: 'all' | QaStatus
    query: string
  },
) {
  const q = opts.query.trim().toLowerCase()
  return questions.filter((item) => {
    if (opts.category !== 'all' && item.category !== opts.category) return false
    if (opts.status !== 'all' && item.status !== opts.status) return false
    if (!q) return true
    return (
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.courseTag.toLowerCase().includes(q)
    )
  })
}
