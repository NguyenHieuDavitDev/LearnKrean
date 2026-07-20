import {
  faBookOpen,
  faComments,
  faEarListen,
  faGraduationCap,
  faLanguage,
  faPenFancy,
  faSpellCheck,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type RoadmapStep = {
  id: string
  title: string
  /** Mục tiêu / nội dung luyện trong bài */
  desc: string
  /** Ngữ pháp trọng tâm theo giáo trình */
  grammar: string
}

export type Roadmap = {
  id: string
  title: string
  shortTitle: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  exam: 'TOPIK I' | 'TOPIK II'
  /** Tên giáo trình chuẩn */
  textbook: string
  description: string
  longDescription: string
  skills: { label: string; icon: IconDefinition }[]
  illustration: {
    gradient: string
    mark: string
    caption: string
  }
  steps: RoadmapStep[]
  duration: string
  outcome: string
  scoreHint: string
  vocabHint: string
}

function L(
  n: number | 'hangul',
  ko: string,
  vi: string,
  grammar: string,
  desc: string,
): RoadmapStep {
  const id = n === 'hangul' ? 'hangul' : `bai-${n}`
  const title =
    n === 'hangul' ? `Phần mở đầu · ${ko} (${vi})` : `Bài ${n} · ${ko} (${vi})`
  return { id, title, grammar, desc }
}

export const ROADMAPS: Roadmap[] = [
  {
    id: 'topik-1',
    title: 'Lộ trình TOPIK 1',
    shortTitle: 'TOPIK 1',
    level: 1,
    exam: 'TOPIK I',
    textbook: 'Tiếng Hàn Tổng hợp · Sơ cấp 1 (Quyển 1)',
    description:
      'Theo đúng giáo trình Sơ cấp 1: Hangul + 15 bài từ giới thiệu đến giao thông.',
    longDescription:
      'Lộ trình bám sát bộ giáo trình Tiếng Hàn Tổng hợp dành cho người Việt Nam — Quyển 1 (Sơ cấp 1). Mỗi bước tương ứng một bài trong sách: từ vựng – ngữ pháp – nghe – nói – đọc – viết – văn hóa. Hoàn thành quyển này là nền tảng đạt TOPIK 1.',
    skills: [
      { label: 'Hangul', icon: faLanguage },
      { label: 'Ngữ pháp', icon: faSpellCheck },
      { label: 'Giao tiếp', icon: faComments },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #ffe8d6 0%, #ffb347 55%, #f05123 120%)',
      mark: '1',
      caption: 'Sơ cấp 1',
    },
    duration: '3–4 tháng (≈ 15–20 buổi/tháng)',
    outcome: 'Hoàn thành Sơ cấp 1, sẵn sàng thi TOPIK 1',
    scoreHint: 'Tương đương TOPIK I · cấp 1',
    vocabHint: '~700 từ (theo giáo trình quyển 1)',
    steps: [
      L('hangul', '한글', 'Bảng chữ cái', 'Phụ âm · nguyên âm · batchim · ghép âm tiết', 'Học đọc – viết Hangul trước khi vào Bài 1; luyện phát âm từng ngày.'),
      L(1, '소개', 'Giới thiệu', 'N입니다/입니까?, 은/는', 'Chào hỏi, tự giới thiệu tên, quốc tịch, nghề nghiệp.'),
      L(2, '학교', 'Trường học', '이/가, 에 있다/없다, 이/가 아니다, 이것/그것/저것', 'Nói vị trí đồ vật, giới thiệu trường học và phòng học.'),
      L(3, '일상생활', 'Sinh hoạt hàng ngày', '-ㅂ니다/습니까, 을/를, 에서', 'Nói hoạt động hàng ngày và sở thích cơ bản.'),
      L(4, '날짜와 요일', 'Ngày và thứ', 'Số Hán Hàn, 와/과, N에 (thời gian)', 'Nói năm – tháng – ngày – thứ; lập lịch đơn giản.'),
      L(5, '하루 일과', 'Công việc trong ngày', 'Số thuần Hàn, -아/어요, 에 가다, 안', 'Kể thời gian biểu ngày; dùng đuôi lịch sự thông dụng.'),
      L(6, '주말', 'Cuối tuần', '무엇을, 고 싶다, 같이', 'Kể hoạt động cuối tuần, sở thích giải trí.'),
      L(7, '물건 사기', 'Mua hàng', 'Số lượng + đơn vị, 주세요, 얼마예요?', 'Hỏi giá, mặc cả nhẹ, gọi món đồ cần mua.'),
      L(8, '음식', 'Thức ăn', '-겠-, -지 않다, -(으)세요', 'Gọi món, mô tả vị (cay/ngọt…), đặt món lịch sự.'),
      L(9, '집', 'Nhà cửa', '-(으)로, -(으)ㄹ래요, 도', 'Miêu tả nhà, vị trí xung quanh, hỏi đường gần nhà.'),
      L(10, '가족', 'Gia đình', '께서, -(으)시-', 'Giới thiệu thành viên gia đình với kính ngữ.'),
      L(11, '날씨', 'Thời tiết', '-고, 부터~까지, -(으)ㄹ 거예요', 'Nói thời tiết, mùa và kế hoạch theo thời tiết.'),
      L(12, '전화', 'Điện thoại', '에게/한테/께, -지만, -(으)려고 하다', 'Gọi điện, chuyển máy, để lại lời nhắn.'),
      L(13, '생일', 'Sinh nhật', '-아/어서, -(으)ㄹ까요?, 못', 'Mời sinh nhật, giải thích lý do, đề nghị.'),
      L(14, '취미', 'Sở thích', '-(으)ㄹ 수 있다/없다', 'Nói sở thích và khả năng làm được/không làm được.'),
      L(15, '교통', 'Giao thông', '에서~까지, -(으)로, -(으)러 가다', 'Đi phương tiện công cộng, hỏi đường cơ bản.'),
    ],
  },
  {
    id: 'topik-2',
    title: 'Lộ trình TOPIK 2',
    shortTitle: 'TOPIK 2',
    level: 2,
    exam: 'TOPIK I',
    textbook: 'Tiếng Hàn Tổng hợp · Sơ cấp 2 (Quyển 2)',
    description:
      'Theo giáo trình Sơ cấp 2: 15 bài từ gặp gỡ đến cuộc sống tại Hàn Quốc.',
    longDescription:
      'Lộ trình bám sát Quyển 2 (Sơ cấp 2). Mở rộng định ngữ, phép tắc, kinh nghiệm và kế hoạch — nền tảng vững để đạt TOPIK 2 và chuẩn bị vào trung cấp.',
    skills: [
      { label: 'Ngữ pháp', icon: faSpellCheck },
      { label: 'Nghe', icon: faEarListen },
      { label: 'Giao tiếp', icon: faComments },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #ffd6a8 0%, #f07838 55%, #c43a12 125%)',
      mark: '2',
      caption: 'Sơ cấp 2',
    },
    duration: '3–4 tháng',
    outcome: 'Hoàn thành Sơ cấp 2, sẵn sàng thi TOPIK 2',
    scoreHint: 'Tương đương TOPIK I · cấp 2',
    vocabHint: '~1.500–1.700 từ (cộng dồn sơ cấp)',
    steps: [
      L(1, '만남', 'Gặp gỡ', '의, -(으)ㄹ 때, -아/어 주다', 'Thăm hỏi, giúp đỡ, quan hệ xã hội cơ bản.'),
      L(2, '약속', 'Hẹn gặp', '만, -(으)니까, -지 말다, -아/어도 되다', 'Hẹn giờ, cho phép / cấm đoán, nêu lý do.'),
      L(3, '물건 사기', 'Mua sắm', 'Định ngữ -는/-(으)ㄴ, -보다', 'Mô tả đồ vật, so sánh khi mua sắm.'),
      L(4, '병원', 'Bệnh viện', '-(으)ㄴ마다, -아/어야 하다', 'Nói triệu chứng, phải làm gì khi ốm.'),
      L(5, '편지', 'Thư tín', '-지 못하다, định ngữ tương lai -(으)ㄹ', 'Viết thư/email ngắn, nối ý lịch sự.'),
      L(6, '교통', 'Giao thông', '-아/어서 (thứ tự), -지요?, số thứ tự', 'Chỉ đường chi tiết, xác nhận thông tin.'),
      L(7, '전화', 'Điện thoại', '-(으)려고, -기 전에, -(으)ㄹ게요', 'Nói mục đích gọi, hứa sẽ làm.'),
      L(8, '영화', 'Phim ảnh', '-겠-, -네요, -아/어 보다', 'Bày tỏ cảm xúc, kể trải nghiệm xem phim.'),
      L(9, '휴일', 'Ngày nghỉ', '(이)나, -(으)면 좋겠다, -기 위해서', 'Nói nguyện vọng, mục đích ngày nghỉ/lễ.'),
      L(10, '외모', 'Ngoại hình', '-아/어지다, -기 때문에, bất quy tắc ㅎ', 'Miêu tả ngoại hình, màu sắc, thay đổi.'),
      L(11, '여행', 'Du lịch', '-거나, -고 있다, -(으)ㄴ 적이 있다', 'Kể kinh nghiệm du lịch, đưa lời khuyên.'),
      L(12, '공공장소', 'Nơi công cộng', '-(으)면서, -(으)면 안 되다', 'Quy tắc nơi công cộng, làm đồng thời.'),
      L(13, '도시', 'Đô thị', '(이)나 (nhấn mạnh), -(으)ㄹ 것 같다', 'Miêu tả thành phố, đoán/ước lượng.'),
      L(14, '계획', 'Kế hoạch', '-(으)ㄴ 지, -(으)ㄴ 후에, -기로 하다', 'Nói kế hoạch học tập / nghề nghiệp.'),
      L(15, '한국 생활', 'Cuộc sống tại Hàn Quốc', '에게서/한테서, -(으)ㄴ/는 데, bất quy tắc 르', 'Sinh hoạt, tìm nhà/việc khi ở Hàn.'),
    ],
  },
  {
    id: 'topik-3',
    title: 'Lộ trình TOPIK 3',
    shortTitle: 'TOPIK 3',
    level: 3,
    exam: 'TOPIK II',
    textbook: 'Tiếng Hàn Tổng hợp · Trung cấp 1 (Quyển 3)',
    description:
      'Theo giáo trình Trung cấp 1: 15 bài từ cuộc sống trường học đến nghi lễ – quy định.',
    longDescription:
      'Lộ trình bám sát Quyển 3 (Trung cấp 1). Chuyển từ sơ cấp sang trung cấp: tường thuật gián tiếp, sắc thái ý kiến, viết đoạn dài hơn — hướng tới TOPIK 3.',
    skills: [
      { label: 'Ngữ pháp', icon: faSpellCheck },
      { label: 'Đọc hiểu', icon: faBookOpen },
      { label: 'Viết', icon: faPenFancy },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #f5c16c 0%, #e8893a 50%, #a64518 130%)',
      mark: '3',
      caption: 'Trung cấp 1',
    },
    duration: '4–5 tháng',
    outcome: 'Hoàn thành Trung cấp 1, hướng tới TOPIK 3',
    scoreHint: 'Tương đương TOPIK II · cấp 3',
    vocabHint: '~2.500–3.500 từ',
    steps: [
      L(1, '학교생활', 'Cuộc sống trường học', '밖에, (이)라고 하다, -(으)ㄹ 생각이다, -게 되다', 'Sinh hoạt trường, chuyên ngành, sự kiện.'),
      L(2, '대인 관계', 'Quan hệ cá nhân', '-는 길이다, -(으)ㄴ 덕분에, -나요, -(으)ㄴ가요?', 'Thăm hỏi, nhờ giúp, họp mặt.'),
      L(3, '건강', 'Sức khỏe', '-는 게 좋다, -아/어 보이다, -(으)ㄴ/는 것 같다', 'Khuyên bảo sức khỏe, nhận xét vẻ ngoài.'),
      L(4, '쇼핑', 'Mua sắm', '대신(에), -기는 하다', 'Đổi/trả hàng, so sánh lựa chọn mua sắm.'),
      L(5, '요리', 'Nấu ăn', '-고 나서, -(으)로, -다가, -게', 'Kể quy trình nấu, nguyên liệu, cách làm.'),
      L(6, '은행', 'Ngân hàng', '-기 쉽다, -는 동안, -(으)려면', 'Giao dịch ngân hàng, điều kiện để làm việc gì.'),
      L(7, '성격', 'Tính cách', '처럼, -군요/-구나, -(으)ㄴ 편이다', 'Miêu tả tính cách, thành ngữ thường dùng.'),
      L(8, '실수', 'Sai lầm', '-는 바람에, -는 중이다, -도록 하다, -줄 알다', 'Xin lỗi, giải thích sai sót, trí nhớ.'),
      L(9, '이사', 'Chuyển nhà', '-(으)ㄹ 줄 알다/모르다, -기 바라다, 에 비해서', 'Nói chuyển nhà, so sánh chỗ ở.'),
      L(10, '여행', 'Du lịch', '-다고 하다, -냐고 하다, -(으)ㄹ까 하다', 'Tường thuật gián tiếp, dự định chuyến đi.'),
      L(11, '고민', 'Suy nghĩ / lo lắng', '반말, -아/야, -다(가) 보면', 'Tư vấn, chia sẻ lo lắng, ngữ cảnh thân mật.'),
      L(12, '인터넷', 'Internet', '-(으)ㅁ, -(으)라고 하다, -자고 하다', 'Email, soạn thảo, dẫn lời đề nghị/ra lệnh.'),
      L(13, '희망', 'Hi vọng', '-아/어 가다/오다, -아/어야겠다, -았/었으면 좋겠다', 'Ước mơ, từ thiện, nguyện vọng tương lai.'),
      L(14, '영화와 드라마', 'Phim và phim truyền hình', '(아무리) -아/어도, -거든(요), -던데요', 'Cảm nhận phim, nhấn mạnh trải nghiệm.'),
      L(15, '예절과 규칙', 'Nghi lễ và quy định', '대로, -지 않으면 안 되다, -(으)려던 참이다', 'Phép tắc xã hội, quy định bắt buộc.'),
    ],
  },
  {
    id: 'topik-4',
    title: 'Lộ trình TOPIK 4',
    shortTitle: 'TOPIK 4',
    level: 4,
    exam: 'TOPIK II',
    textbook: 'Tiếng Hàn Tổng hợp · Trung cấp 2 (Quyển 4)',
    description:
      'Theo giáo trình Trung cấp 2: 15 bài từ thịnh hành đến câu chuyện ngày xưa.',
    longDescription:
      'Lộ trình bám sát Quyển 4 (Trung cấp 2). Chủ đề xã hội – công sở – môi trường; ngữ pháp trung–cao phục vụ viết luận và đọc hiểu TOPIK 4.',
    skills: [
      { label: 'TOPIK', icon: faGraduationCap },
      { label: 'Đọc hiểu', icon: faBookOpen },
      { label: 'Viết luận', icon: faPenFancy },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #e8a87c 0%, #d46a2e 52%, #8b2e0e 130%)',
      mark: '4',
      caption: 'Trung cấp 2',
    },
    duration: '4–5 tháng',
    outcome: 'Hoàn thành Trung cấp 2, hướng tới TOPIK 4',
    scoreHint: 'Tương đương TOPIK II · cấp 4',
    vocabHint: '~4.000–5.000 từ',
    steps: [
      L(1, '유행', 'Thịnh hành', '-나 보다, -(으)ㄴ가 보다, -다고요?, 에 따라', 'Thời trang, xu hướng, suy đoán.'),
      L(2, '집안일', 'Việc nhà', '-잖아요, -자마자, 사동사, -게 하다', 'Việc nhà, khiến động.'),
      L(3, '감정', 'Cảm xúc', '-았/었었-, -던/-았/었던, -아/어하다', 'Biểu đạt cảm xúc, hồi tưởng.'),
      L(4, '생활 정보', 'Thông tin cuộc sống', '-대요/-냬요/-재요/-(으)래요', 'Truyền đạt thông tin mua bán, dịch vụ.'),
      L(5, '취직', 'Đi làm / xin việc', '-아/어야, -아/어 놓다, -(으)ㄴ 지 알다/모르다', 'Chuẩn bị hồ sơ, thủ tục xin việc.'),
      L(6, '공장', 'Công xưởng', '피동사, -아/어지다, -았/었을 때', 'Sửa chữa, bảo hành, bị động.'),
      L(7, '명절', 'Ngày lễ', '얼마나 -(으)ㄴ지, -곤 하다, 에다가', 'Tết, lễ hội, thói quen truyền thống.'),
      L(8, '여가 생활', 'Cuộc sống giải trí', '-더라고요, -야말로, -(으)ㄹ 만하다', 'Hoạt động giải trí, đánh giá đáng làm.'),
      L(9, '직장', 'Nơi làm việc', '-(으)ㄹ 뿐만 아니라, -든지 -든지, -아/어 가지고', 'Công sở, phòng ban, áp lực công việc.'),
      L(10, '절약', 'Tiết kiệm', '-(으)ㄹ수록, -(으)ㄴ/는 모양이다, -느라고', 'Chi tiêu, tín dụng, suy đoán tình hình.'),
      L(11, '결혼', 'Kết hôn', '-다면, -(으)ㄹ 텐데, -(으)ㄹ까 봐', 'Quan điểm hôn nhân, lo lắng giả định.'),
      L(12, '사건과 사고', 'Tai nạn và sự cố', '-아/어 보니까, -(으)ㄹ 뻔하다, -아/어 있다', 'Kể sự cố, truyền thông, suýt xảy ra.'),
      L(13, '교육제도', 'Chế độ giáo dục', '-도록, -는 데다가, -(으)며', 'Giáo dục, thi đại học, nối ý học thuật.'),
      L(14, '생활과 환경', 'Cuộc sống và môi trường', '-(으)ㄴ/는 반면에, -(으)ㄹ 정도이다, 에 따르면', 'Ô nhiễm, bảo vệ môi trường, dẫn nguồn.'),
      L(15, '옛날 이야기', 'Câu chuyện ngày xưa', '-자, -다 보니까, -(으)ㄴ 척하다', 'Kể chuyện cổ tích, giả vờ, diễn biến.'),
    ],
  },
  {
    id: 'topik-5',
    title: 'Lộ trình TOPIK 5',
    shortTitle: 'TOPIK 5',
    level: 5,
    exam: 'TOPIK II',
    textbook: 'Tiếng Hàn Tổng hợp · Cao cấp 1 (Quyển 5)',
    description:
      'Theo giáo trình Cao cấp 1: 15 bài từ giao lưu đến du học Hàn Quốc.',
    longDescription:
      'Lộ trình bám sát Quyển 5 (Cao cấp 1). Chủ đề xã hội – văn hóa – kinh tế; ngữ pháp cao cấp phục vụ đọc báo, nghe tin và viết luận TOPIK 5.',
    skills: [
      { label: 'Đọc hiểu', icon: faBookOpen },
      { label: 'Nghe', icon: faEarListen },
      { label: 'Viết luận', icon: faPenFancy },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #d4a574 0%, #b85a2a 55%, #6b2410 135%)',
      mark: '5',
      caption: 'Cao cấp 1',
    },
    duration: '5–6 tháng',
    outcome: 'Hoàn thành Cao cấp 1, hướng tới TOPIK 5',
    scoreHint: 'Tương đương TOPIK II · cấp 5',
    vocabHint: '~6.000–8.000 từ & cụm',
    steps: [
      L(1, '만남과 교류', 'Gặp gỡ và giao lưu', '-게 (연결), -(으)ㄹ걸, -(으)로 인해', 'Giao lưu, nhân duyên, nguyên nhân.'),
      L(2, '서울', 'Seoul', '-(으)ㄴ/는 만큼, -(으)ㄹ 뿐이다, -(으)로서', 'Miêu tả thủ đô, vai trò, mức độ.'),
      L(3, '현대인의 건강', 'Sức khỏe người hiện đại', '-(으)ㄴ 채로, -(으)ㄹ 수밖에 없다, 되다', 'Sức khỏe hiện đại, tình trạng bắt buộc.'),
      L(4, '사회와 봉사', 'Xã hội và từ thiện', '-아/어다가, -았/었더니, -자면', 'Tình nguyện, chuỗi hành động – kết quả.'),
      L(5, '뉴스와 신문', 'Tin tức và báo', '-고 말다, -(ㄴ/는)다지요?, -는 한', 'Đọc/nghe tin, xác nhận thông tin.'),
      L(6, '역사 속의 인물', 'Nhân vật lịch sử', '-다시피, -(으)ㅁ으로써, -았/었더라면', 'Nhân vật sử, giả định quá khứ.'),
      L(7, '속담과 관용표현', 'Tục ngữ và quán dụng ngữ', '-(ㄴ/는)다고, -(으)ㄴ/는 법이다, -(으)ㄴ/는 듯이', 'Thành ngữ, quy luật ngôn ngữ.'),
      L(8, '광고', 'Quảng cáo', '-(으)ㄹ 테니까, -(으)ㄴ/는가 하면, -단/란 말이에요?', 'Phân tích quảng cáo, đối lập ý.'),
      L(9, '생활의 변화와 주거', 'Thay đổi cuộc sống và nhà ở', '(이)라도, -를 통해, -기에', 'Nhà ở, biến đổi lối sống.'),
      L(10, '대중문화', 'Văn hóa đại chúng', '-더니, -(으)ㄹ걸요, -아/어 버리다', 'Văn hóa đại chúng, hoàn tất hành động.'),
      L(11, '관광과 안내', 'Tham quan và hướng dẫn', '-(으)ㄴ/는데도, -(으)ㄴ/는 셈이다, 여간 -지 않다', 'Hướng dẫn du lịch, nhấn mạnh mức độ.'),
      L(12, '산업과 경제', 'Công nghiệp và kinh tế', '-(으)ㅁ에 따라, 만 해도, -는 대로', 'Kinh tế – công nghiệp, theo xu hướng.'),
      L(13, '한국인의 사고방식', 'Tư duy người Hàn', '-(으)면서도, -기가 무섭게, -아/어서 그런지', 'Cách nghĩ, đối lập hành động.'),
      L(14, '한국인의 일생', 'Cuộc đời người Hàn', '-(ㄴ/는)다면서요?, -게 마련이다, 조차', 'Vòng đời, phong tục, xác nhận tin đồn.'),
      L(15, '한국 유학', 'Du học Hàn Quốc', '-거든, -아/어 내다, (이)라든가', 'Du học, vượt khó, liệt kê ví dụ.'),
    ],
  },
  {
    id: 'topik-6',
    title: 'Lộ trình TOPIK 6',
    shortTitle: 'TOPIK 6',
    level: 6,
    exam: 'TOPIK II',
    textbook: 'Tiếng Hàn Tổng hợp · Cao cấp 2 (Quyển 6)',
    description:
      'Theo giáo trình Cao cấp 2: 15 bài từ chế độ gia đình đến việc làm – công sở.',
    longDescription:
      'Lộ trình bám sát Quyển 6 (Cao cấp 2) — quyển cuối bộ giáo trình. Chủ đề học thuật – xã hội – lịch sử; ngữ pháp cao cấp tinh tế để hướng tới TOPIK 6.',
    skills: [
      { label: 'TOPIK', icon: faGraduationCap },
      { label: 'Viết luận', icon: faPenFancy },
      { label: 'Đọc hiểu', icon: faBookOpen },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #c4784a 0%, #9a3d18 50%, #3d1508 140%)',
      mark: '6',
      caption: 'Cao cấp 2',
    },
    duration: '5–6 tháng',
    outcome: 'Hoàn thành Cao cấp 2, hướng tới TOPIK 6',
    scoreHint: 'Tương đương TOPIK II · cấp 6',
    vocabHint: '8.000+ từ, thành ngữ & diễn đạt học thuật',
    steps: [
      L(1, '가족제도', 'Chế độ gia đình', '-(으)ㄴ 나머지, -기 짝이 없다, -았/었더라면, 더러/보고', 'Gia đình hiện đại, giả định ngược.'),
      L(2, '과학과 미래', 'Khoa học và tương lai', '-고자, 마저, -(으)ㄴ 탓, -(ㄴ/는)다기에', 'Khoa học, phát minh, nguyên nhân.'),
      L(3, '한국어와 사회', 'Tiếng Hàn và xã hội', '-(으)ㄹ 겸, -고말고요, -더라도', 'Ngôn ngữ – xã hội, nhấn mạnh đồng ý.'),
      L(4, '한국문학', 'Văn học Hàn Quốc', '-고서, -고요, -던가요?, (이)나 (이)나 할 것 없이', 'Văn học, tác phẩm cổ – hiện đại.'),
      L(5, '한국의 문화유산', 'Di sản văn hóa', '-기는커녕, -(으)니만큼, -는 수가 있다, -(으)ㄹ 따름이다', 'Di sản, phủ định nâng cao.'),
      L(6, '국제사회', 'Xã hội quốc tế', '-(으)ㄹ 법하다, (이)나마, -더라고요, -(으)련마는', 'Hợp tác quốc tế, ngoại giao.'),
      L(7, '현대사회와 스포츠', 'Xã hội hiện đại và thể thao', '-기 십상이다, -(으)ㄹ 뿐더러, -(으)ㄹ지라도', 'Thể thao, kinh doanh thể thao.'),
      L(8, '정치제도', 'Chế độ chính trị', '-(으)ㄹ 바에야, -(으)ㄴ/는 만큼, -고 들다', 'Chính trị, bầu cử, quan hệ Nam–Bắc.'),
      L(9, '생활과 경제', 'Cuộc sống và kinh tế', '-(으)ㄹ락 말락 하다, -(으)ㄹ 리가 없다, -느니 차라리', 'Thương mại, đầu tư, lựa chọn tốt hơn.'),
      L(10, '한국의 역사', 'Lịch sử Hàn Quốc', '-(으)랴 -(으)랴, -기 일쑤다, -(으)로 말미암아', 'Lịch sử, chiến tranh, nguyên nhân.'),
      L(11, '현대의 의학', 'Y học hiện đại', '-(으)ㄴ들, -(으)면 몰라도, -길래, -기나 하면', 'Y học, quan điểm điều trị.'),
      L(12, '인간과 자연', 'Con người và tự nhiên', '-(으)나 마나, -건마는, -은/는 고사하고', 'Địa lý, khí hậu, thiên tai.'),
      L(13, '정보와 통신', 'Thông tin và truyền thông', '-(으)ㄹ 줄이야, -기 마련이다, -(으)ㄹ래야 -ㄹ 수 없다', 'Xã hội thông tin, kỹ thuật truyền tin.'),
      L(14, '현대사회의 문제', 'Vấn đề xã hội hiện đại', '을/를 막론하고, -아/어 봤자, -(으)ㄹ망정', 'Thất nghiệp, tội phạm, giải pháp xã hội.'),
      L(15, '취업과 직장 생활', 'Việc làm và công sở', '-기 나름이다, -는 김에, -는 둥 마는 둥', 'Chiến lược việc làm, đời sống công sở.'),
    ],
  },
]

export function getRoadmapById(id: string) {
  return ROADMAPS.find((r) => r.id === id)
}

export function getAdjacentRoadmaps(id: string) {
  const index = ROADMAPS.findIndex((r) => r.id === id)
  if (index < 0) return { prev: undefined, next: undefined }
  return {
    prev: index > 0 ? ROADMAPS[index - 1] : undefined,
    next: index < ROADMAPS.length - 1 ? ROADMAPS[index + 1] : undefined,
  }
}
