import type { LessonArticle } from '../components/course/lessonArticle'
import {
  BASIC_CONSONANTS,
  BASIC_VOWELS,
  BATCHIM_SOUNDS,
  COMPOUND_VOWELS,
  DOUBLE_CONSONANTS,
  pick,
} from './hangulAlphabet'

export type HangulLessonContent = LessonArticle

function article(
  partial: Omit<HangulLessonContent, 'readMinutes'> & { readMinutes?: number },
): HangulLessonContent {
  return { readMinutes: partial.readMinutes ?? 6, ...partial }
}

/** Nội dung bài viết khóa Hangul — bám phần bảng chữ GT Cho Hang Rok (Sơ cấp 1). */
export const HANGUL_LESSONS: Record<string, HangulLessonContent> = {
  'Hangul là gì? (theo GT Tổng hợp)': article({
    intro:
      'Theo giáo trình «Tiếng Hàn Tổng Hợp Dành Cho Người Việt Nam» (Cho Hang Rok – Lee Mi Hye), phần mở đầu Sơ cấp 1 dành riêng cho bảng chữ Hangul (한글). Hangul do vua Sejong sáng tạo năm 1443, thiết kế khoa học theo hình miệng khi phát âm và học thuyết âm dương.',
    objectives: [
      'Hiểu Hangul là hệ chữ ghép âm tiết, không phải chữ tượng hình',
      'Nắm số lượng chữ: 10 nguyên âm cơ bản + 11 nguyên âm kép, 14 phụ âm + 5 phụ âm đôi',
      'Biết lộ trình học trong GT: nguyên âm → phụ âm → ghép âm → batchim',
      'Chuẩn bị tinh thần luyện viết và nghe phát âm mỗi ngày',
    ],
    sections: [
      {
        heading: '1. Vì sao GT Tổng hợp bắt đầu bằng Hangul?',
        body: 'Quyển Sơ cấp 1 gồm phần bảng chữ cái rồi mới tới 15 bài chủ đề. Không đọc được Hangul thì không học được từ vựng, ngữ pháp và 4 kỹ năng. Khóa này tương đương phần “Bài mở đầu” của giáo trình: học đủ để đọc – viết trước khi sang Bài 1.',
      },
      {
        heading: '2. Cấu tạo hệ thống chữ',
        body: 'Mỗi âm tiết Hangul viết trong một ô vuông. Thành phần tối thiểu: phụ âm đầu + nguyên âm. Có thể thêm phụ âm cuối (받침 – batchim). Phụ âm ㅇ ở đầu âm tiết không phát âm (chỉ giữ chỗ), ở cuối thì đọc “ng”.',
      },
      {
        heading: '3. Lộ trình trong khóa này',
        body: 'Nguyên âm cơ bản (모음) → nguyên âm kép (이중모음) → phụ âm cơ bản (자음) → phụ âm đôi (쌍자음) → ghép âm & batchim → ôn tập. Mỗi bảng chữ đều có nút nghe phát âm — hãy bấm và đọc theo.',
      },
    ],
    vocabulary: [
      { korean: '한글', meaning: 'Hangul / chữ Hàn' },
      { korean: '모음', meaning: 'Nguyên âm' },
      { korean: '자음', meaning: 'Phụ âm' },
      { korean: '받침', meaning: 'Phụ âm cuối (batchim)' },
    ],
    examples: [
      { korean: '한국어를 공부해요.', meaning: 'Tôi học tiếng Hàn.' },
      { korean: '한글은 쉬워요.', meaning: 'Hangul thì dễ.' },
    ],
    tip: 'Học theo đúng thứ tự GT Tổng hợp: đừng nhảy sang từ vựng Bài 1 khi chưa thuộc bảng chữ.',
    readMinutes: 5,
  }),

  'Quy tắc viết chữ Hàn': article({
    intro:
      'Giáo trình nhấn mạnh hai quy tắc viết cố định: từ trên xuống dưới, từ trái sang phải. Mọi âm tiết nằm trong một ô vuông — đây là nền tảng để viết đẹp và đọc đúng thứ tự nét.',
    objectives: [
      'Nhớ quy tắc trên→dưới và trái→phải',
      'Viết đúng thứ tự: phụ âm đầu → nguyên âm → batchim (nếu có)',
      'Phân biệt bố cục nguyên âm dọc (ㅏㅓㅣ…) và ngang (ㅗㅜㅡ…)',
      'Luyện viết chậm, nét rõ trong ô vuông',
    ],
    sections: [
      {
        heading: '1. Hai quy tắc vàng',
        body: 'Luôn viết từ trên xuống dưới, rồi từ trái sang phải. Ví dụ 가: viết ㄱ trước, rồi ㅏ bên phải. Với 고: viết ㄱ trước, rồi ㅗ ở dưới.',
      },
      {
        heading: '2. Nguyên âm dọc và ngang',
        body: 'Nguyên âm “dọc” (ㅏ ㅑ ㅓ ㅕ ㅣ và các kép liên quan) đặt bên phải phụ âm. Nguyên âm “ngang” (ㅗ ㅛ ㅜ ㅠ ㅡ) đặt dưới phụ âm. Hiểu quy tắc này giúp bạn ghép âm tiết không bị lệch ô.',
      },
      {
        heading: '3. Batchim viết sau cùng',
        body: 'Nếu có phụ âm cuối, viết sau khi đã hoàn thành phần phụ âm đầu + nguyên âm. Ví dụ 밥: ㅂ → ㅏ → ㅂ (dưới).',
      },
    ],
    vocabulary: [
      { korean: '쓰다', meaning: 'Viết' },
      { korean: '읽다', meaning: 'Đọc' },
      { korean: '소리', meaning: 'Âm thanh / cách đọc' },
      { korean: '글자', meaning: 'Chữ / ký tự' },
    ],
    examples: [
      { korean: '가 → ㄱ + ㅏ', meaning: 'Phụ âm + nguyên âm dọc' },
      { korean: '고 → ㄱ + ㅗ', meaning: 'Phụ âm + nguyên âm ngang' },
    ],
    tip: 'Viết tay mỗi chữ 5 lần trước khi chuyển bài — GT Tổng hợp coi luyện viết là bắt buộc ở giai đoạn bảng chữ.',
    alphabet: pick(['가', '고', '나', '노'], [
      { char: '가', romanization: 'ga', meaning: 'ㄱ + ㅏ (dọc)', speakAs: '가' },
      { char: '고', romanization: 'go', meaning: 'ㄱ + ㅗ (ngang)', speakAs: '고' },
      { char: '나', romanization: 'na', meaning: 'ㄴ + ㅏ', speakAs: '나' },
      { char: '노', romanization: 'no', meaning: 'ㄴ + ㅗ', speakAs: '노' },
    ]),
    alphabetTitle: 'Âm tiết mẫu — bấm để nghe',
  }),

  'Cấu trúc âm tiết': article({
    intro:
      'Trong GT Tổng hợp, âm tiết Hangul có hai khung cơ bản: (1) Phụ âm + Nguyên âm, (2) Phụ âm + Nguyên âm + Batchim. Mọi từ tiếng Hàn đều ghép từ các ô âm tiết này.',
    objectives: [
      'Nhận biết 2 cấu trúc âm tiết cơ bản',
      'Hiểu vai trò ㅇ khi âm tiết “bắt đầu bằng nguyên âm”',
      'Đọc được vài âm tiết đơn giản C+V',
      'Chuẩn bị sang học nguyên âm chi tiết',
    ],
    sections: [
      {
        heading: '1. Cấu trúc không batchim',
        body: 'Phụ âm đứng trước, nguyên âm đi kèm. Ví dụ: 나 (ㄴ+ㅏ), 미 (ㅁ+ㅣ), 소 (ㅅ+ㅗ). Đây là dạng bạn học nhiều nhất ở nửa đầu phần bảng chữ.',
      },
      {
        heading: '2. Cấu trúc có batchim',
        body: 'Thêm phụ âm cuối dưới cùng. Ví dụ: 산 (ㅅ+ㅏ+ㄴ), 물 (ㅁ+ㅜ+ㄹ), 밥 (ㅂ+ㅏ+ㅂ). Phần batchim sẽ học kỹ ở chương riêng theo đúng GT.',
      },
      {
        heading: '3. Khi “không có phụ âm đầu”',
        body: 'Vẫn phải viết ㅇ làm phụ âm đầu im lặng: 아 = ㅇ+ㅏ, 오 = ㅇ+ㅗ. Không được viết nguyên âm đứng một mình ngoài ô.',
      },
    ],
    vocabulary: [
      { korean: '아', meaning: 'Âm tiết a (ㅇ+ㅏ)' },
      { korean: '나', meaning: 'Tôi (thân mật)' },
      { korean: '산', meaning: 'Núi' },
      { korean: '물', meaning: 'Nước' },
    ],
    examples: [
      { korean: '나 + 물 = 나물? (khác nghĩa)', meaning: 'Ghép ô ≠ ghép nghĩa tùy tiện — học từng từ' },
      { korean: '한국', meaning: 'Hàn Quốc (한+국)' },
    ],
    tip: 'Mỗi khi thấy chữ mới, hãy tách: phụ âm đầu / nguyên âm / batchim — thói quen này giúp đọc nhanh như hướng dẫn trong GT.',
    alphabet: [
      { char: '아', romanization: 'a', meaning: 'ㅇ + ㅏ', speakAs: '아' },
      { char: '나', romanization: 'na', meaning: 'ㄴ + ㅏ', speakAs: '나' },
      { char: '미', romanization: 'mi', meaning: 'ㅁ + ㅣ', speakAs: '미' },
      { char: '소', romanization: 'so', meaning: 'ㅅ + ㅗ', speakAs: '소' },
      { char: '산', romanization: 'san', meaning: 'ㅅ + ㅏ + ㄴ', speakAs: '산' },
      { char: '물', romanization: 'mul', meaning: 'ㅁ + ㅜ + ㄹ', speakAs: '물' },
    ],
    alphabetTitle: 'Âm tiết mẫu — bấm để nghe phát âm',
  }),

  'ㅏ ㅑ': article({
    intro:
      'Theo thứ tự nguyên âm trong GT Tổng hợp, cặp đầu tiên là ㅏ (a) và ㅑ (ya). ㅑ được tạo bằng cách thêm một nét ngang vào ㅏ — biểu thị thêm âm “y”.',
    objectives: [
      'Viết và đọc đúng ㅏ, ㅑ',
      'Phân biệt a / ya',
      'Ghép với ㅇ thành 아, 야',
      'Nghe và bắt chước phát âm chuẩn',
    ],
    sections: [
      {
        heading: '1. ㅏ (a)',
        body: 'Nguyên âm dọc, đặt bên phải phụ âm. Miệng mở tự nhiên như “a” tiếng Việt. Âm tiết mẫu: 아.',
      },
      {
        heading: '2. ㅑ (ya)',
        body: 'Thêm một nét so với ㅏ. Đọc “ya”. Âm tiết mẫu: 야. Trong giao tiếp hay gặp ở đuôi thân mật hoặc tên riêng.',
      },
      {
        heading: '3. Luyện theo GT',
        body: 'Viết 아 / 야 mỗi chữ 10 lần, đọc to. Bấm từng ô bên dưới để nghe rồi nói theo.',
      },
    ],
    vocabulary: [
      { korean: '아', meaning: 'Âm tiết a' },
      { korean: '야', meaning: 'Âm tiết ya / gọi thân mật' },
      { korean: '가', meaning: 'ga (ㄱ+ㅏ)' },
      { korean: '나', meaning: 'na — tôi' },
    ],
    examples: [
      { korean: '아야!', meaning: 'Ối! (cảm thán)' },
      { korean: '야!', meaning: 'Này! (thân mật)' },
    ],
    tip: 'Nhìn số nét ngang bên phải: 1 nét = ㅏ, 2 nét = ㅑ.',
    alphabet: pick(['ㅏ', 'ㅑ'], BASIC_VOWELS).concat([
      { char: '아', romanization: 'a', meaning: 'ㅇ + ㅏ', speakAs: '아' },
      { char: '야', romanization: 'ya', meaning: 'ㅇ + ㅑ', speakAs: '야' },
      { char: '가', romanization: 'ga', meaning: 'ㄱ + ㅏ', speakAs: '가' },
      { char: '나', romanization: 'na', meaning: 'ㄴ + ㅏ', speakAs: '나' },
    ]),
    alphabetTitle: 'ㅏ ㅑ — bấm chữ để nghe phát âm',
  }),

  'ㅓ ㅕ': article({
    intro:
      'Cặp nguyên âm thứ hai trong GT: ㅓ (eo) và ㅕ (yeo). Đây là cặp người Việt thường nhầm với ㅗ / “ơ” — hãy nghe kỹ và so với ㅏ.',
    objectives: [
      'Đọc phân biệt ㅓ và ㅏ',
      'Viết đúng ㅓ, ㅕ',
      'Ghép 어, 여, 서, 저',
      'Tạo phản xạ nghe eo / yeo',
    ],
    sections: [
      {
        heading: '1. ㅓ (eo)',
        body: 'Nét dọc nằm bên trái hơn so với cảm giác của ㅏ (thanh ngang hướng ngược). Phát âm “ơ” mở, lưỡi thấp hơn ㅗ. Mẫu: 어.',
      },
      {
        heading: '2. ㅕ (yeo)',
        body: 'Thêm một nét so với ㅓ → “yeo”. Mẫu: 여. Xuất hiện nhiều trong từ như 여자 (phụ nữ).',
      },
      {
        heading: '3. So sánh nhanh',
        body: 'ㅏ = a (miệng mở rộng ngang). ㅓ = eo (miệng mở nhưng âm tối hơn). Luyện: 아–어–아–어.',
      },
    ],
    vocabulary: [
      { korean: '어', meaning: 'Âm tiết eo' },
      { korean: '여', meaning: 'Âm tiết yeo' },
      { korean: '서', meaning: 'seo' },
      { korean: '저', meaning: 'jeo — tôi (lịch sự)' },
    ],
    examples: [
      { korean: '어디?', meaning: 'Ở đâu?' },
      { korean: '여자', meaning: 'Phụ nữ / con gái' },
    ],
    tip: 'Ghi âm giọng bạn đọc 아/어 rồi so với nút nghe trên bảng chữ.',
    alphabet: pick(['ㅓ', 'ㅕ'], BASIC_VOWELS).concat([
      { char: '어', romanization: 'eo', meaning: 'ㅇ + ㅓ', speakAs: '어' },
      { char: '여', romanization: 'yeo', meaning: 'ㅇ + ㅕ', speakAs: '여' },
      { char: '서', romanization: 'seo', meaning: 'ㅅ + ㅓ', speakAs: '서' },
      { char: '저', romanization: 'jeo', meaning: 'ㅈ + ㅓ', speakAs: '저' },
    ]),
    alphabetTitle: 'ㅓ ㅕ — bấm chữ để nghe phát âm',
  }),

  'ㅗ ㅛ': article({
    intro:
      'Cặp nguyên âm ngang đầu tiên: ㅗ (o) và ㅛ (yo). Trong GT Tổng hợp, chúng đặt dưới phụ âm — khác hẳn bố cục ㅏ/ㅓ.',
    objectives: [
      'Viết nguyên âm ngang dưới phụ âm',
      'Đọc đúng o / yo',
      'Ghép 오, 요, 고, 소',
      'Không nhầm ㅗ với ㅜ',
    ],
    sections: [
      {
        heading: '1. ㅗ (o)',
        body: 'Nét ngắn hướng lên trên thân ngang. Môi tròn như “ô”. Mẫu: 오. Từ quen: 오다 (đến).',
      },
      {
        heading: '2. ㅛ (yo)',
        body: 'Hai nét ngắn phía trên → “yo”. Mẫu: 요. Rất hay gặp ở đuôi lịch sự 요.',
      },
      {
        heading: '3. Mẹo nhớ hình',
        body: 'ㅗ giống người đội mũ hướng lên (o). ㅜ sẽ học ở bài sau — nét hướng xuống (u).',
      },
    ],
    vocabulary: [
      { korean: '오', meaning: 'Âm tiết o / năm (số Hán)' },
      { korean: '요', meaning: 'Đuôi lịch sự · âm tiết yo' },
      { korean: '고', meaning: 'go' },
      { korean: '소', meaning: 'so — bò' },
    ],
    examples: [
      { korean: '오다', meaning: 'Đến' },
      { korean: '좋아요', meaning: 'Tốt / thích (lịch sự)' },
    ],
    tip: 'Khi viết 고: ㄱ trên, ㅗ dưới trong cùng một ô — đừng kéo ㅗ sang phải như ㅏ.',
    alphabet: pick(['ㅗ', 'ㅛ'], BASIC_VOWELS).concat([
      { char: '오', romanization: 'o', meaning: 'ㅇ + ㅗ', speakAs: '오' },
      { char: '요', romanization: 'yo', meaning: 'ㅇ + ㅛ', speakAs: '요' },
      { char: '고', romanization: 'go', meaning: 'ㄱ + ㅗ', speakAs: '고' },
      { char: '소', romanization: 'so', meaning: 'ㅅ + ㅗ', speakAs: '소' },
    ]),
    alphabetTitle: 'ㅗ ㅛ — bấm chữ để nghe phát âm',
  }),

  'ㅜ ㅠ': article({
    intro:
      'Cặp nguyên âm ngang thứ hai: ㅜ (u) và ㅠ (yu). So với ㅗ/ㅛ, nét phụ hướng xuống — GT dùng hình ảnh này để học sinh nhớ lâu.',
    objectives: [
      'Phân biệt ㅗ (lên) và ㅜ (xuống)',
      'Đọc u / yu',
      'Ghép 우, 유, 수, 무',
      'Luyện đọc cặp đối lập 오–우',
    ],
    sections: [
      {
        heading: '1. ㅜ (u)',
        body: 'Thân ngang, nét ngắn hướng xuống. Môi tròn nhỏ như “u”. Mẫu: 우. Từ: 우리 (chúng tôi).',
      },
      {
        heading: '2. ㅠ (yu)',
        body: 'Hai nét hướng xuống → “yu”. Mẫu: 유. Gặp trong 유리 (thủy tinh), tên riêng.',
      },
      {
        heading: '3. Luyện tối thiểu',
        body: 'Đọc liên tiếp: 오–우–요–유. Bấm bảng chữ và shadowing 3 lần.',
      },
    ],
    vocabulary: [
      { korean: '우', meaning: 'Âm tiết u' },
      { korean: '유', meaning: 'Âm tiết yu' },
      { korean: '우리', meaning: 'Chúng tôi / chúng ta' },
      { korean: '수', meaning: 'su' },
    ],
    examples: [
      { korean: '우리 집', meaning: 'Nhà chúng tôi' },
      { korean: '우유', meaning: 'Sữa' },
    ],
    tip: 'Nhớ: ㅗ mũi tên lên = o; ㅜ mũi tên xuống = u.',
    alphabet: pick(['ㅜ', 'ㅠ'], BASIC_VOWELS).concat([
      { char: '우', romanization: 'u', meaning: 'ㅇ + ㅜ', speakAs: '우' },
      { char: '유', romanization: 'yu', meaning: 'ㅇ + ㅠ', speakAs: '유' },
      { char: '수', romanization: 'su', meaning: 'ㅅ + ㅜ', speakAs: '수' },
      { char: '무', romanization: 'mu', meaning: 'ㅁ + ㅜ', speakAs: '무' },
    ]),
    alphabetTitle: 'ㅜ ㅠ — bấm chữ để nghe phát âm',
  }),

  'ㅡ ㅣ': article({
    intro:
      'Hai nguyên âm cuối trong nhóm 10 nguyên âm cơ bản của GT: ㅡ (eu) và ㅣ (i). ㅡ không có cặp “y-” đi kèm trong nhóm cơ bản.',
    objectives: [
      'Phát âm ㅡ (ư) không tròn môi',
      'Phát âm ㅣ rõ như “i”',
      'Ghép 으, 이, 그, 시',
      'Hoàn tất 10 nguyên âm cơ bản',
    ],
    sections: [
      {
        heading: '1. ㅡ (eu)',
        body: 'Nét ngang giữa ô. Môi không tròn, lưỡi kéo nhẹ về sau — gần “ư” tiếng Việt. Mẫu: 으. Có trong 음식 (đồ ăn), 그 (người đó).',
      },
      {
        heading: '2. ㅣ (i)',
        body: 'Nét dọc. Đọc “i”. Mẫu: 이. Nghĩa: răng / người này / số 2 (Hán). Rất phổ biến.',
      },
      {
        heading: '3. Tổng kết nhóm cơ bản',
        body: 'Bạn đã đủ 10 nguyên âm: ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ. Bài sau sẽ ôn cả bảng và sang nguyên âm kép.',
      },
    ],
    vocabulary: [
      { korean: '으', meaning: 'Âm tiết eu' },
      { korean: '이', meaning: 'i — người này / răng / số 2' },
      { korean: '그', meaning: 'Người đó / cái đó' },
      { korean: '시', meaning: 'si — giờ (Hán)' },
    ],
    examples: [
      { korean: '이름', meaning: 'Tên' },
      { korean: '어디', meaning: 'Ở đâu' },
    ],
    tip: 'ㅡ dễ bị đọc thành “ư” quá tròn môi kiểu Việt — giữ môi dẹt khi luyện.',
    alphabet: pick(['ㅡ', 'ㅣ'], BASIC_VOWELS).concat([
      { char: '으', romanization: 'eu', meaning: 'ㅇ + ㅡ', speakAs: '으' },
      { char: '이', romanization: 'i', meaning: 'ㅇ + ㅣ', speakAs: '이' },
      { char: '그', romanization: 'geu', meaning: 'ㄱ + ㅡ', speakAs: '그' },
      { char: '시', romanization: 'si', meaning: 'ㅅ + ㅣ', speakAs: '시' },
    ]),
    alphabetTitle: 'ㅡ ㅣ — bấm chữ để nghe phát âm',
  }),

  'Bảng nguyên âm cơ bản — luyện phát âm': article({
    intro:
      'Đây là bảng 10 nguyên âm cơ bản đúng thứ tự giáo trình Tổng hợp. Bấm từng chữ để nghe, rồi đọc theo. Luyện đến khi phản xạ được hình ↔ âm.',
    objectives: [
      'Thuộc lòng 10 nguyên âm cơ bản',
      'Nghe và nói lại từng âm',
      'Tự kiểm tra bằng cách che cột romanization',
      'Sang được phần nguyên âm kép',
    ],
    sections: [
      {
        heading: '1. Cách luyện (GT)',
        body: 'Đọc theo hàng: ㅏㅑ / ㅓㅕ / ㅗㅛ / ㅜㅠ / ㅡㅣ. Mỗi cặp 5 lần. Sau đó xáo trộn thứ tự và tự đọc.',
      },
      {
        heading: '2. Kiểm tra nhanh',
        body: 'Che phần phiên âm Latin, nhìn chữ Hangul và nói. Sai chữ nào thì bấm nút nghe lại chữ đó.',
      },
    ],
    vocabulary: BASIC_VOWELS.slice(0, 4).map((l) => ({
      korean: l.speakAs,
      meaning: `${l.char} (${l.romanization}) — ${l.meaning}`,
    })),
    examples: [
      { korean: '아이', meaning: 'Trẻ em (ㅏ+ㅣ)' },
      { korean: '우유', meaning: 'Sữa (ㅜ+ㅠ)' },
    ],
    tip: 'Mỗi ngày ôn lại bảng này 3 phút trước khi học bài mới — đúng tinh thần “làm quen → luyện tập” của GT Tổng hợp.',
    alphabet: BASIC_VOWELS,
    alphabetTitle: '10 nguyên âm cơ bản — bấm để nghe',
    readMinutes: 8,
  }),

  'Kiểm tra nguyên âm cơ bản': article({
    intro:
      'Bài kiểm tra ngắn sau phần nguyên âm cơ bản. Đọc lại bảng, làm tab Bài tập, rồi chỉ sang nguyên âm kép khi đạt trên 80%.',
    objectives: [
      'Tự đánh giá mức thuộc 10 nguyên âm',
      'Phát hiện cặp dễ nhầm (ㅏ/ㅓ, ㅗ/ㅜ)',
      'Ôn đúng chỗ yếu trước khi học tiếp',
    ],
    sections: [
      {
        heading: '1. Checklist',
        body: 'Bạn viết được cả 10 chữ không nhìn bảng? Phân biệt được 아–어 và 오–우 khi nghe? Nếu chưa, quay lại bài luyện phát âm.',
      },
      {
        heading: '2. Sang bài tiếp theo',
        body: 'Nguyên âm kép (이중모음) được tạo từ các nguyên âm cơ bản — nền tảng càng vững càng dễ nhớ ㅐㅔㅘ…',
      },
    ],
    vocabulary: [
      { korean: '아', meaning: 'a' },
      { korean: '어', meaning: 'eo' },
      { korean: '오', meaning: 'o' },
      { korean: '우', meaning: 'u' },
    ],
    examples: [
      { korean: '아 · 어 · 오 · 우 · 으 · 이', meaning: 'Chuỗi ôn tối thiểu' },
      { korean: '야 · 여 · 요 · 유', meaning: 'Chuỗi nguyên âm đôi' },
    ],
    tip: 'Làm bài tập ở tab bên cạnh ngay sau khi ôn bảng chữ.',
    alphabet: BASIC_VOWELS,
    alphabetTitle: 'Ôn nhanh trước khi kiểm tra — bấm để nghe',
    readMinutes: 4,
  }),

  'ㅐ ㅔ ㅒ ㅖ': article({
    intro:
      'Nhóm nguyên âm kép đầu trong GT: ㅐ(ae) ㅔ(e) ㅒ(yae) ㅖ(ye). Trong tiếng Hàn hiện đại, ㅐ và ㅔ thường nghe gần giống nhau — GT vẫn dạy viết và phân biệt chính tả.',
    objectives: [
      'Viết đúng ㅐ ㅔ ㅒ ㅖ',
      'Đọc ae / e / yae / ye',
      'Biết ㅐ≈ㅔ trong giao tiếp hiện đại nhưng khác chính tả',
      'Ghép 애 에 얘 예',
    ],
    sections: [
      {
        heading: '1. ㅐ và ㅔ',
        body: 'ㅐ = ㅏ+ㅣ; ㅔ = ㅓ+ㅣ. Phát âm thực tế gần “e/ê”. Học thuộc từ để không sai chính tả: 개 (chó), 게 (cua).',
      },
      {
        heading: '2. ㅒ và ㅖ',
        body: 'Thêm yếu tố y: 얘, 예. 예 nghĩa “vâng (trang trọng) / ví dụ / lễ”.',
      },
    ],
    vocabulary: [
      { korean: '애', meaning: 'ae' },
      { korean: '에', meaning: 'e — trợ từ nơi chốn' },
      { korean: '개', meaning: 'Chó' },
      { korean: '예', meaning: 'Vâng / ví dụ' },
    ],
    examples: [
      { korean: '어디에 있어요?', meaning: 'Ở đâu vậy?' },
      { korean: '예, 알겠습니다.', meaning: 'Vâng, tôi hiểu rồi.' },
    ],
    tip: 'Học kèm từ cố định để nhớ ㅐ vs ㅔ — đừng chỉ dựa vào tai.',
    alphabet: pick(['ㅐ', 'ㅔ', 'ㅒ', 'ㅖ'], COMPOUND_VOWELS).concat([
      { char: '애', romanization: 'ae', meaning: 'ㅇ + ㅐ', speakAs: '애' },
      { char: '에', romanization: 'e', meaning: 'ㅇ + ㅔ', speakAs: '에' },
      { char: '얘', romanization: 'yae', meaning: 'ㅇ + ㅒ', speakAs: '얘' },
      { char: '예', romanization: 'ye', meaning: 'ㅇ + ㅖ', speakAs: '예' },
    ]),
    alphabetTitle: 'ㅐ ㅔ ㅒ ㅖ — bấm để nghe',
  }),

  'ㅘ ㅙ ㅚ': article({
    intro:
      'Nhóm kép bắt đầu bằng ㅗ: ㅘ(wa) ㅙ(wae) ㅚ(oe). GT giải thích chúng là ㅗ kết hợp với ㅏ/ㅐ/ㅣ.',
    objectives: [
      'Hiểu công thức ghép từ ㅗ',
      'Đọc wa / wae / oe',
      'Nhớ từ khóa: 와, 왜, 외',
    ],
    sections: [
      {
        heading: '1. Công thức',
        body: 'ㅘ = ㅗ+ㅏ; ㅙ = ㅗ+ㅐ; ㅚ = ㅗ+ㅣ. Viết ㅗ trước rồi thêm phần còn lại trong cùng ô.',
      },
      {
        heading: '2. Từ hay gặp',
        body: '와 (và/với), 왜 (tại sao), 외국 (nước ngoài). Bấm bảng chữ và đọc theo.',
      },
    ],
    vocabulary: [
      { korean: '와', meaning: 'Và / với · đến (thân)' },
      { korean: '왜', meaning: 'Tại sao' },
      { korean: '외', meaning: 'oe' },
      { korean: '외국', meaning: 'Nước ngoài' },
    ],
    examples: [
      { korean: '왜요?', meaning: 'Tại sao vậy?' },
      { korean: '친구와 가요.', meaning: 'Đi với bạn.' },
    ],
    tip: 'ㅚ nhiều người đọc gần “we” — nghe nút phát âm và bắt chước.',
    alphabet: pick(['ㅘ', 'ㅙ', 'ㅚ'], COMPOUND_VOWELS).concat([
      { char: '와', romanization: 'wa', meaning: 'ㅇ + ㅘ', speakAs: '와' },
      { char: '왜', romanization: 'wae', meaning: 'ㅇ + ㅙ', speakAs: '왜' },
      { char: '외', romanization: 'oe', meaning: 'ㅇ + ㅚ', speakAs: '외' },
    ]),
    alphabetTitle: 'ㅘ ㅙ ㅚ — bấm để nghe',
  }),

  'ㅝ ㅞ ㅟ ㅢ': article({
    intro:
      'Nhóm kép còn lại: từ ㅜ tạo ㅝ ㅞ ㅟ, và ㅢ từ ㅡ+ㅣ. ㅢ có biến thể đọc tùy vị trí từ — GT sơ cấp dạy dạng cơ bản “ui”.',
    objectives: [
      'Đọc wo / we / wi / ui',
      'Nhớ 워 웨 위 의',
      'Biết 의 là trợ từ sở hữu “của”',
    ],
    sections: [
      {
        heading: '1. Từ ㅜ',
        body: 'ㅝ=ㅜ+ㅓ; ㅞ=ㅜ+ㅔ; ㅟ=ㅜ+ㅣ. Từ mẫu: 원 (won), 위 (trên), 웨이터 (bồi bàn — vay mượn).',
      },
      {
        heading: '2. ㅢ',
        body: 'Âm tiết 의. Là trợ từ sở hữu: 친구의 책 (sách của bạn). Ở vị trí khác có thể đọc ngắn hơn — tạm học “ui” ở sơ cấp.',
      },
    ],
    vocabulary: [
      { korean: '워', meaning: 'wo' },
      { korean: '위', meaning: 'Trên / vị trí cao' },
      { korean: '의', meaning: 'Của (trợ từ)' },
      { korean: '귀', meaning: 'Tai (ㄱ+ㅟ)' },
    ],
    examples: [
      { korean: '위의 사진', meaning: 'Ảnh phía trên' },
      { korean: '선생님의 이름', meaning: 'Tên của giáo viên' },
    ],
    tip: 'Ưu tiên thuộc 왜 / 와 / 의 / 위 — tần suất cao trong Sơ cấp 1.',
    alphabet: pick(['ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'], COMPOUND_VOWELS).concat([
      { char: '워', romanization: 'wo', meaning: 'ㅇ + ㅝ', speakAs: '워' },
      { char: '웨', romanization: 'we', meaning: 'ㅇ + ㅞ', speakAs: '웨' },
      { char: '위', romanization: 'wi', meaning: 'ㅇ + ㅟ', speakAs: '위' },
      { char: '의', romanization: 'ui', meaning: 'ㅇ + ㅢ', speakAs: '의' },
    ]),
    alphabetTitle: 'ㅝ ㅞ ㅟ ㅢ — bấm để nghe',
  }),

  'Bảng nguyên âm kép — luyện phát âm': article({
    intro:
      'Bảng đủ 11 nguyên âm kép theo GT Tổng hợp. Bấm từng ô, nghe, nói theo. Kết hợp ôn xen kẽ với 10 nguyên âm cơ bản.',
    objectives: [
      'Thuộc 11 nguyên âm kép',
      'Liên hệ được với nguyên âm gốc (ㅗ/ㅜ/ㅣ…)',
      'Đọc trôi các âm tiết mẫu',
    ],
    sections: [
      {
        heading: '1. Nhóm luyện',
        body: 'Nhóm e: ㅐㅔㅒㅖ. Nhóm w- từ ㅗ: ㅘㅙㅚ. Nhóm w- từ ㅜ: ㅝㅞㅟ. Riêng: ㅢ.',
      },
      {
        heading: '2. Mục tiêu',
        body: 'Nhìn chữ nói được trong 1 giây. Chưa đạt thì luyện thêm 10 phút/ngày.',
      },
    ],
    vocabulary: COMPOUND_VOWELS.slice(0, 4).map((l) => ({
      korean: l.speakAs,
      meaning: `${l.char} (${l.romanization})`,
    })),
    examples: [
      { korean: '왜 와요?', meaning: 'Sao lại đến?' },
      { korean: '의자', meaning: 'Ghế' },
    ],
    tip: 'In hoặc chép tay bảng này một lần — GT khuyến khích kết hợp viết và nghe.',
    alphabet: COMPOUND_VOWELS,
    alphabetTitle: '11 nguyên âm kép — bấm để nghe',
    readMinutes: 8,
  }),

  'Kiểm tra nguyên âm kép': article({
    intro: 'Kiểm tra ngắn phần nguyên âm kép trước khi sang phụ âm (자음) — đúng nhịp “làm quen → luyện → kiểm tra” của giáo trình.',
    objectives: [
      'Tự chấm điểm 11 nguyên âm kép',
      'Ôn các chữ hay sai: ㅚ ㅙ ㅢ',
      'Sẵn sàng học phụ âm',
    ],
    sections: [
      {
        heading: '1. Tự hỏi',
        body: 'Viết được 와 왜 외 워 위 의 không? Phân biệt được 애/에 trên giấy?',
      },
    ],
    vocabulary: [
      { korean: '와', meaning: 'wa' },
      { korean: '왜', meaning: 'wae' },
      { korean: '위', meaning: 'wi' },
      { korean: '의', meaning: 'ui' },
    ],
    examples: [
      { korean: '외래어', meaning: 'Từ ngoại lai' },
      { korean: '의사', meaning: 'Bác sĩ' },
    ],
    tip: 'Làm tab Bài tập rồi mới mở chương phụ âm.',
    alphabet: COMPOUND_VOWELS,
    alphabetTitle: 'Ôn nguyên âm kép — bấm để nghe',
    readMinutes: 4,
  }),

  'ㄱ ㄴ ㄷ ㄹ': article({
    intro:
      'Bốn phụ âm đầu theo thứ tự GT Tổng hợp: ㄱ ㄴ ㄷ ㄹ. Học kèm âm tiết với ㅏ để phát âm rõ (가 나 다 라).',
    objectives: [
      'Viết và đọc ㄱ ㄴ ㄷ ㄹ',
      'Biết biến thể đọc đầu/cuối từ của ㄱ ㄷ ㄹ',
      'Ghép 가 나 다 라',
    ],
    sections: [
      {
        heading: '1. Đặc điểm',
        body: 'ㄱ: g/k. ㄴ: n. ㄷ: d/t. ㄹ: r/l. GT nhấn mạnh luyện nghe vị trí đầu âm tiết trước, batchim để sau.',
      },
      {
        heading: '2. Luyện',
        body: 'Đọc 가–나–다–라 nhiều lần. Bấm nút nghe từng chữ.',
      },
    ],
    vocabulary: [
      { korean: '가', meaning: 'ga' },
      { korean: '나', meaning: 'Tôi' },
      { korean: '다', meaning: 'Tất cả / da' },
      { korean: '라', meaning: 'ra' },
    ],
    examples: [
      { korean: '가다', meaning: 'Đi' },
      { korean: '나라', meaning: 'Đất nước' },
    ],
    tip: 'ㄹ đầu từ gần “r” nhẹ; cuối từ gần “l” — sẽ rõ hơn khi học batchim.',
    alphabet: pick(['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'], BASIC_CONSONANTS).concat([
      { char: '가', romanization: 'ga', meaning: 'ㄱ + ㅏ', speakAs: '가' },
      { char: '나', romanization: 'na', meaning: 'ㄴ + ㅏ', speakAs: '나' },
      { char: '다', romanization: 'da', meaning: 'ㄷ + ㅏ', speakAs: '다' },
      { char: '라', romanization: 'ra', meaning: 'ㄹ + ㅏ', speakAs: '라' },
    ]),
    alphabetTitle: 'ㄱ ㄴ ㄷ ㄹ — bấm để nghe',
  }),

  'ㅁ ㅂ ㅅ ㅇ': article({
    intro:
      'Nhóm phụ âm tiếp theo: ㅁ ㅂ ㅅ ㅇ. Đặc biệt chú ý ㅇ — đầu âm tiết im lặng, cuối âm tiết đọc “ng”.',
    objectives: [
      'Đọc ㅁ ㅂ ㅅ ㅇ',
      'Hiểu hai vai trò của ㅇ',
      'Ghép 마 바 사 아',
    ],
    sections: [
      {
        heading: '1. ㅁ ㅂ ㅅ',
        body: 'ㅁ = m, ㅂ = b/p, ㅅ = s (trước ㅣ gần sh). Mẫu: 마 바 사.',
      },
      {
        heading: '2. ㅇ',
        body: 'Ở đầu: 아 오 우… không đọc phụ âm. Ở cuối (batchim): 강 방… đọc ng. Đây là điểm GT luôn nhắc lại.',
      },
    ],
    vocabulary: [
      { korean: '마', meaning: 'ma' },
      { korean: '바', meaning: 'ba' },
      { korean: '사', meaning: 'sa' },
      { korean: '아', meaning: 'a (ㅇ im lặng)' },
    ],
    examples: [
      { korean: '사람', meaning: 'Người' },
      { korean: '사과', meaning: 'Táo / xin lỗi (danh từ)' },
    ],
    tip: 'Thấy nguyên âm “đứng một mình” → luôn có ㅇ ở đầu ô.',
    alphabet: pick(['ㅁ', 'ㅂ', 'ㅅ', 'ㅇ'], BASIC_CONSONANTS).concat([
      { char: '마', romanization: 'ma', meaning: 'ㅁ + ㅏ', speakAs: '마' },
      { char: '바', romanization: 'ba', meaning: 'ㅂ + ㅏ', speakAs: '바' },
      { char: '사', romanization: 'sa', meaning: 'ㅅ + ㅏ', speakAs: '사' },
      { char: '아', romanization: 'a', meaning: 'ㅇ + ㅏ', speakAs: '아' },
    ]),
    alphabetTitle: 'ㅁ ㅂ ㅅ ㅇ — bấm để nghe',
  }),

  'ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ': article({
    intro:
      'Sáu phụ âm còn lại của nhóm cơ bản: ㅈ và các 격음 (bật hơi) ㅊ ㅋ ㅌ ㅍ cùng ㅎ. GT phân biệt rõ âm thường và âm bật hơi.',
    objectives: [
      'Đọc ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ',
      'Cảm nhận hơi mạnh ở ㅊㅋㅌㅍ',
      'Ghép 자 차 카 타 파 하',
    ],
    sections: [
      {
        heading: '1. ㅈ và ㅊ',
        body: 'ㅈ = j; ㅊ = ch (bật hơi). So cặp 자–차.',
      },
      {
        heading: '2. ㅋ ㅌ ㅍ ㅎ',
        body: 'ㅋ/ㅌ/ㅍ là bản bật hơi của ㄱ/ㄷ/ㅂ. ㅎ = h. Luyện: 카 타 파 하.',
      },
    ],
    vocabulary: [
      { korean: '자', meaning: 'ja' },
      { korean: '차', meaning: 'Xe / trà' },
      { korean: '하', meaning: 'ha' },
      { korean: '하나', meaning: 'Một (số thuần)' },
    ],
    examples: [
      { korean: '커피', meaning: 'Cà phê' },
      { korean: '하늘', meaning: 'Bầu trời' },
    ],
    tip: 'Đặt tờ giấy trước miệng: 카 타 파 làm giấy rung mạnh hơn 가 다 바.',
    alphabet: pick(['ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'], BASIC_CONSONANTS).concat([
      { char: '자', romanization: 'ja', meaning: 'ㅈ + ㅏ', speakAs: '자' },
      { char: '차', romanization: 'cha', meaning: 'ㅊ + ㅏ', speakAs: '차' },
      { char: '카', romanization: 'ka', meaning: 'ㅋ + ㅏ', speakAs: '카' },
      { char: '타', romanization: 'ta', meaning: 'ㅌ + ㅏ', speakAs: '타' },
      { char: '파', romanization: 'pa', meaning: 'ㅍ + ㅏ', speakAs: '파' },
      { char: '하', romanization: 'ha', meaning: 'ㅎ + ㅏ', speakAs: '하' },
    ]),
    alphabetTitle: 'ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ — bấm để nghe',
  }),

  'Bảng phụ âm cơ bản — luyện phát âm': article({
    intro:
      'Bảng đủ 14 phụ âm cơ bản đúng giáo trình. Bấm từng phụ âm (sẽ nghe âm tiết mẫu với ㅏ) để luyện.',
    objectives: [
      'Thuộc 14 phụ âm cơ bản',
      'Đọc trôi chuỗi 가나다라…하',
      'Chuẩn bị học phụ âm đôi',
    ],
    sections: [
      {
        heading: '1. Thứ tự ôn',
        body: 'ㄱㄴㄷㄹ ㅁㅂㅅㅇ ㅈㅊㅋㅌㅍㅎ — đọc như bảng chữ cái. Đây cũng là thứ tự tra từ cuối sách GT Tổng hợp.',
      },
    ],
    vocabulary: [
      { korean: '가', meaning: 'ㄱ' },
      { korean: '나', meaning: 'ㄴ' },
      { korean: '다', meaning: 'ㄷ' },
      { korean: '마', meaning: 'ㅁ' },
    ],
    examples: [
      { korean: '가나다라마바사', meaning: 'Chuỗi ôn phụ âm đầu' },
      { korean: '아자차카타파하', meaning: 'Chuỗi ôn tiếp' },
    ],
    tip: 'Đọc bảng phụ âm mỗi sáng 2 phút — hiệu quả hơn học dồn.',
    alphabet: BASIC_CONSONANTS,
    alphabetTitle: '14 phụ âm cơ bản — bấm để nghe',
    readMinutes: 8,
  }),

  'Kiểm tra phụ âm cơ bản': article({
    intro: 'Tự kiểm tra 14 phụ âm trước khi sang 쌍자음 (phụ âm đôi).',
    objectives: [
      'Viết thuộc 14 phụ âm',
      'Phân biệt ㄱ/ㅋ, ㄷ/ㅌ, ㅂ/ㅍ, ㅈ/ㅊ',
      'Sẵn sàng học âm đôi',
    ],
    sections: [
      {
        heading: '1. Checklist',
        body: 'Nghe 가/카, 다/타, 바/파, 자/차 — bạn phân biệt được không? Nếu chưa, ôn lại bài 격음.',
      },
    ],
    vocabulary: [
      { korean: '가', meaning: 'ga' },
      { korean: '카', meaning: 'ka' },
      { korean: '다', meaning: 'da' },
      { korean: '타', meaning: 'ta' },
    ],
    examples: [
      { korean: '바다', meaning: 'Biển' },
      { korean: '하다', meaning: 'Làm' },
    ],
    tip: 'Tab Bài tập giúp chốt kiến thức trước chương sau.',
    alphabet: BASIC_CONSONANTS,
    alphabetTitle: 'Ôn phụ âm — bấm để nghe',
    readMinutes: 4,
  }),

  'ㄲ ㄸ ㅃ ㅆ ㅉ': article({
    intro:
      'Năm phụ âm đôi (쌍자음 / 경음) trong GT: ㄲ ㄸ ㅃ ㅆ ㅉ. Đọc căng, họng siết, không bật hơi như 격음.',
    objectives: [
      'Viết và nhận biết 5 phụ âm đôi',
      'Đọc kk tt pp ss jj',
      'So với âm thường tương ứng',
    ],
    sections: [
      {
        heading: '1. Cách phát âm',
        body: 'Siết thanh quản nhẹ, không thổi hơi mạnh. 까 khác 가 (thường) và 카 (bật hơi).',
      },
      {
        heading: '2. Từ mẫu',
        body: '꼬리 (đuôi), 띠 (đai), 빵 (bánh mì), 싸다 (rẻ), 짜다 (mặn).',
      },
    ],
    vocabulary: [
      { korean: '까', meaning: 'kka' },
      { korean: '따', meaning: 'tta' },
      { korean: '빠', meaning: 'ppa' },
      { korean: '싸', meaning: 'ssa' },
    ],
    examples: [
      { korean: '싸다', meaning: 'Rẻ' },
      { korean: '짜다', meaning: 'Mặn' },
    ],
    tip: 'Đừng đọc phụ âm đôi như âm bật hơi — hơi ít hơn 카/타/파.',
    alphabet: DOUBLE_CONSONANTS.concat([
      { char: '까', romanization: 'kka', meaning: 'ㄲ + ㅏ', speakAs: '까' },
      { char: '따', romanization: 'tta', meaning: 'ㄸ + ㅏ', speakAs: '따' },
      { char: '빠', romanization: 'ppa', meaning: 'ㅃ + ㅏ', speakAs: '빠' },
      { char: '싸', romanization: 'ssa', meaning: 'ㅆ + ㅏ', speakAs: '싸' },
      { char: '짜', romanization: 'jja', meaning: 'ㅉ + ㅏ', speakAs: '짜' },
    ]),
    alphabetTitle: 'ㄲ ㄸ ㅃ ㅆ ㅉ — bấm để nghe',
  }),

  'Phân biệt 평음 · 경음 · 격음': article({
    intro:
      'GT Tổng hợp phân 3 bậc phụ âm: 평음 (thường: ㄱㄷㅂㅈㅅ), 경음 (đôi: ㄲㄸㅃㅉㅆ), 격음 (bật hơi: ㅋㅌㅍㅊ). Đây là phần quan trọng để nghe đúng tiếng Hàn.',
    objectives: [
      'Hiểu 3 bậc phụ âm',
      'Luyện bộ ba 가–까–카, 다–따–타, 바–빠–파, 자–짜–차',
      'Giảm lỗi nghe nhầm khi vào Sơ cấp 1',
    ],
    sections: [
      {
        heading: '1. Bảng đối chiếu',
        body: 'ㄱ–ㄲ–ㅋ | ㄷ–ㄸ–ㅌ | ㅂ–ㅃ–ㅍ | ㅈ–ㅉ–ㅊ | ㅅ–ㅆ (không có 격음 riêng tương ứng kiểu ㅎ).',
      },
      {
        heading: '2. Cách luyện',
        body: 'Bấm lần lượt từng ô trong bảng bên dưới, cảm nhận độ căng và hơi. Ghi âm giọng mình và so.',
      },
    ],
    vocabulary: [
      { korean: '갈', meaning: '평음 ㄱ' },
      { korean: '깔', meaning: '경음 ㄲ' },
      { korean: '칼', meaning: '격음 ㅋ — dao' },
      { korean: '불', meaning: '평음 ㅂ — lửa' },
    ],
    examples: [
      { korean: '불 / 풀', meaning: 'Lửa / cỏ — ㅂ vs ㅍ' },
      { korean: '달 / 딸 / 탈', meaning: 'Tháng·trăng / con gái / cởi·mặt nạ' },
    ],
    tip: 'Người Việt hay bỏ qua độ căng — dành thêm thời gian cho bài này.',
    alphabet: [
      { char: '가', romanization: 'ga', meaning: '평음', speakAs: '가' },
      { char: '까', romanization: 'kka', meaning: '경음', speakAs: '까' },
      { char: '카', romanization: 'ka', meaning: '격음', speakAs: '카' },
      { char: '다', romanization: 'da', meaning: '평음', speakAs: '다' },
      { char: '따', romanization: 'tta', meaning: '경음', speakAs: '따' },
      { char: '타', romanization: 'ta', meaning: '격음', speakAs: '타' },
      { char: '바', romanization: 'ba', meaning: '평음', speakAs: '바' },
      { char: '빠', romanization: 'ppa', meaning: '경음', speakAs: '빠' },
      { char: '파', romanization: 'pa', meaning: '격음', speakAs: '파' },
      { char: '자', romanization: 'ja', meaning: '평음', speakAs: '자' },
      { char: '짜', romanization: 'jja', meaning: '경음', speakAs: '짜' },
      { char: '차', romanization: 'cha', meaning: '격음', speakAs: '차' },
    ],
    alphabetTitle: '평음 · 경음 · 격음 — bấm để so sánh',
    readMinutes: 8,
  }),

  'Bảng phụ âm đôi — luyện phát âm': article({
    intro: 'Ôn 5 phụ âm đôi và các âm tiết mẫu. Bấm để nghe, nói theo đến khi phản xạ.',
    objectives: [
      'Thuộc ㄲ ㄸ ㅃ ㅆ ㅉ',
      'Đọc được từ có phụ âm đôi trong Sơ cấp',
    ],
    sections: [
      {
        heading: '1. Luyện',
        body: 'Đọc 까따빠싸짜 liên tục. Xen kẽ với 가다바사자 để cảm nhận khác biệt.',
      },
    ],
    vocabulary: [
      { korean: '빵', meaning: 'Bánh mì' },
      { korean: '씨', meaning: 'Hạt / cách gọi lịch sự' },
      { korean: '꼬리', meaning: 'Đuôi' },
      { korean: '짜다', meaning: 'Mặn' },
    ],
    examples: [
      { korean: '빵 있어요?', meaning: 'Có bánh mì không?' },
      { korean: '너무 짜요.', meaning: 'Mặn quá.' },
    ],
    tip: 'Flashcard phụ âm mạnh cũng dùng để ôn song song.',
    alphabet: DOUBLE_CONSONANTS,
    alphabetTitle: 'Phụ âm đôi — bấm để nghe',
    readMinutes: 5,
  }),

  'Kiểm tra phụ âm đôi': article({
    intro: 'Chốt phần phụ âm trước khi sang ghép âm & batchim — trọng tâm phần bảng chữ của GT.',
    objectives: [
      'Phân biệt 3 bậc phụ âm',
      'Viết đúng 5 phụ âm đôi',
      'Sẵn sàng học batchim',
    ],
    sections: [
      {
        heading: '1. Checklist',
        body: 'Nghe 가다/까다/카다 — chọn đúng bậc. Viết lại 5 đôi từ trí nhớ.',
      },
    ],
    vocabulary: [
      { korean: '싸다', meaning: 'Rẻ' },
      { korean: '타다', meaning: 'Đi (xe) / cháy' },
      { korean: '자다', meaning: 'Ngủ' },
      { korean: '차다', meaning: 'Lạnh / đá' },
    ],
    examples: [
      { korean: '싸요 / 짜요', meaning: 'Rẻ / mặn' },
      { korean: '불 / 풀', meaning: 'Lửa / cỏ' },
    ],
    tip: 'Làm bài tập rồi sang chương ghép âm.',
    alphabet: DOUBLE_CONSONANTS,
    alphabetTitle: 'Ôn phụ âm đôi — bấm để nghe',
    readMinutes: 4,
  }),

  'Ghép phụ âm + nguyên âm': article({
    intro:
      'Theo GT Tổng hợp, sau khi biết nguyên âm và phụ âm, bạn luyện ghép thành âm tiết hoàn chỉnh trong ô vuông — bước bắt buộc trước batchim.',
    objectives: [
      'Ghép nhanh C + V theo bố cục dọc/ngang',
      'Đọc bảng âm tiết mẫu',
      'Tăng tốc độ nhận chữ',
    ],
    sections: [
      {
        heading: '1. Quy trình ghép',
        body: 'Chọn phụ âm → chọn nguyên âm → đặt đúng vị trí (phải hoặc dưới) → đọc. Ví dụ ㅎ+ㅏ=하, ㅎ+ㅗ=호.',
      },
      {
        heading: '2. Luyện đọc',
        body: 'Bấm từng âm tiết bên dưới. Đây là vốn để đọc từ ở Bài 1 GT Sơ cấp 1.',
      },
    ],
    vocabulary: [
      { korean: '하나', meaning: 'Một' },
      { korean: '코', meaning: 'Mũi' },
      { korean: '손', meaning: 'Tay (có batchim — xem sau)' },
      { korean: '비', meaning: 'Mưa' },
    ],
    examples: [
      { korean: '히 · 하 · 호 · 후 · 흐', meaning: 'ㅎ ghép nhiều nguyên âm' },
      { korean: '마 · 미 · 무 · 메 · 모', meaning: 'ㅁ ghép luyện' },
    ],
    tip: 'Đặt đồng hồ 1 phút: đọc càng nhiều ô càng tốt — tốc độ nhận chữ rất quan trọng.',
    alphabet: [
      { char: '하', romanization: 'ha', meaning: 'ㅎ + ㅏ', speakAs: '하' },
      { char: '호', romanization: 'ho', meaning: 'ㅎ + ㅗ', speakAs: '호' },
      { char: '후', romanization: 'hu', meaning: 'ㅎ + ㅜ', speakAs: '후' },
      { char: '히', romanization: 'hi', meaning: 'ㅎ + ㅣ', speakAs: '히' },
      { char: '마', romanization: 'ma', meaning: 'ㅁ + ㅏ', speakAs: '마' },
      { char: '미', romanization: 'mi', meaning: 'ㅁ + ㅣ', speakAs: '미' },
      { char: '무', romanization: 'mu', meaning: 'ㅁ + ㅜ', speakAs: '무' },
      { char: '모', romanization: 'mo', meaning: 'ㅁ + ㅗ', speakAs: '모' },
      { char: '네', romanization: 'ne', meaning: 'ㄴ + ㅔ', speakAs: '네' },
      { char: '가', romanization: 'ga', meaning: 'ㄱ + ㅏ', speakAs: '가' },
      { char: '고', romanization: 'go', meaning: 'ㄱ + ㅗ', speakAs: '고' },
      { char: '기', romanization: 'gi', meaning: 'ㄱ + ㅣ', speakAs: '기' },
    ],
    alphabetTitle: 'Âm tiết ghép — bấm để nghe',
    readMinutes: 7,
  }),

  'Bảy âm batchim cơ bản': article({
    intro:
      'Giáo trình dạy batchim (받침) qua 7 âm đại diện: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ. Các batchim khác quy về một trong 7 âm này khi đọc ở cuối.',
    objectives: [
      'Nhớ 7 âm batchim đại diện',
      'Đọc đúng âm cuối ô',
      'Hiểu “nhiều chữ viết — ít âm đọc” ở vị trí cuối',
    ],
    sections: [
      {
        heading: '1. Bảy âm',
        body: 'Cuối âm tiết chỉ còn khoảng 7 cách đọc chính. Ví dụ ㅅ ㅈ ㅊ ㅌ ㅎ ở cuối thường đọc gần như ㄷ (âm “t”).',
      },
      {
        heading: '2. Ví dụ GT',
        body: '국(-k), 산(-n), 곧(-t), 말(-l), 밤(-m), 밥(-p), 방(-ng). Bấm bảng để nghe.',
      },
    ],
    vocabulary: [
      { korean: '국', meaning: 'Canh / nước' },
      { korean: '산', meaning: 'Núi' },
      { korean: '밥', meaning: 'Cơm' },
      { korean: '방', meaning: 'Phòng' },
    ],
    examples: [
      { korean: '옷', meaning: 'Quần áo — viết ㅅ, đọc gần ot' },
      { korean: '꽃', meaning: 'Hoa — viết ㅊ, đọc gần kkot' },
    ],
    tip: 'Học thuộc 7 âm trước, sau đó mới học bảng quy đổi chi tiết.',
    alphabet: BATCHIM_SOUNDS,
    alphabetTitle: '7 âm batchim — bấm để nghe',
    readMinutes: 7,
  }),

  'Cách đọc batchim theo GT Tổng hợp': article({
    intro:
      'Bài này hệ thống hóa quy tắc đọc batchim như phần bảng chữ của GT: chữ viết có thể khác, nhưng âm đọc cuối quy về nhóm đại diện.',
    objectives: [
      'Áp dụng quy tắc quy đổi batchim',
      'Đọc đúng 옷 꽃 부엌…',
      'Tránh đọc “s” cho batchim ㅅ',
    ],
    sections: [
      {
        heading: '1. Quy về ㄱ',
        body: 'ㄱ ㅋ ㄲ cuối từ → âm gần k. Ví dụ 부엌 (nhà bếp).',
      },
      {
        heading: '2. Quy về ㄷ (âm t)',
        body: 'ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ… cuối từ → gần t. Ví dụ 옷, 있다(ở dạng gốc), 꽃.',
      },
      {
        heading: '3. Các âm còn lại',
        body: 'ㄴ→n, ㄹ→l, ㅁ→m, ㅂ·ㅍ→p, ㅇ→ng. Luyện với bảng bên dưới.',
      },
    ],
    vocabulary: [
      { korean: '옷', meaning: 'Quần áo' },
      { korean: '꽃', meaning: 'Hoa' },
      { korean: '부엌', meaning: 'Nhà bếp' },
      { korean: '값', meaning: 'Giá' },
    ],
    examples: [
      { korean: '옷이', meaning: 'Khi nối âm, ㅅ có thể đọc lại s — học ở sơ cấp' },
      { korean: '꽃이', meaning: 'Hoa + trợ từ — nối âm' },
    ],
    tip: 'Ở giai đoạn bảng chữ: ưu tiên đọc đúng âm cuối khi đứng một mình; nối âm học kỹ ở Sơ cấp 1.',
    alphabet: [
      { char: '옷', romanization: 'ot', meaning: 'ㅅ → âm t', speakAs: '옷' },
      { char: '꽃', romanization: 'kkot', meaning: 'ㅊ → âm t', speakAs: '꽃' },
      { char: '부엌', romanization: 'bueok', meaning: 'ㅋ → âm k', speakAs: '부엌' },
      { char: '값', romanization: 'gap', meaning: 'ㅄ → âm p', speakAs: '값' },
      { char: '없다', romanization: 'eopda', meaning: 'ㅄ + động từ', speakAs: '없다' },
      { char: '있다', romanization: 'itda', meaning: 'ㅆ → âm t (gốc)', speakAs: '있다' },
      ...BATCHIM_SOUNDS,
    ],
    alphabetTitle: 'Batchim thực hành — bấm để nghe',
    readMinutes: 8,
  }),

  'Đọc từ vựng sơ cấp': article({
    intro:
      'Áp dụng Hangul vào các từ xuất hiện sớm trong GT Sơ cấp 1 (chào hỏi, trường lớp, đồ vật). Bấm từng từ để nghe phát âm chuẩn.',
    objectives: [
      'Đọc từ 1–2 âm tiết có/không batchim',
      'Gắn chữ với nghĩa tiếng Việt',
      'Tạo đà vào Bài 1 của giáo trình',
    ],
    sections: [
      {
        heading: '1. Chiến lược đọc',
        body: 'Tách từng ô → đọc phụ âm+nguyên âm → thêm batchim → nối các ô thành từ.',
      },
      {
        heading: '2. Từ nên thuộc',
        body: 'Các từ bên dưới chọn lọc theo tinh thần từ vựng đầu GT — nghe và nhắc lại.',
      },
    ],
    vocabulary: [
      { korean: '안녕', meaning: 'Xin chào (gốc)' },
      { korean: '학교', meaning: 'Trường học' },
      { korean: '선생', meaning: 'Thầy/cô (gốc)' },
      { korean: '학생', meaning: 'Học sinh' },
    ],
    examples: [
      { korean: '안녕하세요', meaning: 'Xin chào (lịch sự)' },
      { korean: '선생님', meaning: 'Thầy/cô ạ' },
    ],
    tip: 'Sau bài này, mở flashcard “Từ vựng đầu tiên” để củng cố.',
    alphabet: [
      { char: '나', romanization: 'na', meaning: 'Tôi', speakAs: '나' },
      { char: '저', romanization: 'jeo', meaning: 'Tôi (lịch sự)', speakAs: '저' },
      { char: '이름', romanization: 'ireum', meaning: 'Tên', speakAs: '이름' },
      { char: '한국', romanization: 'hanguk', meaning: 'Hàn Quốc', speakAs: '한국' },
      { char: '한글', romanization: 'hangeul', meaning: 'Hangul', speakAs: '한글' },
      { char: '사람', romanization: 'saram', meaning: 'Người', speakAs: '사람' },
      { char: '친구', romanization: 'chingu', meaning: 'Bạn', speakAs: '친구' },
      { char: '학교', romanization: 'hakgyo', meaning: 'Trường', speakAs: '학교' },
      { char: '학생', romanization: 'haksaeng', meaning: 'Học sinh', speakAs: '학생' },
      { char: '선생님', romanization: 'seonsaengnim', meaning: 'Thầy/cô', speakAs: '선생님' },
      { char: '안녕하세요', romanization: 'annyeonghaseyo', meaning: 'Xin chào', speakAs: '안녕하세요' },
      { char: '감사합니다', romanization: 'gamsahamnida', meaning: 'Cảm ơn', speakAs: '감사합니다' },
    ],
    alphabetTitle: 'Từ vựng sơ cấp — bấm để nghe phát âm',
    readMinutes: 8,
  }),

  'Luyện phát âm tổng hợp': article({
    intro:
      'Bài luyện tổng hợp phần bảng chữ: nguyên âm, phụ âm, batchim và từ ngắn. Bấm liên tục và shadowing như giờ luyện trên lớp theo GT.',
    objectives: [
      'Ôn xen kẽ mọi nhóm chữ',
      'Tăng độ trôi chảy khi đọc to',
      'Chuẩn bị bài ôn cuối khóa',
    ],
    sections: [
      {
        heading: '1. Quy trình 15 phút',
        body: '5 phút nguyên âm → 5 phút phụ âm → 5 phút từ có batchim. Mỗi mục đều dùng nút nghe.',
      },
    ],
    vocabulary: [
      { korean: '밥', meaning: 'Cơm' },
      { korean: '물', meaning: 'Nước' },
      { korean: '집', meaning: 'Nhà' },
      { korean: '책', meaning: 'Sách' },
    ],
    examples: [
      { korean: '물 주세요', meaning: 'Cho xin nước' },
      { korean: '책 읽어요', meaning: 'Đọc sách' },
    ],
    tip: 'Không bỏ qua chữ đã thuộc — duy trì phản xạ mỗi ngày.',
    alphabet: [
      ...BASIC_VOWELS.slice(0, 6),
      ...BASIC_CONSONANTS.slice(0, 6),
      { char: '밥', romanization: 'bap', meaning: 'Cơm', speakAs: '밥' },
      { char: '물', romanization: 'mul', meaning: 'Nước', speakAs: '물' },
      { char: '집', romanization: 'jip', meaning: 'Nhà', speakAs: '집' },
      { char: '책', romanization: 'chaek', meaning: 'Sách', speakAs: '책' },
    ],
    alphabetTitle: 'Luyện tổng hợp — bấm để nghe',
    readMinutes: 10,
  }),

  'Ôn toàn bộ bảng chữ cái': article({
    intro:
      'Bảng tổng hợp toàn bộ chữ cái cơ bản theo GT: 10 nguyên âm + 11 kép + 14 phụ âm + 5 đôi. Dùng như trang tra cứu cuối phần Hangul.',
    objectives: [
      'Nhìn lại toàn hệ thống Hangul',
      'Tự kiểm tra chỗ còn yếu',
      'Chuẩn bị viết tên và kiểm tra cuối',
    ],
    sections: [
      {
        heading: '1. Cách dùng bảng',
        body: 'Cuộn và bấm từng nhóm. Đánh dấu chữ còn đọc sai để ôn riêng.',
      },
    ],
    vocabulary: [
      { korean: '모음', meaning: 'Nguyên âm' },
      { korean: '자음', meaning: 'Phụ âm' },
      { korean: '한글', meaning: 'Hangul' },
      { korean: '완성', meaning: 'Hoàn thành' },
    ],
    examples: [
      { korean: '한글을 다 배웠어요.', meaning: 'Tôi đã học xong Hangul.' },
      { korean: '이제 책을 읽어요.', meaning: 'Giờ tôi đọc sách giáo trình.' },
    ],
    tip: 'In tâm trí: 40 đơn vị chữ (21 nguyên âm + 19 phụ âm) là đủ để đọc mọi âm tiết.',
    alphabet: [...BASIC_VOWELS, ...COMPOUND_VOWELS, ...BASIC_CONSONANTS, ...DOUBLE_CONSONANTS],
    alphabetTitle: 'Toàn bộ bảng chữ — bấm từng chữ để nghe',
    readMinutes: 12,
  }),

  'Viết tên bằng Hangul': article({
    intro:
      'Bài thực hành cuối GT phần bảng chữ: phiên âm tên tiếng Việt sang Hangul. Không có một cách duy nhất — ưu tiên gần đúng và dễ đọc với người Hàn.',
    objectives: [
      'Chọn phụ âm/nguyên âm gần âm tiếng Việt',
      'Viết tên trong từng ô âm tiết',
      'Đọc được tên mình bằng tiếng Hàn',
    ],
    sections: [
      {
        heading: '1. Nguyên tắc phiên âm',
        body: 'Ưu tiên âm gần nhất. Ví dụ H → ㅎ, V/Ph → ㅂ/ㅍ, cuối “ng” → ㅇ. Hỏi giáo viên chỉnh lại cho chuẩn lớp bạn.',
      },
      {
        heading: '2. Ví dụ tham khảo',
        body: 'Minh → 민, Hieu → 히에우 / 히우 (tùy chọn), Anh → 앙 / 안. Bấm các mẫu bên dưới để nghe.',
      },
    ],
    vocabulary: [
      { korean: '이름', meaning: 'Tên' },
      { korean: '제 이름은', meaning: 'Tên tôi là…' },
      { korean: '한국 이름', meaning: 'Tên tiếng Hàn' },
      { korean: '뭐예요?', meaning: 'Là gì vậy?' },
    ],
    examples: [
      { korean: '제 이름은 민이에요.', meaning: 'Tên tôi là Minh.' },
      { korean: '이름이 뭐예요?', meaning: 'Bạn tên gì?' },
    ],
    tip: 'Viết 3 phương án tên rồi chọn phương án giáo viên/bạn Hàn đọc tự nhiên nhất.',
    alphabet: [
      { char: '민', romanization: 'min', meaning: 'Minh (gần)', speakAs: '민' },
      { char: '히우', romanization: 'hiu', meaning: 'Hieu (gần)', speakAs: '히우' },
      { char: '안', romanization: 'an', meaning: 'Anh (gần)', speakAs: '안' },
      { char: '란', romanization: 'ran', meaning: 'Lan (gần)', speakAs: '란' },
      { char: '풍', romanization: 'pung', meaning: 'Phong (gần)', speakAs: '풍' },
      { char: '제 이름', romanization: 'je ireum', meaning: 'Tên tôi', speakAs: '제 이름' },
    ],
    alphabetTitle: 'Mẫu tên — bấm để nghe',
    readMinutes: 6,
  }),

  'Bài kiểm tra cuối khóa': article({
    intro:
      'Kiểm tra tổng hợp phần bảng chữ cái tương đương cuối “Bài mở đầu” GT Tổng hợp trước khi vào Bài 1 Sơ cấp 1. Làm tab Bài tập và ôn bảng chữ bằng nút nghe.',
    objectives: [
      'Đánh giá toàn bộ Hangul đã học',
      'Xác nhận sẵn sàng học Sơ cấp 1',
      'Lập kế hoạch ôn chỗ còn yếu',
    ],
    sections: [
      {
        heading: '1. Phạm vi kiểm tra',
        body: '10 nguyên âm cơ bản, 11 nguyên âm kép, 14+5 phụ âm, ghép âm tiết, 7 âm batchim, đọc từ ngắn.',
      },
      {
        heading: '2. Bước tiếp theo',
        body: 'Đạt yêu cầu → chuyển khóa «Tiếng Hàn sơ cấp 1» (bám 15 bài đầu GT Cho Hang Rok). Chưa đạt → ôn lại các bài Flashcard/bảng chữ tương ứng.',
      },
    ],
    vocabulary: [
      { korean: '시험', meaning: 'Bài kiểm tra' },
      { korean: '시작', meaning: 'Bắt đầu' },
      { korean: '끝', meaning: 'Kết thúc' },
      { korean: '합격', meaning: 'Đạt / đậu' },
    ],
    examples: [
      { korean: '시험을 봐요.', meaning: 'Làm bài kiểm tra.' },
      { korean: '한글을 잘 알아요.', meaning: 'Tôi biết Hangul rõ.' },
    ],
    tip: 'Trước khi làm bài: ôn nhanh toàn bảng ở bài trước trong 5 phút.',
    alphabet: [
      ...BASIC_VOWELS.slice(0, 5),
      ...BASIC_CONSONANTS.slice(0, 5),
      ...BATCHIM_SOUNDS.slice(0, 4),
      { char: '한글', romanization: 'hangeul', meaning: 'Hangul', speakAs: '한글' },
      { char: '한국어', romanization: 'hangugeo', meaning: 'Tiếng Hàn', speakAs: '한국어' },
    ],
    alphabetTitle: 'Ôn nhanh trước kiểm tra — bấm để nghe',
    readMinutes: 5,
  }),
}

export function getHangulLesson(title: string): HangulLessonContent | undefined {
  return HANGUL_LESSONS[title]
}
