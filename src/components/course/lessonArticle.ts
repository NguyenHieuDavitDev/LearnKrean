import { getHangulLesson } from '../../data/hangulLessons'

export type AlphabetLetter = {
  char: string
  romanization: string
  meaning: string
  /** Chuỗi đưa vào TTS (thường là âm tiết mẫu, không phải jamo trần). */
  speakAs: string
}

export type LessonArticle = {
  intro: string
  objectives: string[]
  sections: { heading: string; body: string }[]
  vocabulary: { korean: string; meaning: string }[]
  examples: { korean: string; meaning: string }[]
  tip: string
  readMinutes: number
  alphabet?: AlphabetLetter[]
  alphabetTitle?: string
}

function hashSeed(text: string): number {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
  return h
}

const VOCAB_POOL = [
  { korean: '안녕하세요', meaning: 'Xin chào (lịch sự)' },
  { korean: '감사합니다', meaning: 'Cảm ơn' },
  { korean: '죄송합니다', meaning: 'Xin lỗi' },
  { korean: '네', meaning: 'Vâng / Có' },
  { korean: '아니요', meaning: 'Không' },
  { korean: '오늘', meaning: 'Hôm nay' },
  { korean: '내일', meaning: 'Ngày mai' },
  { korean: '공부하다', meaning: 'Học' },
  { korean: '말하다', meaning: 'Nói' },
  { korean: '듣다', meaning: 'Nghe' },
  { korean: '읽다', meaning: 'Đọc' },
  { korean: '쓰다', meaning: 'Viết' },
  { korean: '친구', meaning: 'Bạn bè' },
  { korean: '학교', meaning: 'Trường học' },
  { korean: '시간', meaning: 'Thời gian' },
  { korean: '중요하다', meaning: 'Quan trọng' },
]

const EXAMPLE_POOL = [
  {
    korean: '이 내용을 잘 기억해 주세요.',
    meaning: 'Hãy nhớ kỹ nội dung này nhé.',
  },
  {
    korean: '천천히 따라 읽어 보세요.',
    meaning: 'Hãy đọc theo từ từ nhé.',
  },
  {
    korean: '예문을 보고 응용해 보세요.',
    meaning: 'Nhìn ví dụ rồi ứng dụng thử nhé.',
  },
  {
    korean: '오늘 배운 표현을 말해 보세요.',
    meaning: 'Hãy nói thử cách diễn đạt đã học hôm nay.',
  },
]

export function buildLessonArticle(
  lessonTitle: string,
  courseTitle: string,
  chapterTitle: string,
  teacherName: string,
): LessonArticle {
  const hangul = getHangulLesson(lessonTitle)
  if (hangul) return hangul

  const seed = hashSeed(`${courseTitle}:${chapterTitle}:${lessonTitle}`)
  const vocabStart = seed % (VOCAB_POOL.length - 3)
  const exampleStart = seed % EXAMPLE_POOL.length

  const isHangul =
    /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(lessonTitle) || /hangul|hangeul|chữ|nguyên âm|phụ âm/i.test(lessonTitle)
  const isGrammar = /문법|ngữ pháp|아요|어요|조사|시제|đuôi|cấu trúc/i.test(lessonTitle)
  const isSpeaking = /nói|giao tiếp|hội thoại|speaking|chào|mời|từ chối/i.test(lessonTitle)
  const isTopik = /topik|đề|thi|nghe|đọc hiểu/i.test(lessonTitle)

  let intro = `Bài viết này bổ sung cho video «${lessonTitle}» trong khóa ${courseTitle}. Bạn nên xem video trước để nắm phát âm và ngữ cảnh, rồi đọc lại bài viết để hệ thống hóa kiến thức.`
  if (isHangul) {
    intro = `Trong bài «${lessonTitle}», chúng ta đi sâu vào bảng chữ Hangul thuộc chương «${chapterTitle}». Phần viết dưới đây giải thích hình dạng chữ, cách phát âm và mẹo ghi nhớ để bạn ôn sau khi xem video.`
  } else if (isGrammar) {
    intro = `Bài «${lessonTitle}» tập trung vào ngữ pháp tiếng Hàn. Video giúp bạn nghe ví dụ thực tế; bài viết bên dưới tóm tắt công thức, cách dùng và lỗi thường gặp.`
  } else if (isSpeaking) {
    intro = `Bài «${lessonTitle}» luyện giao tiếp thực tế. Sau khi xem video hội thoại, hãy đọc bài viết để nhớ mẫu câu, tình huống dùng và cách đáp lại tự nhiên.`
  } else if (isTopik) {
    intro = `Bài «${lessonTitle}» phục vụ luyện thi TOPIK. Video hướng dẫn chiến lược làm bài; phần viết chi tiết hóa dạng đề, mẹo chọn đáp án và checklist ôn tập.`
  }

  const objectives = [
    `Hiểu trọng tâm của bài «${lessonTitle}» trong chương ${chapterTitle}`,
    'Nhớ các từ / mẫu câu quan trọng xuất hiện trong video',
    'Áp dụng được kiến thức vào ví dụ giao tiếp hoặc bài tập ngắn',
    `Tự ôn lại nội dung theo hướng dẫn của giảng viên ${teacherName}`,
  ]

  const sections: LessonArticle['sections'] = [
    {
      heading: '1. Kiến thức trọng tâm',
      body: `Nội dung chính của bài xoay quanh «${lessonTitle}». Hãy chú ý phần giảng viên nhấn mạnh trong video — thường là quy tắc cốt lõi, cách phát âm hoặc mẫu câu dùng nhiều nhất. Ghi chú lại 2–3 ý bạn chưa chắc để hỏi trong mục Hỏi đáp.`,
    },
    {
      heading: '2. Cách học hiệu quả',
      body: isSpeaking
        ? 'Nghe video một lần không tạm dừng, lần hai shadowing (nói theo). Sau đó đọc lại mẫu câu trong bài viết và tự đặt tình huống tương tự.'
        : isHangul
          ? 'Vừa xem video vừa viết tay từng chữ. Dùng flashcard để ôn hình dạng – cách đọc. Đọc to các âm tiết mẫu ít nhất 5 lần.'
          : 'Xem video đến hết, rồi đọc lại phần giải thích bên dưới. Làm bài tập ngay sau đó để củng cố trí nhớ ngắn hạn.',
    },
    {
      heading: '3. Lưu ý thường gặp',
      body: isGrammar
        ? 'Đừng học thuộc máy móc đuôi câu mà quên ngữ cảnh. Quan sát chủ ngữ, mức độ lịch sự và thì của câu ví dụ trong video.'
        : isTopik
          ? 'Khi làm đề, đọc kỹ yêu cầu trước. Với phần nghe: xem đáp án trước vài giây. Với phần đọc: loại trừ đáp án sai trước khi chọn.'
          : 'Tránh chỉ đọc nghĩa tiếng Việt. Luôn gắn từ mới với câu ví dụ tiếng Hàn để nhớ lâu hơn.',
    },
  ]

  return {
    intro,
    objectives,
    sections,
    vocabulary: VOCAB_POOL.slice(vocabStart, vocabStart + 4),
    examples: [
      EXAMPLE_POOL[exampleStart],
      EXAMPLE_POOL[(exampleStart + 1) % EXAMPLE_POOL.length],
    ],
    tip: `Sau bài này, hãy dành 5–10 phút ôn flashcard hoặc viết lại 3 câu liên quan đến «${lessonTitle}» trước khi sang bài kế tiếp.`,
    readMinutes: 4 + (seed % 4),
  }
}
