import {
  faBook,
  faBuilding,
  faBullseye,
  faComments,
  faFilm,
  faHeadphones,
  faLanguage,
  faPen,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type ArticleTopic =
  | 'vocab'
  | 'grammar'
  | 'topik'
  | 'speaking'
  | 'culture'
  | 'other'

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'emphasis'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; gradient: string; caption: string; label: string }

export type Article = {
  id: number
  title: string
  topic: ArticleTopic
  author: string
  authorUrl: string
  avatar: string
  verified: boolean
  publishedAt: string
  readTime: string
  likes: number
  comments: number
  image: string
  icon: IconDefinition
  excerpt: string
  body: ArticleBlock[]
}

export const ARTICLE_TOPICS: { id: ArticleTopic | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'vocab', label: 'Từ vựng' },
  { id: 'grammar', label: 'Ngữ pháp' },
  { id: 'topik', label: 'TOPIK' },
  { id: 'speaking', label: 'Giao tiếp' },
  { id: 'culture', label: 'Văn hóa' },
  { id: 'other', label: 'Khác' },
]

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Top 100 từ vựng tiếng Hàn thông dụng nhất',
    topic: 'vocab',
    author: 'Minh Hàn',
    authorUrl: 'https://tienghancohuyen.vn/author/minh-han',
    avatar: 'https://i.pravatar.cc/80?img=11',
    verified: true,
    publishedAt: '2 tháng trước',
    readTime: '6 phút đọc',
    likes: 128,
    comments: 14,
    image: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    icon: faBook,
    excerpt: 'Danh sách từ vựng nền tảng giúp bạn giao tiếp hàng ngày và mở rộng vốn từ nhanh hơn.',
    body: [
      {
        type: 'p',
        text: 'Chào các bạn! Khi mới bắt đầu học tiếng Hàn, nhiều người bị “ngợp” vì quá nhiều từ mới. Thực tế, chỉ cần nắm vững khoảng 100–300 từ thông dụng là bạn đã hiểu được phần lớn hội thoại cơ bản.',
      },
      {
        type: 'emphasis',
        text: 'Mẹo nhớ từ nhanh: học theo chủ đề (gia đình, thời gian, ăn uống) và đặt câu ngay trong ngày học.',
      },
      {
        type: 'list',
        items: [
          '인사: xin chào / tạm biệt',
          '감사하다: cảm ơn',
          '시간: thời gian',
          '먹다 / 마시다: ăn / uống',
          '가다 / 오다: đi / đến',
        ],
      },
      {
        type: 'p',
        text: 'Hãy chọn 10 từ mỗi ngày, viết ví dụ ngắn và ôn lại bằng flashcard. Sau 10 ngày bạn sẽ có nền tảng vững để học ngữ pháp.',
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        caption: 'Sơ đồ nhóm từ vựng theo chủ đề hàng ngày',
        label: 'VOCAB 100',
      },
    ],
  },
  {
    id: 2,
    title: 'Bí quyết đạt TOPIK 6 trong 1 năm',
    topic: 'topik',
    author: 'Thu Trang',
    authorUrl: 'https://tienghancohuyen.vn/author/thu-trang',
    avatar: 'https://i.pravatar.cc/80?img=12',
    verified: true,
    publishedAt: '1 tháng trước',
    readTime: '8 phút đọc',
    likes: 256,
    comments: 31,
    image: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    icon: faBullseye,
    excerpt: 'Lộ trình học theo tuần, cách luyện đề và sửa lỗi giúp bạn tiến bộ rõ rệt từng kỹ năng.',
    body: [
      {
        type: 'p',
        text: 'Chào các bạn! TOPIK 6 không phải chuyện “học nhiều là được”, mà là học đúng thứ tự: nền tảng → tốc độ → chiến lược làm bài.',
      },
      {
        type: 'list',
        items: [
          'Tháng 1–3: củng cố ngữ pháp trung cấp và từ vựng theo chủ đề đề thi',
          'Tháng 4–6: luyện nghe – đọc theo dạng câu hỏi',
          'Tháng 7–9: viết luận + chữa bài định kỳ',
          'Tháng 10–12: full test tuần 1–2 lần và phân tích điểm yếu',
        ],
      },
      {
        type: 'emphasis',
        text: 'Mỗi tuần chỉ cần 1 full test thôi cũng đủ nếu bạn chịu ngồi phân tích kỹ từng lỗi.',
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        caption: 'Lịch học TOPIK mẫu trong 12 tuần',
        label: 'TOPIK 6',
      },
    ],
  },
  {
    id: 3,
    title: 'Cách dùng đuôi câu cơ bản: 아요/어요',
    topic: 'grammar',
    author: 'Kim Soo',
    authorUrl: 'https://tienghancohuyen.vn/author/kim-soo',
    avatar: 'https://i.pravatar.cc/80?img=13',
    verified: true,
    publishedAt: '3 tuần trước',
    readTime: '5 phút đọc',
    likes: 97,
    comments: 8,
    image: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    icon: faPen,
    excerpt: 'Hiểu quy tắc biến đổi nguyên âm để chia đuôi câu lịch sự đúng ngay từ đầu.',
    body: [
      {
        type: 'p',
        text: '아요/어요 là đuôi câu lịch sự phổ biến nhất. Nếu nắm chắc phần này, bạn sẽ nói được hầu hết câu giao tiếp sơ cấp.',
      },
      {
        type: 'list',
        items: [
          'Nguyên âm dương (ㅏ/ㅗ) → 아요: 가다 → 가요',
          'Nguyên âm âm (ㅓ/ㅜ/ㅡ…) → 어요: 먹다 → 먹어요',
          '하다 → 해요 (trường hợp đặc biệt)',
        ],
      },
      {
        type: 'emphasis',
        text: 'Đừng học thuộc máy móc cả trăm động từ — hãy luyện theo nhóm nguyên âm.',
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        caption: 'Bảng phân nhóm nguyên âm cho 아요/어요',
        label: '아요/어요',
      },
    ],
  },
  {
    id: 4,
    title: 'Văn hóa giao tiếp trong công ty Hàn Quốc',
    topic: 'culture',
    author: 'Lan Anh',
    authorUrl: 'https://tienghancohuyen.vn/author/lan-anh',
    avatar: 'https://i.pravatar.cc/80?img=20',
    verified: true,
    publishedAt: '1 tuần trước',
    readTime: '7 phút đọc',
    likes: 64,
    comments: 5,
    image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    icon: faBuilding,
    excerpt: 'Kính ngữ, cách xưng hô và vài lưu ý giúp bạn tự tin hơn khi làm việc với đồng nghiệp Hàn.',
    body: [
      {
        type: 'p',
        text: 'Trong môi trường công sở Hàn Quốc, cách nói chuyện lịch sự quan trọng không kém kiến thức chuyên môn.',
      },
      {
        type: 'list',
        items: [
          'Dùng kính ngữ với cấp trên và người lớn tuổi hơn',
          'Tránh gọi thẳng tên nếu chưa được cho phép',
          'Email ngắn gọn, có lời chào mở đầu và kết thúc',
        ],
      },
      {
        type: 'p',
        text: 'Nếu bạn đang học tiếng Hàn thương mại, hãy luyện thêm mẫu câu họp, báo cáo và xin ý kiến.',
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        caption: 'Tình huống giao tiếp thường gặp ở văn phòng',
        label: 'OFFICE KR',
      },
    ],
  },
  {
    id: 5,
    title: 'Học tiếng Hàn qua phim: câu thoại hay',
    topic: 'speaking',
    author: 'Hàn Talk',
    authorUrl: 'https://tienghancohuyen.vn/author/han-talk',
    avatar: 'https://i.pravatar.cc/80?img=25',
    verified: false,
    publishedAt: '5 ngày trước',
    readTime: '4 phút đọc',
    likes: 42,
    comments: 3,
    image: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    icon: faFilm,
    excerpt: 'Gợi ý cách “shadowing” câu thoại phim để cải thiện phát âm và phản xạ nói.',
    body: [
      {
        type: 'p',
        text: 'Phim Hàn là nguồn luyện nghe – nói rất tự nhiên. Quan trọng là đừng chỉ xem phụ đề, hãy bắt chước nhịp nói.',
      },
      {
        type: 'emphasis',
        text: 'Mỗi ngày chỉ cần 5 câu thoại: nghe → nhắc lại → ghi nghĩa → dùng trong tình huống của bạn.',
      },
      {
        type: 'list',
        items: [
          '정말요?: Thật sao?',
          '괜찮아요: Không sao đâu',
          '잠시만요: Xin chờ một chút',
        ],
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
        caption: 'Ví dụ shadowing từ 1 phân đoạn phim ngắn',
        label: 'DRAMA',
      },
    ],
  },
  {
    id: 6,
    title: 'Tổng hợp tài liệu luyện nghe hiệu quả',
    topic: 'speaking',
    author: 'Ngọc Mai',
    authorUrl: 'https://tienghancohuyen.vn/author/ngoc-mai',
    avatar: 'https://i.pravatar.cc/80?img=28',
    verified: true,
    publishedAt: '4 ngày trước',
    readTime: '9 phút đọc',
    likes: 88,
    comments: 11,
    image: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    icon: faHeadphones,
    excerpt: 'Podcast, tin tức chậm, và bài nghe TOPIK — chọn đúng nguồn theo trình độ của bạn.',
    body: [
      {
        type: 'p',
        text: 'Luyện nghe dễ nản nếu chọn tài liệu quá khó. Hãy bắt đầu từ tốc độ chậm rồi tăng dần.',
      },
      {
        type: 'list',
        items: [
          'Sơ cấp: hội thoại chậm + phụ đề song ngữ',
          'Trung cấp: podcast chủ đề đời sống',
          'Cao cấp: tin tức và đề nghe TOPIK II',
        ],
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        caption: 'Checklist tài liệu nghe theo cấp độ',
        label: 'LISTENING',
      },
    ],
  },
  {
    id: 7,
    title: 'Bảng chữ cái Hangul trong 1 ngày',
    topic: 'other',
    author: 'Minh Hàn',
    authorUrl: 'https://tienghancohuyen.vn/author/minh-han',
    avatar: 'https://i.pravatar.cc/80?img=11',
    verified: true,
    publishedAt: '6 tháng trước',
    readTime: '10 phút đọc',
    likes: 312,
    comments: 40,
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: faLanguage,
    excerpt: 'Học phụ âm – nguyên âm và cách ghép âm tiết để đọc được Hangul ngay trong ngày.',
    body: [
      {
        type: 'p',
        text: 'Hangul được thiết kế rất logic. Nếu bạn học đúng thứ tự phụ âm → nguyên âm → ghép âm tiết, một ngày là đủ để đọc được.',
      },
      {
        type: 'list',
        items: [
          'Học 14 phụ âm cơ bản trước',
          'Học nguyên âm đơn rồi đến nguyên âm kép',
          'Ghép thành âm tiết: 가, 나, 다…',
        ],
      },
      {
        type: 'emphasis',
        text: 'Đừng cố nhớ hết patchim ngay ngày đầu — hãy đọc trôi chảy trước đã.',
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        caption: 'Bảng Hangul rút gọn cho người mới',
        label: '한글',
      },
    ],
  },
  {
    id: 8,
    title: 'Từ vựng ẩm thực Hàn Quốc cần biết',
    topic: 'vocab',
    author: 'Foodie KR',
    authorUrl: 'https://tienghancohuyen.vn/author/foodie-kr',
    avatar: 'https://i.pravatar.cc/80?img=32',
    verified: false,
    publishedAt: '2 ngày trước',
    readTime: '5 phút đọc',
    likes: 55,
    comments: 6,
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: faUtensils,
    excerpt: 'Order đồ ăn, hỏi độ cay và khen món ngon bằng tiếng Hàn tự nhiên hơn.',
    body: [
      {
        type: 'p',
        text: 'Đi ăn Hàn mà biết vài từ cơ bản sẽ khiến trải nghiệm thú vị hơn rất nhiều.',
      },
      {
        type: 'list',
        items: [
          '김치: kimchi',
          '불고기: thịt nướng sốt ngọt',
          '맵다: cay',
          '맛있어요: ngon quá',
        ],
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        caption: 'Menu mẫu với từ vựng món ăn phổ biến',
        label: 'FOOD',
      },
    ],
  },
  {
    id: 9,
    title: 'Luyện phản xạ nói với mẫu câu hàng ngày',
    topic: 'speaking',
    author: 'Kim Soo',
    authorUrl: 'https://tienghancohuyen.vn/author/kim-soo',
    avatar: 'https://i.pravatar.cc/80?img=13',
    verified: true,
    publishedAt: 'Hôm qua',
    readTime: '6 phút đọc',
    likes: 25,
    comments: 1,
    image: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    icon: faComments,
    excerpt: 'Bộ mẫu câu ngắn giúp bạn trả lời nhanh trong hội thoại thật, không còn “đứng hình”.',
    body: [
      {
        type: 'p',
        text: 'Chào các bạn! Nhiều người học ngữ pháp rất chắc nhưng khi nói vẫn bị chậm vì thiếu mẫu câu phản xạ.',
      },
      {
        type: 'p',
        text: 'Hôm nay mình chia sẻ cách luyện nói theo “chunk” — học theo cụm câu hoàn chỉnh thay vì từng từ rời.',
      },
      {
        type: 'emphasis',
        text: 'Mình bảo đảm khi đọc hết bài này: chỉ cần nhớ 20 mẫu câu, bạn sẽ tự tin hơn rõ rệt khi mở lời.',
      },
      {
        type: 'list',
        items: [
          '어디 가요?: Bạn đi đâu vậy?',
          '뭐 해요?: Bạn đang làm gì?',
          '같이 갈래요?: Đi cùng mình nhé?',
          '조금만 기다려 주세요: Xin chờ một chút',
        ],
      },
      {
        type: 'p',
        text: 'Hãy thu âm bản thân mỗi ngày 3 phút. Nghe lại và sửa phát âm — tiến bộ sẽ đến rất nhanh.',
      },
      {
        type: 'image',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        caption: 'Bảng mẫu câu phản xạ theo tình huống',
        label: 'SPEAKING',
      },
    ],
  },
]

export function getArticleById(id: number) {
  return ARTICLES.find((a) => a.id === id)
}

export function getArticlesByTopic(topic: ArticleTopic | 'all') {
  if (topic === 'all') return ARTICLES
  return ARTICLES.filter((a) => a.topic === topic)
}

export function getArticlesByAuthor(author: string, excludeId?: number) {
  return ARTICLES.filter((a) => a.author === author && a.id !== excludeId)
}

export function getFeaturedArticles(excludeId?: number, limit = 4) {
  return ARTICLES.filter((a) => a.id !== excludeId).slice(0, limit)
}
