import { getHangulLesson } from './hangulLessons'
import {
  BASIC_CONSONANTS,
  BASIC_VOWELS,
  BATCHIM_SOUNDS,
  COMPOUND_VOWELS,
  DOUBLE_CONSONANTS,
} from './hangulAlphabet'

export type QuizOption = {
  id: string
  label: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: QuizOption[]
  answerId: string
  explanation: string
}

export type PronounceItem = {
  korean: string
  romanization: string
  meaning: string
}

export type LessonPracticeSet = {
  hint: string
  questions: QuizQuestion[]
  pronounce: PronounceItem[]
}

function shuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items]
  let s = seed || 1
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function hash(text: string): number {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
  return h || 1
}

function mcq(
  id: string,
  prompt: string,
  correct: string,
  wrongs: string[],
  explanation: string,
  seed: number,
): QuizQuestion {
  const options = shuffle(
    [{ id: 'a', label: correct }, ...wrongs.slice(0, 3).map((label, i) => ({ id: String.fromCharCode(98 + i), label }))],
    seed,
  ).map((opt, i) => ({ id: String.fromCharCode(97 + i), label: opt.label }))
  const answerId = options.find((o) => o.label === correct)?.id ?? 'a'
  return { id, prompt, options, answerId, explanation }
}

function buildFromAlphabet(title: string, seed: number): LessonPracticeSet | null {
  const lesson = getHangulLesson(title)
  if (!lesson) return null

  const letters = lesson.alphabet ?? []
  const vocab = lesson.vocabulary
  const questions: QuizQuestion[] = []
  let q = 0

  // Câu hỏi từ bảng chữ của bài
  if (letters.length >= 2) {
    const target = letters[seed % letters.length]
    const distractors = shuffle(
      letters.filter((l) => l.char !== target.char).map((l) => l.romanization),
      seed + 1,
    ).slice(0, 3)
    if (distractors.length >= 3) {
      questions.push(
        mcq(
          `q${++q}`,
          `Trong bài «${title}», chữ «${target.char}» đọc (romanization) thế nào?`,
          target.romanization,
          distractors,
          `«${target.char}» đọc ${target.romanization} — ${target.meaning}`,
          seed + 2,
        ),
      )
    }

    const target2 = letters[(seed + 3) % letters.length]
    const meaningWrongs = shuffle(
      letters.filter((l) => l.char !== target2.char).map((l) => l.meaning),
      seed + 4,
    ).slice(0, 3)
    if (meaningWrongs.length >= 3) {
      questions.push(
        mcq(
          `q${++q}`,
          `«${target2.char}» (${target2.romanization}) mang ý / đặc điểm nào?`,
          target2.meaning,
          meaningWrongs,
          `${target2.char}: ${target2.meaning}`,
          seed + 5,
        ),
      )
    }

    const speakTarget = letters[(seed + 5) % letters.length]
    const speakWrongs = shuffle(
      letters.filter((l) => l.speakAs !== speakTarget.speakAs).map((l) => l.speakAs),
      seed + 6,
    ).slice(0, 3)
    if (speakWrongs.length >= 3) {
      questions.push(
        mcq(
          `q${++q}`,
          `Khi luyện phát âm chữ «${speakTarget.char}», âm tiết mẫu nên đọc là?`,
          speakTarget.speakAs,
          speakWrongs,
          `Jamo đơn lẻ khó TTS rõ — dùng âm tiết mẫu «${speakTarget.speakAs}».`,
          seed + 7,
        ),
      )
    }
  }

  // Câu hỏi từ từ vựng bài
  if (vocab.length >= 2) {
    const v = vocab[seed % vocab.length]
    const wrongMeanings = shuffle(
      vocab.filter((x) => x.korean !== v.korean).map((x) => x.meaning),
      seed + 8,
    )
    const poolMeanings = [
      ...wrongMeanings,
      'Động từ quá khứ',
      'Trợ từ chủ ngữ',
      'Số đếm Hán',
    ].slice(0, 3)
    questions.push(
      mcq(
        `q${++q}`,
        `«${v.korean}» trong bài này nghĩa là gì?`,
        v.meaning,
        poolMeanings,
        `«${v.korean}» = ${v.meaning}`,
        seed + 9,
      ),
    )
  }

  // Câu hỏi kiến thức theo nội dung section / tip
  if (lesson.sections[0]) {
    const knowledgeBank: { prompt: string; answer: string; wrongs: string[]; explain: string }[] = []

    if (/batchim|받침|âm cuối/i.test(title + lesson.intro)) {
      knowledgeBank.push({
        prompt: 'Theo GT Tổng hợp, có bao nhiêu âm batchim đại diện cần thuộc trước?',
        answer: '7 âm',
        wrongs: ['3 âm', '14 âm', '21 âm'],
        explain: 'GT dạy 7 âm đại diện: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.',
      })
    }
    if (/평음|경음|격음|đôi|ㄲ/i.test(title + lesson.intro)) {
      knowledgeBank.push({
        prompt: 'Bậc phụ âm nào là âm bật hơi (격음)?',
        answer: 'ㅋ ㅌ ㅍ ㅊ',
        wrongs: ['ㄱ ㄷ ㅂ ㅈ', 'ㄲ ㄸ ㅃ ㅉ', 'ㅁ ㄴ ㅇ ㄹ'],
        explain: '격음 = bật hơi; 경음 = đôi/căng; 평음 = thường.',
      })
    }
    if (/nguyên âm|모음|ㅏ|ㅐ/i.test(title)) {
      knowledgeBank.push({
        prompt: 'Theo GT Tổng hợp, nhóm nguyên âm cơ bản có bao nhiêu chữ?',
        answer: '10 nguyên âm',
        wrongs: ['14 nguyên âm', '5 nguyên âm', '21 nguyên âm'],
        explain: '10 nguyên âm cơ bản: ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ.',
      })
    }
    if (/viết|quy tắc|âm tiết/i.test(title)) {
      knowledgeBank.push({
        prompt: 'Thứ tự viết nét Hangul đúng theo giáo trình là?',
        answer: 'Trên → dưới, trái → phải',
        wrongs: ['Dưới → trên, phải → trái', 'Phải → trái rồi trên → dưới', 'Viết batchim trước nguyên âm'],
        explain: 'Hai quy tắc vàng của GT: trên xuống dưới, trái sang phải.',
      })
    }
    if (/ㅇ/.test(title) || /im lặng|batchim ㅇ/i.test(lesson.intro)) {
      knowledgeBank.push({
        prompt: 'Phụ âm ㅇ ở đầu âm tiết được đọc thế nào?',
        answer: 'Không đọc (im lặng)',
        wrongs: ['Đọc ng', 'Đọc o', 'Đọc a'],
        explain: 'ㅇ đầu = giữ chỗ; ㅇ cuối (batchim) mới đọc ng.',
      })
    }

    if (knowledgeBank.length === 0) {
      knowledgeBank.push({
        prompt: `Đâu là trọng tâm đúng của bài «${title}»?`,
        answer: lesson.objectives[0] ?? 'Học chữ và phát âm theo GT Tổng hợp',
        wrongs: [
          'Bỏ qua phát âm, chỉ học thuộc nghĩa Việt',
          'Học TOPIK II trước khi biết Hangul',
          'Không cần luyện viết tay',
        ],
        explain: lesson.tip,
      })
    }

    const k = knowledgeBank[seed % knowledgeBank.length]
    questions.push(mcq(`q${++q}`, k.prompt, k.answer, k.wrongs, k.explain, seed + 11))
  }

  // Đảm bảo có ít nhất 3 câu
  while (questions.length < 3) {
    const pool = [...BASIC_VOWELS, ...BASIC_CONSONANTS]
    const item = pool[(seed + questions.length * 3) % pool.length]
    const wrongs = shuffle(
      pool.filter((p) => p.char !== item.char).map((p) => p.romanization),
      seed + questions.length,
    ).slice(0, 3)
    questions.push(
      mcq(
        `q${++q}`,
        `«${item.char}» đọc thế nào?`,
        item.romanization,
        wrongs,
        `${item.char} = ${item.romanization} (${item.meaning})`,
        seed + 20 + questions.length,
      ),
    )
  }

  const pronounceMap = new Map<string, PronounceItem>()
  for (const letter of letters.slice(0, 8)) {
    pronounceMap.set(letter.speakAs, {
      korean: letter.speakAs,
      romanization: letter.romanization,
      meaning: `${letter.char} — ${letter.meaning}`,
    })
  }
  for (const v of vocab) {
    if (!pronounceMap.has(v.korean)) {
      pronounceMap.set(v.korean, {
        korean: v.korean,
        romanization: '',
        meaning: v.meaning,
      })
    }
  }
  // Bổ sung từ bài học liên quan nếu còn thiếu
  if (pronounceMap.size < 3) {
    const fallback = [...BASIC_VOWELS, ...COMPOUND_VOWELS, ...BASIC_CONSONANTS, ...DOUBLE_CONSONANTS, ...BATCHIM_SOUNDS]
    for (const item of fallback) {
      if (pronounceMap.size >= 5) break
      pronounceMap.set(item.speakAs, {
        korean: item.speakAs,
        romanization: item.romanization,
        meaning: item.meaning,
      })
    }
  }

  const pronounce = shuffle([...pronounceMap.values()], seed).slice(0, 5)

  return {
    hint: `Bài tập dựa trên nội dung «${title}». Làm trắc nghiệm rồi luyện thu âm để chấm điểm phát âm.`,
    questions: questions.slice(0, 4),
    pronounce,
  }
}

const GENERIC_PRACTICE: LessonPracticeSet = {
  hint: 'Chọn đáp án đúng theo nội dung bài, rồi luyện phát âm các từ liên quan.',
  questions: [
    mcq(
      'g1',
      'Cách học hiệu quả nhất sau khi xem bài là gì?',
      'Ôn lại điểm chính và luyện phát âm / bài tập ngay',
      ['Chỉ đọc lướt nghĩa tiếng Việt', 'Bỏ qua phần nghe', 'Học thuộc không cần ví dụ'],
      'Học cân bằng: hiểu → luyện → kiểm tra.',
      1,
    ),
  ],
  pronounce: [
    { korean: '안녕하세요', romanization: 'annyeonghaseyo', meaning: 'Xin chào' },
    { korean: '감사합니다', romanization: 'gamsahamnida', meaning: 'Cảm ơn' },
  ],
}

export function getLessonPractice(lessonTitle: string): LessonPracticeSet {
  const hangul = buildFromAlphabet(lessonTitle, hash(lessonTitle))
  if (hangul) return hangul
  return {
    ...GENERIC_PRACTICE,
    hint: `Bài tập liên quan tới «${lessonTitle}».`,
    questions: [
      mcq(
        'g1',
        `Trong bài «${lessonTitle}», đâu là cách học đúng?`,
        'Nắm trọng tâm bài rồi luyện phát âm / làm bài tập',
        ['Chỉ học thuộc danh sách từ', 'Bỏ qua nghe bản ngữ', 'Không cần ngữ cảnh'],
        'Ưu tiên hiểu nội dung bài và luyện ngay.',
        hash(lessonTitle),
      ),
      ...GENERIC_PRACTICE.questions,
    ].slice(0, 3),
    pronounce: GENERIC_PRACTICE.pronounce,
  }
}
