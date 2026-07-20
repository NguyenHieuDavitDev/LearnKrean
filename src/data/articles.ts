import {
  faBook,
  faBriefcase,
  faBuilding,
  faBullseye,
  faComments,
  faFilm,
  faGraduationCap,
  faHeadphones,
  faHouse,
  faLanguage,
  faPen,
  faTrain,
  faUsers,
  faUtensils,
  faWallet,
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
  | { type: 'image'; src: string; caption: string; alt: string }

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

const articleFiles = import.meta.glob<{ default: string }>(
  '../assets/articles/*.jpg',
  { eager: true },
)
const avatarFiles = import.meta.glob<{ default: string }>(
  '../assets/avatars/*.jpg',
  { eager: true },
)

function articleImg(name: string) {
  const mod = articleFiles[`../assets/articles/${name}`]
  if (!mod) throw new Error(`Missing article image: ${name}`)
  return mod.default
}

function avatarImg(n: number) {
  const mod = avatarFiles[`../assets/avatars/avatar-${n}.jpg`]
  if (!mod) throw new Error(`Missing avatar: ${n}`)
  return mod.default
}

const ARTICLES_DATA: Article[] = [
  {
    id: 1,
    title: 'Top 100 từ vựng tiếng Hàn thông dụng nhất',
    topic: 'vocab',
    author: 'Minh Hàn',
    authorUrl: 'https://tienghancohuyen.vn/author/minh-han',
    avatar: avatarImg(11),
    verified: true,
    publishedAt: '2 tháng trước',
    readTime: '7 phút đọc',
    likes: 128,
    comments: 14,
    image: articleImg('vocab-study.jpg'),
    icon: faBook,
    excerpt:
      'Bộ từ nền tảng theo chủ đề đời sống giúp bạn giao tiếp hàng ngày và mở rộng vốn từ nhanh, bền.',
    body: [
      {
        type: 'p',
        text: 'Khi mới học tiếng Hàn, nhiều bạn bị choáng vì “quá nhiều từ”. Thực tế, chỉ cần nắm chắc khoảng 100–300 từ thông dụng là đã hiểu được phần lớn hội thoại sơ cấp — từ chào hỏi, mua sắm đến hỏi đường.',
      },
      {
        type: 'p',
        text: 'Thay vì học từ rời theo thứ tự từ điển, hãy gom theo chủ đề: gia đình, thời gian, ăn uống, đi lại. Não sẽ dễ liên kết nghĩa và nhớ lâu hơn.',
      },
      {
        type: 'emphasis',
        text: 'Mẹo nhớ nhanh: mỗi ngày 10 từ + đặt 1 câu thật của bạn. Ví dụ học 먹다 thì nói “저는 밥을 먹어요”.',
      },
      {
        type: 'list',
        items: [
          '인사: xin chào / tạm biệt (안녕하세요, 안녕히 가세요)',
          '감사하다: cảm ơn — 감사합니다',
          '시간 / 오늘 / 내일: thời gian / hôm nay / ngày mai',
          '먹다 / 마시다: ăn / uống',
          '가다 / 오다 / 있다: đi / đến / có, ở',
        ],
      },
      {
        type: 'image',
        src: articleImg('topik-desk.jpg'),
        caption: 'Học từ theo chủ đề và đặt câu ngay trong ngày giúp nhớ bền hơn học thuộc lòng.',
        alt: 'Sổ tay và sách học ngôn ngữ trên bàn',
      },
      {
        type: 'p',
        text: 'Sau 10 ngày (khoảng 100 từ), hãy tự kiểm tra: nhìn nghĩa tiếng Việt nói lại tiếng Hàn trong 30 giây. Nếu còn sót, đưa từ đó vào “hộp ôn lại” của tuần sau.',
      },
    ],
  },
  {
    id: 2,
    title: 'Bí quyết đạt TOPIK 6 trong 1 năm',
    topic: 'topik',
    author: 'Thu Trang',
    authorUrl: 'https://tienghancohuyen.vn/author/thu-trang',
    avatar: avatarImg(12),
    verified: true,
    publishedAt: '1 tháng trước',
    readTime: '9 phút đọc',
    likes: 256,
    comments: 31,
    image: articleImg('topik-desk.jpg'),
    icon: faBullseye,
    excerpt:
      'Lộ trình 12 tháng rõ ràng: củng cố nền tảng, luyện từng dạng đề, rồi làm full test và phân tích lỗi từng kỹ năng.',
    body: [
      {
        type: 'p',
        text: 'TOPIK 6 không phải chuyện “học càng nhiều càng tốt”, mà là học đúng thứ tự: xây nền tảng vững, rồi tăng tốc độ làm bài, sau đó áp dụng chiến lược cho từng dạng câu hỏi. Nhiều bạn mất điểm vì luyện đề không phân tích lỗi.',
      },
      {
        type: 'list',
        items: [
          'Tháng 1–3: ngữ pháp trung cấp + từ vựng theo chủ đề đề thi',
          'Tháng 4–6: luyện nghe – đọc theo dạng câu hỏi',
          'Tháng 7–9: viết luận và chữa bài định kỳ',
          'Tháng 10–12: full test 1–2 lần/tuần, theo dõi điểm yếu',
        ],
      },
      {
        type: 'image',
        src: articleImg('topik-plan.jpg'),
        caption: 'Lịch học và theo dõi điểm số giúp bạn thấy tiến bộ theo tuần, không chỉ “cảm giác” đang học.',
        alt: 'Người học ghi chú kế hoạch trên máy tính và sổ',
      },
      {
        type: 'emphasis',
        text: 'Mỗi tuần chỉ cần 1 full test nếu bạn chịu ngồi phân tích kỹ từng lỗi — hiệu quả hơn làm 3 đề rồi bỏ qua.',
      },
      {
        type: 'p',
        text: 'Với kỹ năng viết, hãy lưu “ngân hàng mẫu câu” mở bài – nối ý – kết bài. Chấm điểm theo tiêu chí: đúng đề, mạch lạc, từ vựng đa dạng, ít lỗi ngữ pháp.',
      },
    ],
  },
  {
    id: 3,
    title: 'Cách dùng đuôi câu cơ bản: 아요/어요',
    topic: 'grammar',
    author: 'Kim Soo',
    authorUrl: 'https://tienghancohuyen.vn/author/kim-soo',
    avatar: avatarImg(13),
    verified: true,
    publishedAt: '3 tuần trước',
    readTime: '6 phút đọc',
    likes: 97,
    comments: 8,
    image: articleImg('grammar-write.jpg'),
    icon: faPen,
    excerpt:
      'Hiểu quy tắc nguyên âm dương/âm để chia đuôi lịch sự đúng ngay từ đầu — không cần thuộc máy móc.',
    body: [
      {
        type: 'p',
        text: '아요/어요 là đuôi câu lịch sự phổ biến nhất ở sơ cấp. Nắm chắc phần này, bạn nói được phần lớn câu giao tiếp hàng ngày mà vẫn lịch sự.',
      },
      {
        type: 'list',
        items: [
          'Nguyên âm dương (ㅏ/ㅗ) chia thành 아요: 가다 thành 가요',
          'Nguyên âm âm (ㅓ/ㅜ/ㅡ…) chia thành 어요: 먹다 thành 먹어요',
          '하다 thành 해요 (trường hợp đặc biệt hay gặp)',
        ],
      },
      {
        type: 'image',
        src: articleImg('grammar-notes.jpg'),
        caption: 'Viết lại 10 động từ mỗi ngày theo nhóm nguyên âm sẽ giúp phản xạ chia đuôi nhanh hơn.',
        alt: 'Bút và sổ tay ghi chú ngữ pháp',
      },
      {
        type: 'emphasis',
        text: 'Đừng học thuộc cả trăm động từ rời — luyện theo nhóm nguyên âm rồi đặt câu ngắn.',
      },
      {
        type: 'p',
        text: 'Bài tập nhanh: chọn 5 động từ bạn hay dùng (가다, 보다, 하다, 먹다, 마시다), chia 아요/어요 và nói to 3 lần. Lặp lại vào hôm sau.',
      },
    ],
  },
  {
    id: 4,
    title: 'Văn hóa giao tiếp trong công ty Hàn Quốc',
    topic: 'culture',
    author: 'Lan Anh',
    authorUrl: 'https://tienghancohuyen.vn/author/lan-anh',
    avatar: avatarImg(20),
    verified: true,
    publishedAt: '1 tuần trước',
    readTime: '8 phút đọc',
    likes: 64,
    comments: 5,
    image: articleImg('culture-office.jpg'),
    icon: faBuilding,
    excerpt:
      'Kính ngữ, cách xưng hô và vài lưu ý email/họp giúp bạn tự tin hơn khi làm việc với đồng nghiệp Hàn.',
    body: [
      {
        type: 'p',
        text: 'Trong môi trường công sở Hàn Quốc, cách nói chuyện lịch sự thường được đánh giá ngang với năng lực chuyên môn. Một câu kính ngữ đúng chỗ có thể tạo ấn tượng rất tốt.',
      },
      {
        type: 'list',
        items: [
          'Dùng kính ngữ với cấp trên và người lớn tuổi hơn',
          'Tránh gọi thẳng tên nếu chưa được cho phép',
          'Email ngắn gọn: chào mở đầu – nội dung – lời kết',
          'Trong họp: lắng nghe hết ý rồi mới phản biện nhẹ nhàng',
        ],
      },
      {
        type: 'image',
        src: articleImg('culture-meeting.jpg'),
        caption: 'Không khí họp nhóm tại văn phòng — nơi kính ngữ và thái độ lắng nghe rất được coi trọng.',
        alt: 'Nhóm đồng nghiệp họp trong không gian văn phòng hiện đại',
      },
      {
        type: 'p',
        text: 'Nếu bạn đang học tiếng Hàn thương mại, hãy luyện thêm mẫu câu xin ý kiến (어떻게 생각하세요?), báo cáo tiến độ và xin lỗi lịch sự khi trễ deadline.',
      },
    ],
  },
  {
    id: 5,
    title: 'Học tiếng Hàn qua phim: câu thoại hay',
    topic: 'speaking',
    author: 'Hàn Talk',
    authorUrl: 'https://tienghancohuyen.vn/author/han-talk',
    avatar: avatarImg(25),
    verified: false,
    publishedAt: '5 ngày trước',
    readTime: '5 phút đọc',
    likes: 42,
    comments: 3,
    image: articleImg('speaking-cinema.jpg'),
    icon: faFilm,
    excerpt:
      'Cách shadowing câu thoại phim để cải thiện phát âm, ngữ điệu và phản xạ nói tự nhiên hơn.',
    body: [
      {
        type: 'p',
        text: 'Phim Hàn là nguồn luyện nghe – nói rất đời. Quan trọng là đừng chỉ xem phụ đề: hãy dừng lại, nhắc lại nhịp nói và cảm xúc của nhân vật.',
      },
      {
        type: 'emphasis',
        text: 'Mỗi ngày chỉ cần 5 câu thoại: nghe, nhắc lại theo nhịp, ghi nghĩa, rồi dùng trong tình huống của bạn.',
      },
      {
        type: 'list',
        items: [
          '정말요?: Thật sao?',
          '괜찮아요: Không sao đâu',
          '잠시만요: Xin chờ một chút',
          '고마워요: Cảm ơn (thân mật hơn 감사합니다)',
        ],
      },
      {
        type: 'image',
        src: articleImg('speaking-theater.jpg'),
        caption: 'Chọn phân đoạn ngắn 1–2 phút để shadowing sẽ hiệu quả hơn xem nguyên tập.',
        alt: 'Rạp chiếu phim với màn hình lớn',
      },
      {
        type: 'p',
        text: 'Gợi ý: tắt phụ đề lần 2, chỉ nhìn miệng nhân vật và đoán. Lần 3 bật phụ đề để kiểm tra — cách này giúp tai quen tốc độ nói thật.',
      },
    ],
  },
  {
    id: 6,
    title: 'Tổng hợp tài liệu luyện nghe hiệu quả',
    topic: 'speaking',
    author: 'Ngọc Mai',
    authorUrl: 'https://tienghancohuyen.vn/author/ngoc-mai',
    avatar: avatarImg(28),
    verified: true,
    publishedAt: '4 ngày trước',
    readTime: '8 phút đọc',
    likes: 88,
    comments: 11,
    image: articleImg('listening-headphones.jpg'),
    icon: faHeadphones,
    excerpt:
      'Podcast, tin tức chậm và bài nghe TOPIK — chọn đúng nguồn theo trình độ để nghe không nản.',
    body: [
      {
        type: 'p',
        text: 'Luyện nghe dễ bỏ cuộc nếu chọn tài liệu quá khó ngay từ đầu. Hãy bắt đầu từ tốc độ chậm, nội dung quen thuộc, rồi tăng dần độ khó.',
      },
      {
        type: 'list',
        items: [
          'Sơ cấp: hội thoại chậm + phụ đề song ngữ',
          'Trung cấp: podcast chủ đề đời sống, du lịch, ẩm thực',
          'Cao cấp: tin tức và đề nghe TOPIK II',
        ],
      },
      {
        type: 'image',
        src: articleImg('listening-mic.jpg'),
        caption: 'Tai nghe tốt và không gian yên giúp bạn tập trung nghe chi tiết phát âm.',
        alt: 'Micro và thiết bị thu âm trên bàn',
      },
      {
        type: 'emphasis',
        text: 'Nghe chủ động: ghi 5 từ/cụm mới sau mỗi bài. Nghe thụ động cả ngày thường ít tiến bộ hơn bạn nghĩ.',
      },
      {
        type: 'p',
        text: 'Lịch gợi ý: 20 phút nghe sâu buổi sáng + 10 phút ôn lại từ mới buổi tối. Giữ đều 5 ngày/tuần sẽ thấy tai “mở” rõ sau 3–4 tuần.',
      },
    ],
  },
  {
    id: 7,
    title: 'Bảng chữ cái Hangul trong 1 ngày',
    topic: 'other',
    author: 'Minh Hàn',
    authorUrl: 'https://tienghancohuyen.vn/author/minh-han',
    avatar: avatarImg(11),
    verified: true,
    publishedAt: '6 tháng trước',
    readTime: '10 phút đọc',
    likes: 312,
    comments: 40,
    image: articleImg('hangul-city.jpg'),
    icon: faLanguage,
    excerpt:
      'Học phụ âm – nguyên âm và cách ghép âm tiết để đọc được Hangul ngay trong ngày đầu tiên.',
    body: [
      {
        type: 'p',
        text: 'Hangul được thiết kế rất logic. Nếu học đúng thứ tự — phụ âm trước, nguyên âm sau, rồi ghép âm tiết — nhiều người đọc được sau chỉ một ngày tập trung.',
      },
      {
        type: 'list',
        items: [
          'Học 14 phụ âm cơ bản trước (ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ…)',
          'Học nguyên âm đơn rồi đến nguyên âm kép',
          'Ghép thành âm tiết: 가, 나, 다, 마…',
        ],
      },
      {
        type: 'image',
        src: articleImg('hangul-street.jpg'),
        caption: 'Không khí phố Đông Á với biển hiệu chữ — động lực để bạn đọc được Hangul ngoài đời.',
        alt: 'Đường phố châu Á về đêm với biển hiệu đèn neon',
      },
      {
        type: 'emphasis',
        text: 'Đừng cố nhớ hết batchim ngay ngày đầu — hãy đọc trôi chảy âm tiết mở trước đã.',
      },
      {
        type: 'p',
        text: 'Cuối ngày, thử đọc tên món ăn trên menu hoặc tên ga tàu điện. Cảm giác “mình đọc được rồi” sẽ giữ bạn học lâu hơn mọi mẹo thuộc lòng.',
      },
    ],
  },
  {
    id: 8,
    title: 'Từ vựng ẩm thực Hàn Quốc cần biết',
    topic: 'vocab',
    author: 'Foodie KR',
    authorUrl: 'https://tienghancohuyen.vn/author/foodie-kr',
    avatar: avatarImg(32),
    verified: false,
    publishedAt: '2 ngày trước',
    readTime: '5 phút đọc',
    likes: 55,
    comments: 6,
    image: articleImg('food-korean.jpg'),
    icon: faUtensils,
    excerpt:
      'Order đồ ăn, hỏi độ cay và khen món ngon bằng tiếng Hàn — tự nhiên hơn khi đi nhà hàng.',
    body: [
      {
        type: 'p',
        text: 'Đi ăn Hàn mà biết vài từ cơ bản sẽ khiến trải nghiệm thú vị hơn rất nhiều: gọi món đúng ý, hỏi độ cay, và khen đầu bếp một câu chân thành.',
      },
      {
        type: 'list',
        items: [
          '김치: kimchi',
          '불고기: thịt nướng sốt ngọt',
          '비빔밥: cơm trộn',
          '맵다 / 안 맵게 해 주세요: cay / làm ít cay giúp tôi',
          '맛있어요: ngon quá',
        ],
      },
      {
        type: 'image',
        src: articleImg('food-table.jpg'),
        caption: 'Bàn tiệc Hàn với nhiều món chia sẻ — cơ hội luyện từ vựng ngay khi gọi món.',
        alt: 'Bàn ăn Hàn Quốc với nhiều món ăn truyền thống',
      },
      {
        type: 'p',
        text: 'Câu hữu ích khi thanh toán: 계산해 주세요 (tính tiền giúp tôi). Kết hợp với 맛있게 잘 먹었습니다 (em/anh đã ăn ngon) sẽ rất lịch sự.',
      },
    ],
  },
  {
    id: 9,
    title: 'Luyện phản xạ nói với mẫu câu hàng ngày',
    topic: 'speaking',
    author: 'Kim Soo',
    authorUrl: 'https://tienghancohuyen.vn/author/kim-soo',
    avatar: avatarImg(13),
    verified: true,
    publishedAt: 'Hôm qua',
    readTime: '6 phút đọc',
    likes: 25,
    comments: 1,
    image: articleImg('speaking-group.jpg'),
    icon: faComments,
    excerpt:
      'Bộ mẫu câu ngắn giúp bạn trả lời nhanh trong hội thoại thật — hết cảnh “đứng hình” khi bị hỏi.',
    body: [
      {
        type: 'p',
        text: 'Nhiều bạn học ngữ pháp rất chắc nhưng khi nói vẫn chậm vì thiếu mẫu câu phản xạ. Não cần “chunk” — cụm câu hoàn chỉnh — chứ không chỉ từng từ rời.',
      },
      {
        type: 'emphasis',
        text: 'Chỉ cần thuộc 20 mẫu câu tình huống, bạn sẽ tự tin mở lời rõ rệt trong tuần đầu luyện.',
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
        type: 'image',
        src: articleImg('speaking-cafe.jpg'),
        caption: 'Luyện nói theo cặp hoặc ghi âm bản thân 3 phút mỗi ngày mang lại tiến bộ nhanh.',
        alt: 'Hai người trò chuyện vui vẻ trong quán cà phê',
      },
      {
        type: 'p',
        text: 'Cách luyện: bật ghi âm trên điện thoại, nói 10 câu trong 3 phút, nghe lại và sửa phát âm. Không cần lớp học đắt đỏ để bắt đầu thói quen này.',
      },
    ],
  },
  {
    id: 10,
    title: 'Những ngày đầu du học Hàn Quốc: cần chuẩn bị gì?',
    topic: 'culture',
    author: 'Lan Anh',
    authorUrl: 'https://tienghancohuyen.vn/author/lan-anh',
    avatar: avatarImg(20),
    verified: true,
    publishedAt: '3 ngày trước',
    readTime: '14 phút đọc',
    likes: 73,
    comments: 9,
    image: articleImg('hangul-city.jpg'),
    icon: faHouse,
    excerpt:
      'Lịch 7 ngày đầu, giấy tờ cần mang, mức chi phí tham khảo và câu tiếng Hàn dùng ngay — checklist chi tiết cho sinh viên mới sang Hàn.',
    body: [
      {
        type: 'p',
        text: 'Tuần đầu ở Hàn Quốc thường là cảm giác vừa háo hức vừa choáng: jet lag, tiếng Hàn nghe nhanh, ví won chưa quen. Nếu có lịch rõ từng ngày, bạn sẽ ổn định nhanh hơn thay vì xử lý đống việc cùng lúc.',
      },
      {
        type: 'emphasis',
        text: 'Nguyên tắc tuần đầu: ổn định 3 trụ cột — chỗ ở, liên lạc, đi lại. Học tập và xã hội hóa để tuần 2–3.',
      },
      {
        type: 'p',
        text: 'Lịch gợi ý 7 ngày đầu:',
      },
      {
        type: 'list',
        items: [
          'Ngày 1–2: Nhận phòng, kiểm tra wifi/máy sưởi/điều hòa, chụp ảnh hiện trạng phòng. Mua SIM tại sân bay (LG U+, SKT, KT) hoặc eSIM trước khi bay. Nạp T-Money tại ga hoặc cửa hàng tiện lợi (CU/GS25).',
          'Ngày 3: Buổi định hướng (orientation) tại trường — nhận lịch học, sổ tay sinh viên, hướng dẫn đăng ký môn. Hỏi rõ hạn chót đăng ký thẻ cư trú người nước ngoài (ARC) trong 90 ngày.',
          'Ngày 4: Đi bộ quanh khu trường 30–45 phút: tìm siêu thị (Emart/Lotte/Homeplus), cửa hàng tiện lợi, quán cơm 5.000–7.000 won, phòng khám, ga tàu gần nhất.',
          'Ngày 5: Mở tài khoản ngân hàng (Shinhan, Woori, KB thường có quầy tiếng Anh/Trung tại khu vực đại học). Mang: hộ chiếu, giấy nhập học, giấy xác nhận cư trú từ trường hoặc chủ nhà.',
          'Ngày 6: Đăng ký bảo hiểm y tế quốc gia (NHIS) theo hướng dẫn trường — phí khoảng vài chục nghìn won/tháng, được khám bệnh viện công giá rẻ.',
          'Ngày 7: Nghỉ nhẹ, gọi video về nhà, sắp xếp đồ dùng học. Chuẩn bị hồ sơ đi Immigration Office đăng ký ARC (đặt lịch qua app Hi Korea).',
        ],
      },
      {
        type: 'p',
        text: 'Chỗ ở phổ biến và mức chi phí tham khảo (Seoul, 2024–2025):',
      },
      {
        type: 'list',
        items: [
          'Ký túc xá trường: 150.000–400.000 won/tháng — rẻ nhất, thường có giường tầng, phòng chung hoặc đơn, giờ giấc nghiêm.',
          'Gosiwon (고시원): phòng 3–6 m², 250.000–450.000 won/tháng — riêng tư hơn, có thể cấm nấu mạnh mùi.',
          'Hasukjip (하숙집): nhà bán trú gia đình, 400.000–600.000 won/tháng kèm 2 bữa — phù hợp người muốn ăn sẵn.',
          'Oneroom/officetel: 500.000–900.000 won/tháng + tiền cọc (bojeung) 3–10 triệu won — tự do nhất nhưng đắt hơn.',
        ],
      },
      {
        type: 'image',
        src: articleImg('hangul-street.jpg'),
        caption: 'Đi bộ quanh khu trường buổi chiều — cách nhanh nhất để biết quán ăn rẻ, ATM và đường về nhà.',
        alt: 'Đường phố Hàn Quốc về đêm với biển hiệu đèn',
      },
      {
        type: 'p',
        text: 'Giấy tờ nên photo/copy sẵn (bản Hàn + Anh nếu có): hộ chiếu, thư nhập học, giấy xác nhận cư trú, ảnh thẻ 3.5×4.5 cm (nền trắng), bằng cấp và học bạ dịch công chứng nếu trường yêu cầu. Lưu bản scan trên Google Drive đề phòng mất.',
      },
      {
        type: 'p',
        text: 'Đồ mang từ Việt Nam hữu ích: thuốc cá nhân (kê đơn nếu cần), adapter ổ cắm type C/F (Hàn dùng 220V), tất dày mùa đông, mỹ phẩm quen. Gia vị Việt mua được tại chợ đồ Hàn–Việt ở khu sinh viên.',
      },
      {
        type: 'emphasis',
        text: '10 câu tiếng Hàn dùng ngay tuần đầu: 안녕하세요 (xin chào), 감사합니다 (cảm ơn), 이거 얼마예요? (bao nhiêu tiền?), 어디예요? (ở đâu?), 도와주세요 (giúp tôi với), 천천히 말해 주세요 (nói chậm giúp tôi), 화장실 어디예요? (WC ở đâu?), 카드 돼요? (trả thẻ được không?), 영수증 주세요 (cho hóa đơn), 잘 먹겠습니다 / 잘 먹었습니다 (trước/sau bữa ăn).',
      },
      {
        type: 'p',
        text: 'Văn hóa nhỏ nhưng quan trọng: xếp hàng đúng thứ tự ở siêu thị và ga tàu; không nói chuyện to trong thang máy; cởi giày khi vào phòng hasukjip hoặc nhà người Hàn; mang túi riêng vì nhiều nơi tính phí túi nilon. Vi phạm im lặng ký túc xá sau 22h–23h có thể bị phạt tiền.',
      },
    ],
  },
  {
    id: 11,
    title: 'Chi phí sinh hoạt và cách quản lý tiền khi ở Hàn',
    topic: 'culture',
    author: 'Thu Trang',
    authorUrl: 'https://tienghancohuyen.vn/author/thu-trang',
    avatar: avatarImg(12),
    verified: true,
    publishedAt: '2 ngày trước',
    readTime: '13 phút đọc',
    likes: 91,
    comments: 12,
    image: articleImg('topik-desk.jpg'),
    icon: faWallet,
    excerpt:
      'Bảng chi tiêu mẫu theo won, so sánh Seoul–Busan–Daegu và cách quản lý ví khi du học hoặc đi làm part-time.',
    body: [
      {
        type: 'p',
        text: '“Ở Hàn tốn bao nhiêu một tháng?” — câu hỏi ai cũng hỏi, nhưng câu trả lời phụ thuộc thành phố, loại nhà và thói quen ăn uống. Dưới đây là mức tham khảo thực tế (won, chưa quy đổi), giúp bạn lập ngân sách trước khi sang.',
      },
      {
        type: 'emphasis',
        text: 'Mẫu ngân sách sinh viên tiết kiệm tại Seoul: 900.000–1.300.000 won/tháng (ký túc xá + ăn uống cơ bản + đi lại). Oneroom + ăn ngoài nhiều: 1.500.000–2.000.000 won/tháng.',
      },
      {
        type: 'p',
        text: 'Chi tiết từng khoản:',
      },
      {
        type: 'list',
        items: [
          'Nhà ở: ký túc xá 150.000–400.000 won; gosiwon 250.000–450.000 won; oneroom 500.000–900.000 won + cọc 3–10 triệu won (hoàn khi trả phòng).',
          'Ăn uống: căng tin trường 4.000–6.500 won/bữa; kimbap/cơm hộp 3.000–5.000 won; ăn ngoài trung bình 8.000–15.000 won/bữa; cà phê 4.000–6.000 won.',
          'Đi lại: vé cơ bản tàu/xe buýt 1.400 won (2024); đi 2 chiều/ngày × 22 ngày ≈ 60.000 won. Vé tháng sinh viên giảm 30% nếu trường đăng ký.',
          'Điện thoại: gói data 30.000–45.000 won/tháng (LG U+, SKT, KT). eSIM du lịch rẻ hơn nhưng không dùng lâu dài.',
          'Điện nước gas: mùa đông ondol có thể 80.000–150.000 won/tháng phòng nhỏ; mùa xuân–thu 30.000–60.000 won.',
          'Giải trí: phim CGV 12.000–16.000 won; noraebang 1 giờ 15.000–25.000 won/người; mua sắm quần áo fast fashion 20.000–50.000 won/món.',
        ],
      },
      {
        type: 'p',
        text: 'So sánh nhanh giữa các thành phố (sinh viên, mức trung bình):',
      },
      {
        type: 'list',
        items: [
          'Seoul (Hongdae, Sinchon, Kondae): đắt nhất — nhà và ăn uống cao hơn 15–25% so với vùng khác.',
          'Busan, Incheon: rẻ hơn Seoul khoảng 10–20%; đi biển cuối tuần không tốn vé máy bay.',
          'Daegu, Daejeon, Gwangju: chi phí thấp hơn rõ; phù hợp ngân sách eo hẹp, ít cám dỗ mua sắm.',
        ],
      },
      {
        type: 'image',
        src: articleImg('food-table.jpg'),
        caption: 'Ăn chung món (나눠 먹기) — một phần lẩu hoặc gà rán chia 2–3 người thường rẻ hơn gọi riêng.',
        alt: 'Bàn ăn với nhiều món Hàn Quốc',
      },
      {
        type: 'p',
        text: 'Cách quản lý tiền hiệu quả:',
      },
      {
        type: 'list',
        items: [
          'Quy tắc 50/30/20: 50% chi cố định (nhà, điện, điện thoại), 30% sinh hoạt (ăn, đi lại), 20% tiết kiệm/khẩn cấp.',
          'Dùng app Toss hoặc KakaoBank để xem biểu đồ chi tiêu tự động; ghi chép thủ công 2 tuần đầu để nhận ra thói quen.',
          'Mua đồ tiêu dùng qua Coupang Rocket (giao nhanh), đồ second-hand qua Karrot (당근) khi cần nồi, quạt, sách.',
          'Part-time hợp pháp (visa D-2): tối đa 20–25 giờ/tuần trong học kỳ; lương tối thiểu 2024 khoảng 9.860 won/giờ — làm 15 giờ/tuần ≈ 590.000 won/tháng trước thuế.',
        ],
      },
      {
        type: 'emphasis',
        text: 'Luôn giữ quỹ khẩn cấp ít nhất 1–2 tháng chi phí cố định (1,5–3 triệu won). Đừng dùng hết tiền cọc nhà để chi tiêu hàng ngày.',
      },
      {
        type: 'p',
        text: 'Mẹo tiết kiệm thực tế: ăn sáng tại CU hoặc GS25 (bánh mì kẹp và sữa khoảng 3.500 won); nấu cơm nhà cuối tuần để ăn dần trong tuần; tải app Happy Point hoặc L.Point để tích điểm siêu thị; mua rau giảm giá cuối ngày tại Emart (thường từ 20h đến 22h). Sinh viên mang thẻ trường được giảm vé bảo tàng, rạp chiếu phim và một số nhà hàng.',
      },
    ],
  },
  {
    id: 12,
    title: 'Cuộc sống làm việc tại Hàn: giờ giấc, hội họp và cân bằng',
    topic: 'culture',
    author: 'Lan Anh',
    authorUrl: 'https://tienghancohuyen.vn/author/lan-anh',
    avatar: avatarImg(20),
    verified: true,
    publishedAt: '1 ngày trước',
    readTime: '15 phút đọc',
    likes: 58,
    comments: 7,
    image: articleImg('culture-office.jpg'),
    icon: faBriefcase,
    excerpt:
      'Giờ giấc, kính ngữ, họp hành, 회식 và quyền lợi lao động — hướng dẫn cụ thể cho người Việt mới vào công ty Hàn.',
    body: [
      {
        type: 'p',
        text: 'Làm việc tại Hàn Quốc không chỉ cần chuyên môn — bạn cần hiểu cách giao tiếp, phân cấp và “không khí văn phòng”. Nhiều người Việt giỏi nghề nhưng gặp khó vì chưa quen văn hóa tập thể và kính ngữ. Bài viết này tổng hợp kinh nghiệm thực tế từ môi trường startup đến tập đoàn lớn.',
      },
      {
        type: 'p',
        text: 'Một ngày làm việc điển hình (văn phòng truyền thống):',
      },
      {
        type: 'list',
        items: [
          '08:30–09:00: Đến sớm hoặc đúng giờ; chào hỏi đồng nghiệp (안녕하세요). Một số công ty có họp nhanh 10 phút đầu ngày.',
          '09:00–12:00: Xử lý email, công việc chính. Email mở đầu thường: 안녕하세요, [tên team] [tên]입니다 — kết thúc: 감사합니다.',
          '12:00–13:00: Giờ ăn trưa — đi cùng team đến căng tin hoặc quán gần công ty (8.000–12.000 won). Đây là lúc làm quen tự nhiên nhất.',
          '13:00–18:00: Họp, báo cáo tiến độ. Trước tan ca, gửi tóm tắt công việc ngày qua email hoặc Slack/KakaoWork nếu công ty dùng.',
          'Sau 18h: Một số team ở lại overtime; startup thường linh hoạt hơn tập đoàn. Hỏi HR chính sách overtime pay (통상임금 150% cho giờ thêm, theo luật lao động).',
        ],
      },
      {
        type: 'p',
        text: 'Hệ thống xưng hô và kính ngữ cơ bản:',
      },
      {
        type: 'list',
        items: [
          '선배 (seonbae) / 후배 (hubae): người vào trước / sau — không nhất thiết theo tuổi, mà theo thâm niên công ty hoặc trường.',
          '팀장 (timjang): trưởng nhóm — xưng hô và dùng kính ngữ (-요/-습니다), tránh gọi thẳng tên trừ khi được mời.',
          '사장님 / 부장님 / 과장님: giám đốc / phó / trưởng phòng — thêm 님 thể hiện tôn trọng.',
          'Câu hỏi ý kiến lịch sự: ~어떻게 생각하세요? (anh/chị nghĩ sao?), ~괜찮을까요? (như vậy được không?).',
          'Xin lỗi khi trễ hạn: 죄송합니다, ~때문에 늦어졌습니다 (xin lỗi, vì … nên bị trễ).',
        ],
      },
      {
        type: 'image',
        src: articleImg('culture-meeting.jpg'),
        caption: 'Trong họp: ghi chú việc cần làm, người phụ trách và thời hạn trước khi rời phòng.',
        alt: 'Đồng nghiệp họp trong văn phòng',
      },
      {
        type: 'p',
        text: 'Văn hóa họp và báo cáo:',
      },
      {
        type: 'list',
        items: [
          'Chuẩn bị trước: đọc tài liệu họp, liệt kê 2–3 ý muốn hỏi hoặc đề xuất — im lặng suốt có thể bị hiểu là thiếu quan tâm.',
          'Trình bày ngắn: nêu kết quả trước, sau đó chỉ ra vấn đề, đưa đề xuất và hỏi rõ cần hỗ trợ gì. Tránh lan man quá 5 phút nếu không phải người trình bày chính.',
          'Ghi biên bản: ai làm gì, hạn khi nào. Gửi recap qua email trong 24h — thói quen này được đánh giá rất cao.',
        ],
      },
      {
        type: 'emphasis',
        text: '회식 (hoesik — tiệc công ty): không bắt buộc uống say. Có thể nói: 저는 술을 잘 못 마셔서요, 대신 음료수로 할게요 (em/anh uống rượu kém, uống nước ngọt thay). Có mặt và trò chuyện quan trọng hơn lượng rượu.',
      },
      {
        type: 'p',
        text: 'Kênh liên lạc: email cho việc chính thức (hợp đồng, báo cáo); KakaoTalk cho trao đổi nhanh nội bộ — tránh nhắn việc riêng sau 22h. Slack, KakaoWork hoặc Teams tùy công ty. Tin nhắn “đã đọc nhưng chưa trả lời” (읽씹) là bình thường; nhắn lại lịch sự nếu việc khẩn cấp.',
      },
      {
        type: 'p',
        text: 'Quyền lợi và visa: người lao động nước ngoài trên visa E-7, F-2, F-4… được hưởng bảo hiểm lao động (4 loại), nghỉ phép năm theo hợp đồng. Sinh viên D-2 làm part-time cần giấy phép từ trường + Immigration. Khi nghỉ việc: thông báo trước theo hợp đồng (thường 1 tháng), bàn giao công việc và lấy chứng nhận nghỉ việc (퇴직증명서) cho công ty sau.',
      },
      {
        type: 'p',
        text: 'Giữ cân bằng: cuối tuần tắt thông báo công việc nếu không phải ca trực; đi dạo công viên, leo núi (북한산, 관악산 gần Seoul), hoặc tham gia câu lạc bộ. Kiệt sức ở người nước ngoài thường đến từ kỳ vọng “phải chứng minh mình” — hãy đặt ranh giới sớm và trao đổi thẳng với quản lý khi quá tải.',
      },
    ],
  },
  {
    id: 13,
    title: 'Tìm nhà, đi lại và sinh hoạt hàng ngày ở Hàn Quốc',
    topic: 'culture',
    author: 'Ngọc Mai',
    authorUrl: 'https://tienghancohuyen.vn/author/ngoc-mai',
    avatar: avatarImg(28),
    verified: true,
    publishedAt: '12 giờ trước',
    readTime: '14 phút đọc',
    likes: 44,
    comments: 4,
    image: articleImg('hangul-street.jpg'),
    icon: faTrain,
    excerpt:
      'Hướng dẫn thuê nhà (wolse/bojeung), đi tàu điện, siêu thị, phân loại rác và app cần cài — sinh hoạt tự lập từ A đến Z.',
    body: [
      {
        type: 'p',
        text: 'Sang Hàn, việc “sống được” hàng ngày quan trọng không kém học tập: biết đi tàu, mua đồ, giặt quần áo, trả tiền điện. Phần lớn sinh viên Việt mất 2–3 tuần mới quen — bài này rút gọn quy trình để bạn tiết kiệm thời gian.',
      },
      {
        type: 'p',
        text: 'Thuê nhà — thuật ngữ cần biết:',
      },
      {
        type: 'list',
        items: [
          'Wolse (월세): tiền thuê hàng tháng — phổ biến nhất với sinh viên và người trẻ.',
          'Bojeung (보증금): tiền cọc — thường 3–10 triệu won phòng nhỏ; hoàn khi trả phòng nếu không hư hỏng.',
          'Jeonse (전세): trả một khoản lớn một lần, ở 2 năm không trả thêm — ít gặp với du học sinh.',
          'Gọi qua app: Zigbang, Dabang — lọc theo ga tàu, giá, có nội thất (풀옵션). Xem phòng trực tiếp, chụp ảnh tường/sàn trước khi ký.',
        ],
      },
      {
        type: 'p',
        text: 'Giao thông công cộng — cách dùng thực tế:',
      },
      {
        type: 'list',
        items: [
          'Tải Naver Map hoặc KakaoMap — chính xác hơn Google Maps tại Hàn. Chọn “대중교통” để xem tuyến tàu + xe buýt + thời gian.',
          'Thẻ T-Money/Cashbee: mua tại ga, CU, GS25; nạp tối thiểu 1.000 won. Chạm khi lên và xuống tàu/xe buýt — thiếu chạm xuống bị tính phí tối đa.',
          'Chuyển tuyến: trong vòng 30 phút (tàu) hoặc 30 phút (từ xe buýt sang tàu) được giảm phí chuyển tiếp — kiểm tra trên màn hình cổng.',
          'Giờ hoạt động: tàu điện metro thường 05:30–24:00; cuối tuần chạy muộn hơn 30–60 phút. Bus đêm (심야버스) ở Seoul có tuyến riêng.',
          'Taxi: cờ vàng/ cam — phí mở cửa ~4.800 won; app Kakao T gọi xe, tránh taxi “đen” ở sân bay.',
        ],
      },
      {
        type: 'image',
        src: articleImg('hangul-city.jpg'),
        caption: 'Chọn nhà trong bán kính 10 phút đi bộ tới ga — tiết kiệm 30–60 phút mỗi ngày.',
        alt: 'Cảnh đô thị Hàn Quốc',
      },
      {
        type: 'p',
        text: 'Mua sắm và ăn uống hàng ngày:',
      },
      {
        type: 'list',
        items: [
          'Siêu thị lớn: Emart, Lotte Mart, Homeplus — đồ đa dạng, khuyến mãi cuối tuần. Emart24/Lotte Mart ở ga tiện nhưng đắt hơn.',
          'Cửa hàng tiện lợi: CU, GS25, 7-Eleven — cơm hộp, mì, trứng luộc 2.000–5.000 won; nhiều chỗ có bàn ăn nhỏ.',
          'Chợ truyền thống (시장): Namdaemun, Gwangjang (Seoul) — rau củ, hải sản sáng sớm rẻ hơn siêu thị 10–20%.',
          'Giặt ủi: tiệm coin laundry (코인빨래방) 4.000–6.000 won/máy giặt + 3.000 won/máy sấy; mang thẻ T-Money hoặc tiền xu.',
        ],
      },
      {
        type: 'emphasis',
        text: 'Phân loại rác (쓰레기): vứt sai có thể bị phạt 100.000 won trở lên. Rác thường (일반), tái chế (재활용 — PET, lon, giấy phải rửa sạch), rác thực phẩm (음식물), rác cồng kềnh (대형). Mua túi rác đúng màu/quy cách quận bạn ở.',
      },
      {
        type: 'p',
        text: 'Điện nước gas: hóa đơn gửi qua app hoặc dán cửa. Ondol (sưởi sàn) mùa đông tốn điện — đặt 20–22°C, tắt khi đi học cả ngày. Mùa hè máy lạch 26°C tiết kiệm hơn 18°C. Nước nóng (가스) dùng shower 5–8 phút thay vì 20 phút.',
      },
      {
        type: 'p',
        text: 'App nên cài ngay: Naver Map, KakaoTalk (nhắn tin), Papago (dịch), Baemin/Yogiyo (giao đồ ăn), Coupang (mua đồ), Korail Talk (vé tàu liễn tỉnh), Hi Korea (thủ tục visa). Sinh viên đăng ký thẻ giảm giá tàu điện tại phòng quốc tế trường — tiết kiệm ~30%.',
      },
    ],
  },
  {
    id: 14,
    title: 'Kết bạn, cộng đồng và hòa nhập văn hóa Hàn',
    topic: 'culture',
    author: 'Hàn Talk',
    authorUrl: 'https://tienghancohuyen.vn/author/han-talk',
    avatar: avatarImg(25),
    verified: false,
    publishedAt: '6 giờ trước',
    readTime: '12 phút đọc',
    likes: 36,
    comments: 5,
    image: articleImg('speaking-group.jpg'),
    icon: faUsers,
    excerpt:
      'Câu lạc bộ trường, hội sinh viên Việt, language exchange và văn hóa đồng trang lứa — cách kết bạn bền vững tại Hàn.',
    body: [
      {
        type: 'p',
        text: 'Cô đơn là trải nghiệm phổ biến năm đầu du học — đặc biệt khi tiếng Hàn chưa đủ để trò chuyện sâu. Bạn không cần “hòa nhập 100%” ngay; hãy xây dần vòng tròn quan hệ: 1–2 bạn thân, vài bạn học, cộng đồng người Việt để hỗ trợ thủ tục.',
      },
      {
        type: 'p',
        text: 'Kênh kết bạn cụ thể:',
      },
      {
        type: 'list',
        items: [
          '동아리 (câu lạc bộ trường): đăng ký tuần orientation — thể thao (축구, 배드minton), âm nhạc, tình nguyện (봉사). Hoạt động đều đặn 1–2 buổi/tuần, tự nhiên tạo bạn bè cùng sở thích.',
          'Language exchange: app HelloTalk, Tandem; fanpage trường đăng tìm bạn đổi ngôn ngữ. Quy ước: 30 phút tiếng Hàn + 30 phút tiếng Việt/Anh, gặp quán cà phê công cộng.',
          'Hội sinh viên Việt Nam (VSA): mỗi thành phố lớn có hội — hỗ trợ đón sân bay, sim, mua đồ cũ, review trọ. Facebook/Zalo group “Du học sinh Việt tại [tên thành phố]”.',
          'International Office trường: buddy program — sinh viên Hàn đồng hành 1 kỳ, giới thiệu campus và văn hóa.',
          'Meetup, InterNations: sự kiện gặp gỡ người nước ngoài — phù hợp người đi làm hoặc trao đổi ngắn hạn.',
        ],
      },
      {
        type: 'image',
        src: articleImg('speaking-cafe.jpg'),
        caption: 'Quán cà phê (카페) là không gian quen thuộc để học nhóm, hẹn language exchange hoặc làm bài.',
        alt: 'Hai người trò chuyện trong quán cà phê',
      },
      {
        type: 'p',
        text: 'Văn hóa quan hệ ở Hàn — điều nên biết:',
      },
      {
        type: 'list',
        items: [
          'Tuổi và thứ bậc: hỏi năm sinh (몇 년생이에요?) để xác định ai là hyung/noona/oppa/unni — ảnh hưởng cách xưng hô.',
          'Tặng quà nhỏ khi được giúp: cà phê, snack — không cần đắt, nhưng thể hiện lễ phép.',
          'Không gian cá nhân: hỏi trước khi chụp ảnh, đặt lịch hẹn thay vì “drop by” đột xuất.',
          'Tránh so sánh công khai người Hàn với phim Hàn — nhiều bạn bản địa thích được hỏi về cuộc sống thật hơn drama.',
        ],
      },
      {
        type: 'emphasis',
        text: 'Cân bằng cộng đồng Việt và bạn bản địa: tuần đầu có thể ở gần người Việt để ổn định; từ tháng 2 trở đi, cố gắng 1 hoạt động/tuần toàn tiếng Hàn (câu lạc bộ, lớp nấu ăn, volunteer).',
      },
      {
        type: 'p',
        text: 'Sức khỏe tinh thần: nhớ nhà, áp lực TOPIK, cô lập vì ngôn ngữ — đều là chuyện bình thường. Trung tâm tư vấn sinh viên quốc tế thường miễn phí; đường dây 129 (청소년 전화) hoặc đường dây khủng hoảng sức khỏe tâm thần 1577-0199. Nói chuyện sớm tốt hơn im lặng đến khi kiệt sức.',
      },
      {
        type: 'p',
        text: 'Lễ hội trải nghiệm văn hóa: cherry blossom (4월), festival đèn (불꽃축제), Chuseok/Tết Trung thu Hàn (추석), đi chợ đêm. Tham gia một lễ hội địa phương — mặc hanbok thuê 10.000–20.000 won — là cách học văn hóa và chụp ảnh đáng nhớ.',
      },
      {
        type: 'p',
        text: 'Thói quen học tiếng qua bạn bè: mỗi tuần học 5 cụm từ từ chat Kakao thật (ㅋㅋ = cười, ㅠㅠ = buồn). Ghi vào sổ và dùng lại — ví dụ: 약속 있어요 (có hẹn), 지금 어디야? (đang ở đâu?). Học slang qua bạn trẻ nhưng dùng kính ngữ với giáo viên và người lớn.',
      },
    ],
  },
  {
    id: 15,
    title: 'Ẩm thực và lối sống Hàn: từ street food đến bữa cơm gia đình',
    topic: 'culture',
    author: 'Foodie KR',
    authorUrl: 'https://tienghancohuyen.vn/author/foodie-kr',
    avatar: avatarImg(32),
    verified: false,
    publishedAt: 'Vừa xong',
    readTime: '13 phút đọc',
    likes: 29,
    comments: 3,
    image: articleImg('food-korean.jpg'),
    icon: faUtensils,
    excerpt:
      'Món ăn đường phố, quy tắc bàn ăn, cách gọi món và văn hóa 회식 — ẩm thực Hàn từ A đến Z cho người mới sang.',
    body: [
      {
        type: 'p',
        text: 'Ẩm thực Hàn là cánh cửa vào văn hóa: cách chia sẻ món, thứ tự ăn, nghi thức rót rượu đều có ý nghĩa. Hiểu rõ giúp bạn tự tin gọi món, không ngại ăn một mình (혼밥) và hòa nhập bữa ăn công ty.',
      },
      {
        type: 'p',
        text: 'Món ăn phổ biến và mức giá tham khảo:',
      },
      {
        type: 'list',
        items: [
          'Kimchi jjigae / doenjang jjigae (lẩu kimchi / tương): 7.000–9.000 won — cơm kèm, no bữa trưa.',
          'Bibimbap (cơm trộn): 8.000–11.000 won; dolsot bibimbap (nồi đất) đắt hơn 2.000 won.',
          'Samgyeopsal / bulgogi (nướng): 12.000–18.000 won/người — thường ăn 2 người trở lên, nhiều rau.',
          'Tteokbokki (bánh gạo cay): 3.000–5.000 won phần nhỏ; kimbap 2.500–4.000 won/cuộn.',
          'Street food: hotteok (bánh ngọt) 1.000–2.000 won; odeng (chả cá xiên) 500–1.000 won/xiên.',
          'Delivery: jajangmyeon (mì đen) 6.000–8.000 won; fried chicken 18.000–25.000 won/con — đủ 2–3 người.',
        ],
      },
      {
        type: 'p',
        text: 'Cách gọi món và câu dùng tại quán:',
      },
      {
        type: 'list',
        items: [
          'Vào quán: 몇 명이에요? (mấy người?) — trả lời: 두 명이에요 (2 người).',
          'Gọi món: 이거 주세요 (cho tôi cái này); không cay: 안 맵게 해 주세요.',
          'Thêm cơm/rau: 밥 더 주세요 / 반찬 더 주세요 (thêm cơm / thêm side dish).',
          'Thanh toán: 계산해 주세요 hoặc 카드로 할게요 (trả bằng thẻ).',
          'Sau ăn: 잘 먹었습니다 (em/anh ăn ngon) — lịch sự, được đánh giá cao.',
        ],
      },
      {
        type: 'image',
        src: articleImg('food-table.jpg'),
        caption: 'Bàn ăn Hàn: cơm, canh, và nhiều bát 반찬 (banchan) — ăn thử từng loại, có thể xin thêm miễn phí.',
        alt: 'Bàn tiệc ẩm thực Hàn Quốc',
      },
      {
        type: 'p',
        text: 'Quy tắc bàn ăn và uống rượu:',
      },
      {
        type: 'list',
        items: [
          'Người trẻ rót nước/rượu cho người lớn tuổi trước; quay mặt đi khi uống cùng cấp trên.',
          'Không cắm đũa thẳng vào bát cơm (giống nghi lễ cúng); không gắp đũa chọn món lâu.',
          'Ăn cơm giữ bát sát miệng được coi là bình thường, không thô lỗ như phương Tây.',
          'Soju + beer = somaek (소맥) — phổ biến ở 회식; uống chậm, ăn nhẹ kèm theo.',
        ],
      },
      {
        type: 'emphasis',
        text: '혼밥 (honbab — ăn một mình): hoàn toàn bình thường. Chuỗi Baekban, Kimbap Cheonguk, Sukiya có chỗ 1 người; không cần ngại vào quán đông.',
      },
      {
        type: 'p',
        text: 'Tự nấu tiết kiệm: mua tại chợ Mapo, Namdaemun sáng sớm (7–9h) rẻ nhất. “Tam giác” gia vị: gochujang (ớt), doenjang (tương), ganjang (nước tương). Món dễ: kimchi fried rice, gyeran jjim (trứng hấp), ramyeon + trứng + rau. Nồi cơm điện mini 30.000–50.000 won tại Daiso hoặc Coupang.',
      },
      {
        type: 'p',
        text: 'Lối sống gắn ẩm thực: bữa sáng nhẹ (10h trước), trưa chính (12–13h), tối muộn hơn Việt (18–20h). Cuối tuần brunch quán cà phê 12.000–18.000 won. Sau giờ làm, đồng nghiệp rủ “한 잔” — tham gia vài lần để gắn kết, không áp lực uống hết chai.',
      },
    ],
  },
  {
    id: 16,
    title: 'Top trường đại học học phí hợp lý tại Hàn Quốc cho người Việt',
    topic: 'culture',
    author: 'Thu Trang',
    authorUrl: 'https://tienghancohuyen.vn/author/thu-trang',
    avatar: avatarImg(12),
    verified: true,
    publishedAt: 'Vừa xong',
    readTime: '16 phút đọc',
    likes: 112,
    comments: 18,
    image: articleImg('hangul-city.jpg'),
    icon: faGraduationCap,
    excerpt:
      'Danh sách trường quốc lập & tư thục có học phí và học bổng tốt, kèm mức phí tham khảo và lưu ý khi chọn trường.',
    body: [
      {
        type: 'p',
        text: '“Học phí tốt” không chỉ là rẻ — mà là cân bằng giữa chi phí, chất lượng đào tạo, học bổng cho sinh viên quốc tế và cơ hội việc làm sau tốt nghiệp. Dưới đây là các nhóm trường phổ biến với du học sinh Việt, kèm mức học phí tham khảo (won/học kỳ, chương trình đại học, 2024–2025).',
      },
      {
        type: 'emphasis',
        text: 'Trường quốc lập (국립) vùng tỉnh thường rẻ nhất: 1,8–3,5 triệu won/học kỳ. Trường tư ở Seoul: 4–8 triệu won/học kỳ. Luôn kiểm tra học phí mới nhất trên website trường.',
      },
      {
        type: 'p',
        text: 'Nhóm 1 — Trường quốc lập vùng (học phí thấp, sinh hoạt rẻ):',
      },
      {
        type: 'list',
        items: [
          'Đại học Quốc gia Chonnam (전남대, Gwangju): ~2,0–2,8 triệu won/học kỳ — nhiều người Việt, chi phí ăn ở thấp hơn Seoul 20–30%.',
          'Đại học Quốc gia Pusan (부산대, Busan): ~2,2–3,0 triệu won/học kỳ — trường top vùng, gần biển, phù hợp ngành kỹ thuật, kinh tế.',
          'Đại học Quốc gia Chungnam (충남대, Daejeon): ~2,0–2,9 triệu won/học kỳ — thành phố khoa học, ít đông đúc hơn Seoul.',
          'Đại học Quốc gia Jeonbuk (전북대, Jeonju): ~1,9–2,7 triệu won/học kỳ — văn hóa ẩm thực nổi tiếng, học phí cạnh tranh.',
          'Đại học Quốc gia Kangwon (강원대): ~1,8–2,6 triệu won/học kỳ — môi trường thiên nhiên, phù hợp du học sinh thích yên tĩnh.',
        ],
      },
      {
        type: 'p',
        text: 'Nhóm 2 — Trường quốc lập/ công lập lớn (uy tín cao, học phí vừa phải):',
      },
      {
        type: 'list',
        items: [
          'Đại học Quốc gia Seoul (서울대, SNU): ~2,4–4,0 triệu won/học kỳ — top 1 Hàn, cạnh tranh khốc liệt, học bổng GKS và học bổng trường hấp dẫn.',
          'Đại học Quốc gia Seoul (서울시립대): ~2,5–3,5 triệu won/học kỳ — ở Seoul nhưng học phí quốc lập, ít đắt hơn tư thục.',
          'Đại học Incheon (인천대): ~2,3–3,2 triệu won/học kỳ — gần sân bay, phí sinh hoạt thấp hơn trung tâm Seoul.',
        ],
      },
      {
        type: 'image',
        src: articleImg('topik-desk.jpg'),
        caption: 'Học phí chỉ là một phần — hãy tính thêm nhà ở, bảo hiểm, sách vở và chi phí xin visa khi so sánh trường.',
        alt: 'Bàn học và sách giáo trình',
      },
      {
        type: 'p',
        text: 'Nhóm 3 — Trường tư thục có học bổng nhập học mạnh (học phí cao hơn nhưng có thể giảm 30–100%):',
      },
      {
        type: 'list',
        items: [
          'Đại học Kyung Hee (경희대): học phí ~4,5–7 triệu won/học kỳ — học bổng TOPIK 3–6 giảm 30–70% phổ biến.',
          'Đại học Chung-Ang (중앙대): ~5–7,5 triệu won/học kỳ — mạnh ngành truyền thông, nghệ thuật; học bổng theo kỳ đầu.',
          'Đại học Hankuk ngoại ngữ (HUFS): ~4–6,5 triệu won/học kỳ — phù hợp ngành ngôn ngữ, quan hệ quốc tế.',
          'Đại học Soongsil (숭실대): ~3,8–5,5 triệu won/học kỳ — IT, kinh doanh; học bổng nhập học cho sinh viên quốc tế tương đối dễ xin.',
        ],
      },
      {
        type: 'emphasis',
        text: 'Cách chọn trường “đáng tiền”: tính tổng học phí và tiền nhà ở tại thành phố đó; xem tỷ lệ sinh viên quốc tế thực sự nhận được học bổng; kiểm tra ngành học có cơ hội thực tập và xin visa làm việc E-7 sau tốt nghiệp hay không.',
      },
      {
        type: 'p',
        text: 'Lưu ý khi nghe tư vấn viên: “học phí 100% miễn” thường gắn điều kiện GPA (điểm trung bình) mỗi học kỳ — nếu dưới 3.0/4.5 có thể mất học bổng. Hỏi rõ điều kiện duy trì, phí nhập học một lần (입학금, 500.000–1.000.000 won), và phí đăng ký môn.',
      },
      {
        type: 'p',
        text: 'Nguồn tra cứu chính thức: Study in Korea (studyinkorea.go.kr), mục tuyển sinh quốc tế trên website từng trường, và cổng nộp hồ sơ trực tuyến (nhiều trường dùng Uway, Jinhak). Nên nộp 3–5 trường ở các mức: một trường mơ ước, hai trường vừa sức, một đến hai trường an toàn.',
      },
    ],
  },
  {
    id: 17,
    title: 'Quy trình du học đại học Hàn Quốc: từ chọn trường đến nhập học',
    topic: 'other',
    author: 'Lan Anh',
    authorUrl: 'https://tienghancohuyen.vn/author/lan-anh',
    avatar: avatarImg(20),
    verified: true,
    publishedAt: 'Vừa xong',
    readTime: '15 phút đọc',
    likes: 89,
    comments: 14,
    image: articleImg('topik-plan.jpg'),
    icon: faBullseye,
    excerpt:
      'Lộ trình 12–18 tháng, hồ sơ cần chuẩn bị, visa D-2 và những sai lầm thường gặp khi nộp hồ sơ du học đại học Hàn.',
    body: [
      {
        type: 'p',
        text: 'Du học đại học Hàn Quốc (visa D-2) là con đường phổ biến nhất với sinh viên Việt. Quy trình dài 12–18 tháng nếu tính từ lúc học tiếng Hàn đến khi bay — chia nhỏ từng giai đoạn giúp bạn không bỏ sót hạn chót.',
      },
      {
        type: 'p',
        text: 'Timeline chuẩn (nhập học tháng 3 hoặc 9):',
      },
      {
        type: 'list',
        items: [
          'Từ 18 đến 12 tháng trước khi bay: Học tiếng Hàn cơ bản, thi TOPIK (mục tiêu TOPIK 3 trở lên cho đại học; trường top thường yêu cầu TOPIK 4–5). Chuẩn bị học bạ, bảng điểm THPT.',
          'Từ 12 đến 9 tháng trước khi bay: Chọn ngành và 3–5 trường; dịch công chứng học bạ, bằng tốt nghiệp; viết kế hoạch học tập (study plan) dài 1–2 trang.',
          'Từ 9 đến 6 tháng trước khi bay: Nộp hồ sơ trực tuyến (kỳ tháng 3: hạn chót thường 9–11 tháng trước; kỳ tháng 9: hạn chót 3–5 tháng trước). Nộp phí xét hồ sơ 50.000–150.000 won mỗi trường.',
          'Từ 6 đến 4 tháng trước khi bay: Phỏng vấn (trực tuyến hoặc trực tiếp), nhận giấy nhập học. Đóng học phí kỳ đầu hoặc đặt cọc theo yêu cầu trường.',
          'Từ 4 đến 2 tháng trước khi bay: Xin visa D-2 tại Đại sứ quán hoặc Lãnh sự quán Hàn tại Việt Nam. Hồ sơ gồm hộ chiếu, giấy nhập học, chứng minh tài chính, sổ tiết kiệm hoặc giấy bảo lãnh.',
          '1 tháng trước khi bay: Đặt vé máy bay, mua bảo hiểm du lịch, sắp xếp chỗ ở, tham gia buổi định hướng trước khi xuất cảnh.',
        ],
      },
      {
        type: 'image',
        src: articleImg('vocab-study.jpg'),
        caption: 'Kế hoạch học tập (study plan) viết rõ mục tiêu ngành, vì sao chọn Hàn, và dự định sau tốt nghiệp — giảng viên xét rất kỹ.',
        alt: 'Sách và tài liệu học tập',
      },
      {
        type: 'p',
        text: 'Hồ sơ thường cần:',
      },
      {
        type: 'list',
        items: [
          'Đơn đăng ký (form trường), ảnh thẻ 3.5×4.5 cm',
          'Học bạ THPT + bằng tốt nghiệp (bản dịch công chứng tiếng Anh hoặc Hàn)',
          'Giấy chứng nhận TOPIK hoặc chứng chỉ hoàn thành chương trình tiếng Hàn (nếu học viện ngôn ngữ trước)',
          'Study plan / Personal statement',
          'Giấy khai sinh, hộ chiếu (còn hạn 6 tháng+)',
          'Giấy chứng minh tài chính: sổ tiết kiệm ~10.000–20.000 USD (tùy trường/thành phố) hoặc bảo lãnh',
          'Giấy khám sức khỏe (một số trường yêu cầu)',
        ],
      },
      {
        type: 'emphasis',
        text: 'Hai con đường phổ biến: (A) Thi TOPIK tại Việt Nam rồi nộp hồ sơ thẳng vào đại học. (B) Sang học viện ngôn ngữ 6–12 tháng (visa D-4), thi TOPIK tại Hàn, sau đó chuyển sang visa D-2. Lộ trình B phù hợp khi trình độ tiếng còn yếu.',
      },
      {
        type: 'p',
        text: 'Visa D-2: cấp theo thời hạn nhập học (thường 1–2 năm, gia hạn tại Immigration). Sau nhập cảnh phải đăng ký ARC trong 90 ngày. Làm thêm: tối đa 20 giờ/tuần trong học kỳ (cần giấy phép từ trường), 40 giờ/tuần trong kỳ nghỉ.',
      },
      {
        type: 'p',
        text: 'Sai lầm thường gặp: chọn trường chỉ vì học phí rẻ mà không xem ngành yếu; nộp hồ sơ thiếu dịch thuật công chứng; sổ tiết kiệm không đủ thời gian “đóng băng”; copy study plan chung chung; bỏ qua email trường sau khi nhận admission. Kiểm tra hộp thư (kể cả spam) mỗi ngày trong mùa apply.',
      },
    ],
  },
  {
    id: 18,
    title: 'Cuộc sống sinh viên đại học Hàn: một học kỳ thực tế',
    topic: 'culture',
    author: 'Ngọc Mai',
    authorUrl: 'https://tienghancohuyen.vn/author/ngoc-mai',
    avatar: avatarImg(28),
    verified: true,
    publishedAt: 'Vừa xong',
    readTime: '14 phút đọc',
    likes: 67,
    comments: 11,
    image: articleImg('speaking-group.jpg'),
    icon: faUsers,
    excerpt:
      'Lịch học, thư viện, MT, kỳ thi giữa kỳ/cuối kỳ và cách cân bằng học – làm thêm – sinh hoạt tại campus Hàn.',
    body: [
      {
        type: 'p',
        text: 'Đại học Hàn không giống phim: có tuần ôn thi căng thẳng, có đêm ngủ thư viện, cũng có lễ hội trường và chuyến du ngoại tập thể (MT). Hiểu nhịp một học kỳ (16 tuần) giúp bạn chuẩn bị tâm lý và quản lý thời gian.',
      },
      {
        type: 'p',
        text: 'Cấu trúc một học kỳ (semester):',
      },
      {
        type: 'list',
        items: [
          'Tuần 1–2: Đăng ký môn (수강신청) trực tuyến — tranh suất môn hot lúc 9h sáng; đọc đề cương môn học (강의계획서) từng môn.',
          'Tuần 3–7: Học đều, bài tập nhóm đầu tiên, kiểm tra nhỏ. Tham gia buổi làm quen lớp (OT) và câu lạc bộ.',
          'Tuần 8: Thi giữa kỳ (중간고사) — thường 1 tuần, 2–4 môn; thư viện kín chỗ 22h.',
          'Tuần 9–15: Dự án, thuyết trình, báo cáo. Một số môn có thực địa hoặc lab.',
          'Tuần 16: Thi cuối kỳ (기말고사) — chiếm 40–60% điểm môn. Sau đó nghỉ 6–8 tuần (hè) hoặc 4 tuần (đông).',
        ],
      },
      {
        type: 'image',
        src: articleImg('grammar-notes.jpg'),
        caption: 'Thư viện campus mở đến 22h–24h trước kỳ thi — mang theo thẻ sinh viên, ổ cắm và chăn mỏng nếu học đêm.',
        alt: 'Sổ ghi chú và bút trên bàn học',
      },
      {
        type: 'p',
        text: 'Một ngày đi học điển hình:',
      },
      {
        type: 'list',
        items: [
          '08:00: Ăn sáng tại căng tin (3.000–5.000 won) hoặc kimbap mang đi.',
          '09:00–12:00: 2–3 tiết học (mỗi tiết 50 phút–1h15). Đi bộ giữa các tòa — campus có thể rộng 15–30 phút.',
          '12:00–13:00: Ăn trưa + trò chuyện bạn cùng lớp. Căng tin rẻ hơn quán ngoài cổng.',
          '13:00–17:00: Tiết chiều hoặc tự học thư viện. Office hour giáo viên để hỏi bài.',
          '18:00–22:00: Làm thêm part-time (nếu có), club, hoặc ôn TOPIK. Tối muộn về ký túc xá.',
        ],
      },
      {
        type: 'emphasis',
        text: 'Điểm danh (출석): nhiều môn yêu cầu trên 70–80% có mặt mới được thi. Vắng quá số buổi = trượt môn dù thi giỏi.',
      },
      {
        type: 'p',
        text: 'Hoạt động ngoài khóa đáng tham gia: lễ hội trường (대동제) mùa thu với ẩm thực và biểu diễn; chuyến du ngoại cuối tuần với lớp hoặc câu lạc bộ; tình nguyện quốc tế; cuộc thi thuyết trình tiếng Hàn cho sinh viên nước ngoài. Đây là nơi mở rộng quan hệ và luyện tiếng thực tế.',
      },
      {
        type: 'p',
        text: 'Cân bằng học và làm thêm: visa D-2 giới hạn 20 giờ/tuần trong học kỳ. Nhiều bạn làm quán ăn, cửa hàng tiện lợi, gia sư tiếng Việt/Anh (15.000–25.000 won/giờ). Đừng làm quá sức kỳ đầu — ưu tiên thích nghi và GPA ổn định để giữ học bổng.',
      },
    ],
  },
  {
    id: 19,
    title: 'Học bổng du học Hàn Quốc: GKS và học bổng trường cho người Việt',
    topic: 'other',
    author: 'Thu Trang',
    authorUrl: 'https://tienghancohuyen.vn/author/thu-trang',
    avatar: avatarImg(12),
    verified: true,
    publishedAt: 'Vừa xong',
    readTime: '13 phút đọc',
    likes: 145,
    comments: 22,
    image: articleImg('topik-desk.jpg'),
    icon: faWallet,
    excerpt:
      'GKS (KGSP), học bổng TOPIK, học bổng nhập học trường — điều kiện, mức hỗ trợ và cách tăng cơ hội trúng tuyển.',
    body: [
      {
        type: 'p',
        text: 'Học bổng có thể giảm 30–100% học phí và hỗ trợ sinh hoạt phí — nhưng mỗi loại có điều kiện khác nhau. Sinh viên Việt nên kết hợp nhiều nguồn: học bổng Chính phủ Hàn (GKS), học bổng trường, và học bổng theo thành tích sau nhập học.',
      },
      {
        type: 'p',
        text: '1. GKS — Korean Government Scholarship Program (Global Korea Scholarship):',
      },
      {
        type: 'list',
        items: [
          'Hỗ trợ: học phí 100%, vé máy bay khứ hồi, sinh hoạt phí ~1.000.000 won/tháng (bậc đại học), bảo hiểm, khóa tiếng Hàn 1 năm (nếu cần).',
          'Đối tượng: tốt nghiệp THPT hoặc đại học tùy track; thường dưới 25 tuổi (undergraduate).',
          'Hồ sơ: điểm học tập cao, kế hoạch học tập, thư giới thiệu; có chứng chỉ TOPIK thì lợi thế hơn (một số chương trình cho học tiếng trước).',
          'Kỳ nộp: thường 9–10 (qua Đại sứ quán) hoặc 2–3 (qua trường đối tác). Theo dõi trang NIIED và Đại sứ quán Hàn tại Hà Nội/TP.HCM.',
        ],
      },
      {
        type: 'p',
        text: '2. Học bổng nhập học theo TOPIK (phổ biến nhất với du học sinh tự túc):',
      },
      {
        type: 'list',
        items: [
          'TOPIK 3: giảm 30–40% học phí kỳ đầu',
          'TOPIK 4: giảm 40–50%',
          'TOPIK 5–6: giảm 50–70%, một số trường miễn 100% kỳ đầu',
          'Ví dụ thực tế: sinh viên nhập học Kyung Hee với TOPIK 5 có thể nhận 50% học phí + giảm phí nhập học — tiết kiệm 3–4 triệu won/năm.',
        ],
      },
      {
        type: 'image',
        src: articleImg('topik-plan.jpg'),
        caption: 'TOPIK càng cao, cơ hội nhận học bổng càng lớn — thi TOPIK trước khi nộp hồ sơ thường tiết kiệm chi phí hơn sang sớm học viện ngôn ngữ.',
        alt: 'Kế hoạch học và ghi chú trên bàn',
      },
      {
        type: 'p',
        text: '3. Học bổng duy trì theo GPA (sau nhập học):',
      },
      {
        type: 'list',
        items: [
          'GPA từ 3,5 trở lên (thang 4,5): miễn 50–100% học phí học kỳ sau',
          'GPA từ 3,0 đến 3,5: giảm 30–50%',
          'Dưới 3.0: có thể mất toàn bộ học bổng — đọc kỹ quy chế trước khi ký',
          'Một số trường cộng điểm tham gia hoạt động quốc tế, volunteer',
        ],
      },
      {
        type: 'emphasis',
        text: 'Chiến lược gợi ý: thi đạt TOPIK 4–5 trước khi nộp hồ sơ, chọn trường có học bổng nhập học minh bạch, rồi giữ GPA từ 3.5 trở lên để duy trì. Đừng chỉ nhìn % học bổng quảng cáo mà bỏ qua điều kiện GPA.',
      },
      {
        type: 'p',
        text: '4. Học bổng khác: học bổng chính quyền địa phương (Busan, Gwangju…), học bổng doanh nghiệp (Samsung, LG — thường sau năm 2), học bổng trao đổi ASEAN. Theo dõi phòng International Office trường và fanpage du học Hàn uy tín — tránh trung tâm hứa “chắc chắn 100% học bổng” không có hợp đồng rõ.',
      },
    ],
  },
  {
    id: 20,
    title: 'Học hành tại Hàn: hệ thống điểm, thi cử và cách tránh bỏ học',
    topic: 'topik',
    author: 'Minh Hàn',
    authorUrl: 'https://tienghancohuyen.vn/author/minh-han',
    avatar: avatarImg(11),
    verified: true,
    publishedAt: 'Vừa xong',
    readTime: '12 phút đọc',
    likes: 78,
    comments: 9,
    image: articleImg('grammar-write.jpg'),
    icon: faBook,
    excerpt:
      'Cách tính GPA, thang điểm A+–F, quy định cảnh báo học vụ và mẹo học môn học bằng tiếng Hàn.',
    body: [
      {
        type: 'p',
        text: 'Hệ thống đánh giá đại học Hàn khác Việt: nhấn mạnh thi giữa kỳ + cuối kỳ, điểm danh, và bài tập nhóm. Sinh viên quốc tế dễ “sốc” vì môn học bằng tiếng Hàn 100% sau năm đầu — cần chiến lược học từ kỳ 1.',
      },
      {
        type: 'p',
        text: 'Thang điểm và GPA:',
      },
      {
        type: 'list',
        items: [
          'A+ / A0 / B+ / B0 / C+ / C0 / D+ / D0 / F — A+ thường 4.5, A0 là 4.0 (tùy trường)',
          'GPA tốt nghiệp tối thiểu thường 2.0/4.5; học bổng yêu cầu 3.0–3.5+',
          'Một môn 3 tín chỉ (학점) = 3 giờ học/tuần × 16 tuần',
          'Đăng ký 12–18 tín chỉ/học kỳ là phổ biến; quá 21 tín có thể cần phê duyệt',
        ],
      },
      {
        type: 'p',
        text: 'Cấu trúc điểm một môn điển hình:',
      },
      {
        type: 'list',
        items: [
          'Chuyên cần (출석): 10–20% — vắng 3–4 buổi có thể cảnh báo',
          'Giữa kỳ (중간): 30–40%',
          'Cuối kỳ (기말): 40–50%',
          'Bài tập / thuyết trình / tham gia lớp: 10–20%',
        ],
      },
      {
        type: 'image',
        src: articleImg('listening-headphones.jpg'),
        caption: 'Ghi âm bài giảng (xin phép giáo viên) và nghe lại 2 lần/tuần — cách hiệu quả khi chưa nghe kịp tiếng Hàn.',
        alt: 'Tai nghe và tài liệu nghe',
      },
      {
        type: 'emphasis',
        text: 'Cảnh báo học vụ (학사경고): GPA dưới 2.0 hai học kỳ liên tiếp có thể buộc thôi học. Visa D-2 yêu cầu duy trì tình trạng sinh viên chính thức — bỏ học = ảnh hưởng visa.',
      },
      {
        type: 'p',
        text: 'Mẹo học môn bằng tiếng Hàn:',
      },
      {
        type: 'list',
        items: [
          'Trước kỳ: đọc syllabus, tải ppt trước buổi học, học từ vựng chuyên ngành (Quizlet)',
          'Trong lớp: ngồi trước, ghi chú kết hợp ghi âm; hỏi bạn Hàn giải thích từ khó sau giờ',
          'Nhóm: chủ động chia task sớm — trình bày bằng slide song ngữ nếu được phép',
          'Thi: ôn theo ppt + bài tập cũ; nhiều giáo viên lặp dạng câu hỏi',
          'Dùng Writing Center / Korean tutoring miễn phí của trường',
        ],
      },
      {
        type: 'p',
        text: 'Nếu học quá khó: đổi sang môn elective dễ hơn trong tuần đầu (수강정정), giảm tín chỉ, hoặc xin hoãn (휴학) 1 học kỳ thay vì cố gắng rồi trượt nhiều môn. Trao đổi với cố vấn học tập quốc tế (academic advisor) trước khi quyết định.',
      },
    ],
  },
  {
    id: 21,
    title: 'Du học Seoul hay vùng tỉnh? So sánh chi phí, học tập và việc làm',
    topic: 'culture',
    author: 'Hàn Talk',
    authorUrl: 'https://tienghancohuyen.vn/author/han-talk',
    avatar: avatarImg(25),
    verified: false,
    publishedAt: 'Vừa xong',
    readTime: '11 phút đọc',
    likes: 54,
    comments: 8,
    image: articleImg('hangul-street.jpg'),
    icon: faTrain,
    excerpt:
      'Seoul vs Busan vs Gwangju vs Daejeon — bảng so sánh học phí, nhà ở, việc làm thêm và đời sống sinh viên.',
    body: [
      {
        type: 'p',
        text: '“Nên đi Seoul hay tỉnh?” là câu hỏi số 1 khi chọn trường. Không có đáp án đúng cho tất cả — phụ thuộc ngân sách, ngành học, trình độ tiếng Hàn và mục tiêu sau tốt nghiệp.',
      },
      {
        type: 'p',
        text: 'Bảng so sánh nhanh (sinh viên quốc tế, mức trung bình/tháng):',
      },
      {
        type: 'list',
        items: [
          'Seoul: nhà ở 400.000–800.000 won (gosiwon/oneroom); ăn uống 350.000–500.000 won; đi lại 60.000–80.000 won — tổng ~1.200.000–1.800.000 won/tháng.',
          'Busan: nhà 250.000–500.000 won; ăn uống 280.000–400.000 won — tổng ~900.000–1.300.000 won; biển, không khí thoáng.',
          'Gwangju/Daegu: nhà 200.000–400.000 won; sinh hoạt thấp nhất trong các thành phố lớn — tổng ~800.000–1.100.000 won.',
          'Daejeon: trung tâm khoa học, KAIST/충남대 — phù hợp STEM; chi phí thấp hơn Seoul 15–25%.',
        ],
      },
      {
        type: 'image',
        src: articleImg('hangul-city.jpg'),
        caption: 'Seoul nhiều cơ hội nhưng áp lực chi phí cao; vùng tỉnh yên tĩnh hơn, cộng đồng Việt nhỏ hơn nhưng gắn bó hơn.',
        alt: 'Cảnh đô thị Hàn Quốc',
      },
      {
        type: 'p',
        text: 'Ưu — nhược từng lựa chọn:',
      },
      {
        type: 'list',
        items: [
          'Seoul (+): nhiều việc làm thêm, internship, sự kiện, bạn bè quốc tế; (−) đắt, cạnh tranh, dễ xao nhãng.',
          'Busan (+): chi phí hợp lý, biển, đời sống cân bằng; (−) ít việc “hot” hơn Seoul, tiếng địa phương đôi khi khó nghe.',
          'Gwangju/Daegu (+): rẻ, bình dị, tập trung học; (−) ít tiếng Anh ngoài campus, bay nội địa mới tiện.',
          'Daejeon (+): môi trường nghiên cứu; (−) giải trí ít hơn Seoul (nhưng có KTX 50 phút lên Seoul).',
        ],
      },
      {
        type: 'emphasis',
        text: 'Nếu ngân sách eo hẹp và ngành học không bắt buộc ở Seoul, hãy cân nhắc trường quốc lập vùng tỉnh. Nếu muốn làm việc tại tập đoàn Hàn sau tốt nghiệp, Seoul hoặc Incheon sẽ thuận lợi hơn để gặp gỡ và xin thực tập.',
      },
      {
        type: 'p',
        text: 'Việc làm thêm: Seoul nhiều slot quán ăn, logistics, gia sư (lương tối thiểu ~9.860 won/giờ). Vùng tỉnh ít cạnh tranh hơn nhưng ít việc hơn — nhiều bạn làm trong campus (thư viện, phòng quốc tế). Dù ở đâu, tuân thủ giới hạn giờ visa D-2.',
      },
      {
        type: 'p',
        text: 'Chuyển trường hoặc chuyển từ tỉnh lên Seoul sau một đến hai năm là lựa chọn của nhiều sinh viên: tiết kiệm năm đầu, khi đã quen tiếng Hàn và có điểm GPA tốt thì nộp hồ sơ chuyển tiếp. Hỏi trường đích về chính sách công nhận tín chỉ đã học.',
      },
    ],
  },
  {
    id: 22,
    title: 'Mùa đông và bốn mùa tại Hàn: sinh hoạt sinh viên cần biết',
    topic: 'culture',
    author: 'Foodie KR',
    authorUrl: 'https://tienghancohuyen.vn/author/foodie-kr',
    avatar: avatarImg(32),
    verified: false,
    publishedAt: 'Vừa xong',
    readTime: '10 phút đọc',
    likes: 41,
    comments: 6,
    image: articleImg('food-korean.jpg'),
    icon: faHouse,
    excerpt:
      'Ondol, áo phao, tro tuyết, lễ hội và cách giữ sức khỏe qua mùa đông -20°C ở Hàn Quốc.',
    body: [
      {
        type: 'p',
        text: 'Mùa đông Hàn có thể xuống -10°C đến -20°C ở Seoul và vùng núi — khác hoàn toàn với miền Bắc Việt. Sinh viên mới thường “sốc nhiệt” lần đầu; chuẩn bị đúng giúp bạn học ổn định thay vì ốm suốt kỳ.',
      },
      {
        type: 'list',
        items: [
          'Tháng 12–2: lạnh nhất; gió cắt da (체감온도 thấp hơn nhiệt độ thực).',
          'Tháng 3–5: xuân, hoa anh đào (4월) — mặc áo khoác mỏng, dễ cảm.',
          'Tháng 6–8: mùa mưa (장마), nóng ẩm — ô, dép, chống nấm.',
          'Tháng 9–11: thu đẹp nhất; tháng 11 chuẩn bị đồ đông.',
        ],
      },
      {
        type: 'p',
        text: 'Đồ cần mua khi sang mùa đông:',
      },
      {
        type: 'list',
        items: [
          'Áo phao dài (패딩) — mua tại Noon, ABC Mart, hoặc second-hand; 50.000–150.000 won',
          'Heattech (Uniqlo) mặc trong — 10.000–20.000 won/cái',
          'Tất dày, găng tay cảm ứng, khăn quàng, mũ',
          'Kem dưỡng ẩm, son dưỡng — da dễ nứt',
          'Máy tạo ẩm mini nếu phòng ondol khô',
        ],
      },
      {
        type: 'image',
        src: articleImg('food-table.jpg'),
        caption: 'Món ăn nóng mùa đông: tteokbokki, odeng, súp kimchi — vừa ấm bụng vừa tiết kiệm.',
        alt: 'Bàn ăn món Hàn nóng',
      },
      {
        type: 'emphasis',
        text: 'Ondol (sưởi sàn): ấm chân nhưng tốn điện. Tắt khi đi học cả ngày; tắt nhiệt độ ban đêm nếu có chăn dày — tiết kiệm 30–50% hóa đơn điện.',
      },
      {
        type: 'p',
        text: 'Hoạt động mùa đông: trượt tuyết Everland/Vivaldi (1 ngày 50.000–80.000 won vé + thuê đồ); lễ hội đèn Seoul Lantern Festival; Giáng sinh ở Myeongdong. Cẩn thận đường trơn (블랙아이스) — giày đế chống trượt.',
      },
      {
        type: 'p',
        text: 'Sức khỏe: uống đủ nước dù lạnh, vitamin D nếu ít ra ngoài, phòng tránh cúm (독감 예방접종 miễn phí hoặc rẻ cho sinh viên). Cúm mùa đông có thể nghỉ học 1 tuần — báo giáo viên và xin giấy bệnh viện để không bị trừ chuyên cần quá mức.',
      },
    ],
  },
]

/** Bài du học, cuộc sống, học hành — hiển thị trước trên trang chủ và danh sách bài viết */
const ARTICLE_DISPLAY_ORDER: number[] = [
  16, 17, 19, 18, 20, 21, 10, 11, 12, 13, 14, 15, 22,
  1, 2, 3, 4, 5, 6, 7, 8, 9,
]

function sortArticlesForDisplay(articles: Article[]): Article[] {
  const rank = new Map(ARTICLE_DISPLAY_ORDER.map((id, index) => [id, index]))
  return [...articles].sort((a, b) => {
    const ra = rank.get(a.id) ?? 999
    const rb = rank.get(b.id) ?? 999
    if (ra !== rb) return ra - rb
    return a.id - b.id
  })
}

export const ARTICLES = sortArticlesForDisplay(ARTICLES_DATA)

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
