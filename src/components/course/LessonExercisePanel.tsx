import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faMicrophone,
  faRotate,
  faStop,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons'
import { getLessonPractice, type PronounceItem, type QuizQuestion } from '../../data/hangulExercises'
import { scorePronunciation, type PronunciationScore } from '../../utils/pronunciationScore'
import { isSpeechRecognitionSupported, listenKoreanOnce, recordAudioBlob } from '../../utils/speechRecognition'
import { speakKorean } from '../../utils/speakKorean'
import './LessonExercisePanel.css'

type LessonExercisePanelProps = {
  lessonTitle: string
  lessonKind: 'video' | 'quiz' | 'practice'
}

export function LessonExercisePanel({ lessonTitle, lessonKind }: LessonExercisePanelProps) {
  const practice = useMemo(() => getLessonPractice(lessonTitle), [lessonTitle])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [pronounceIndex, setPronounceIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [status, setStatus] = useState('')
  const [result, setResult] = useState<PronunciationScore | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})

  const question = practice.questions[questionIndex]
  const pronounceItem = practice.pronounce[pronounceIndex]
  const recognitionOk = isSpeechRecognitionSupported()

  useEffect(() => {
    setQuestionIndex(0)
    setAnswers({})
    setRevealed({})
    setPronounceIndex(0)
    setRecording(false)
    setStatus('')
    setResult(null)
    setScores({})
    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }, [lessonTitle])

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  const quizScore = useMemo(() => {
    const answered = practice.questions.filter((q) => answers[q.id])
    const correct = practice.questions.filter((q) => answers[q.id] === q.answerId)
    return { answered: answered.length, correct: correct.length, total: practice.questions.length }
  }, [answers, practice.questions])

  const avgPronounce = useMemo(() => {
    const values = Object.values(scores)
    if (!values.length) return null
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  }, [scores])

  const selectAnswer = (q: QuizQuestion, optionId: string) => {
    if (revealed[q.id]) return
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }))
  }

  const revealAnswer = (q: QuizQuestion) => {
    if (!answers[q.id]) return
    setRevealed((prev) => ({ ...prev, [q.id]: true }))
  }

  const startRecording = async (item: PronounceItem) => {
    if (recording) return
    setResult(null)
    setStatus('Đang nghe… hãy đọc to và rõ «' + item.korean + '»')
    setRecording(true)

    try {
      const listened = await listenKoreanOnce(4500)
      const scored = scorePronunciation(item.korean, listened.transcript)
      const mixed =
        listened.confidence > 0
          ? Math.round(scored.score * 0.85 + Math.min(1, listened.confidence) * 100 * 0.15)
          : scored.score
      const finalScore = Math.min(100, Math.max(0, mixed))
      const labeled: PronunciationScore = {
        ...scored,
        score: finalScore,
        label:
          finalScore >= 90
            ? 'Xuất sắc'
            : finalScore >= 75
              ? 'Tốt'
              : finalScore >= 55
                ? 'Khá'
                : 'Cần luyện thêm',
        feedback:
          finalScore >= 90
            ? 'Phát âm rất gần với mẫu. Hãy giữ nhịp này và luyện từ tiếp theo.'
            : finalScore >= 75
              ? 'Khá chính xác. Chỉnh nhẹ độ mở miệng / độ căng phụ âm để đạt điểm cao hơn.'
              : finalScore >= 55
                ? 'Đã nhận ra đúng hướng. Nghe mẫu 2 lần rồi shadowing (nói theo ngay).'
                : scored.feedback,
      }

      setResult(labeled)
      setScores((prev) => ({ ...prev, [item.korean]: labeled.score }))
      setStatus('Đã chấm điểm — dùng Nghe mẫu / Nghe lại để so sánh')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Thu âm thất bại')
      setResult(null)
    } finally {
      setRecording(false)
    }
  }

  const capturePlayback = async () => {
    if (recording) return
    setStatus('Đang thu đoạn nghe lại (≈3 giây)…')
    setRecording(true)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    try {
      const blob = await recordAudioBlob(3000)
      if (blob) {
        setAudioUrl(URL.createObjectURL(blob))
        setStatus('Đã lưu bản thu — nghe lại và so với mẫu')
      } else {
        setStatus('Không thu được âm thanh. Kiểm tra quyền micro.')
      }
    } finally {
      setRecording(false)
    }
  }

  return (
    <section className="lesson-ex" id="lesson-exercise">
      <header className="lesson-ex__head">
        <div>
          <h2>{lessonKind === 'practice' ? 'Bài luyện tập' : 'Bài tập theo nội dung'}</h2>
          <p>{practice.hint}</p>
        </div>
        <div className="lesson-ex__summary">
          <span>
            Trắc nghiệm: {quizScore.correct}/{quizScore.total} đúng
          </span>
          {avgPronounce !== null && <span>Phát âm TB: {avgPronounce}%</span>}
        </div>
      </header>

      <div className="lesson-ex__block">
        <div className="lesson-ex__block-head">
          <h3>
            1. Câu hỏi nội dung
            <span>
              {questionIndex + 1}/{practice.questions.length}
            </span>
          </h3>
          <div className="lesson-ex__nav">
            <button
              type="button"
              disabled={questionIndex <= 0}
              onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))}
              aria-label="Câu trước"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              disabled={questionIndex >= practice.questions.length - 1}
              onClick={() => setQuestionIndex((i) => Math.min(practice.questions.length - 1, i + 1))}
              aria-label="Câu sau"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        {question && (
          <>
            <p className="lesson-ex__prompt">{question.prompt}</p>
            <div className="lesson-ex__options" role="radiogroup" aria-label="Đáp án">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id
                const show = revealed[question.id]
                const correct = option.id === question.answerId
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={[
                      'lesson-ex__option',
                      selected ? 'is-selected' : '',
                      show && correct ? 'is-correct' : '',
                      show && selected && !correct ? 'is-wrong' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => selectAnswer(question, option.id)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
            <div className="lesson-ex__actions">
              <button type="button" disabled={!answers[question.id]} onClick={() => revealAnswer(question)}>
                Kiểm tra đáp án
              </button>
              {revealed[question.id] && answers[question.id] === question.answerId && (
                <span className="lesson-ex__ok">
                  <FontAwesomeIcon icon={faCheck} /> Chính xác
                </span>
              )}
            </div>
            {revealed[question.id] && (
              <p className="lesson-ex__explain">
                <strong>Giải thích:</strong> {question.explanation}
              </p>
            )}
          </>
        )}
      </div>

      <div className="lesson-ex__block lesson-ex__block--speak">
        <div className="lesson-ex__block-head">
          <h3>
            2. Thu âm & chấm điểm phát âm
            <span>
              {pronounceIndex + 1}/{practice.pronounce.length}
            </span>
          </h3>
          <div className="lesson-ex__nav">
            <button
              type="button"
              disabled={pronounceIndex <= 0}
              onClick={() => {
                setPronounceIndex((i) => Math.max(0, i - 1))
                setResult(null)
                setStatus('')
              }}
              aria-label="Từ trước"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              disabled={pronounceIndex >= practice.pronounce.length - 1}
              onClick={() => {
                setPronounceIndex((i) => Math.min(practice.pronounce.length - 1, i + 1))
                setResult(null)
                setStatus('')
              }}
              aria-label="Từ sau"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        {!recognitionOk && (
          <p className="lesson-ex__warn">
            Trình duyệt hiện tại không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge để chấm điểm phát âm.
            Bạn vẫn có thể nghe mẫu bằng nút bên dưới.
          </p>
        )}

        {pronounceItem && (
          <div className="lesson-ex__speak-card">
            <div className="lesson-ex__speak-target">
              <strong>{pronounceItem.korean}</strong>
              {pronounceItem.romanization && <span>{pronounceItem.romanization}</span>}
              <em>{pronounceItem.meaning}</em>
            </div>

            <div className="lesson-ex__speak-tools">
              <button type="button" onClick={() => speakKorean(pronounceItem.korean)}>
                <FontAwesomeIcon icon={faVolumeHigh} />
                Nghe mẫu
              </button>
              <button
                type="button"
                className={`is-record${recording ? ' is-active' : ''}`}
                disabled={!recognitionOk || recording}
                onClick={() => startRecording(pronounceItem)}
              >
                <FontAwesomeIcon icon={recording ? faStop : faMicrophone} />
                {recording ? 'Đang thu…' : 'Thu âm & chấm điểm'}
              </button>
              <button type="button" disabled={recording} onClick={() => void capturePlayback()}>
                <FontAwesomeIcon icon={faMicrophone} />
                Thu nghe lại
              </button>
              <button
                type="button"
                disabled={!result}
                onClick={() => {
                  setResult(null)
                  setStatus('')
                }}
              >
                <FontAwesomeIcon icon={faRotate} />
                Làm lại
              </button>
            </div>

            {status && <p className="lesson-ex__status">{status}</p>}

            {result && (
              <div className="lesson-ex__score">
                <div
                  className="lesson-ex__score-ring"
                  style={{ '--score': `${result.score * 3.6}deg` } as CSSProperties}
                >
                  <span>{result.score}</span>
                </div>
                <div className="lesson-ex__score-body">
                  <strong>{result.label}</strong>
                  <p>
                    Hệ thống nhận: <b>{result.recognized}</b>
                  </p>
                  <p>
                    Mục tiêu: <b>{result.target}</b>
                  </p>
                  <p>{result.feedback}</p>
                </div>
              </div>
            )}

            {audioUrl && (
              <div className="lesson-ex__playback">
                <span>Nghe lại giọng của bạn:</span>
                <audio controls src={audioUrl} />
              </div>
            )}

            {Object.keys(scores).length > 0 && (
              <ul className="lesson-ex__score-list">
                {practice.pronounce.map((item) => (
                  <li key={item.korean} className={scores[item.korean] != null ? 'has-score' : ''}>
                    <span>{item.korean}</span>
                    <strong>{scores[item.korean] != null ? `${scores[item.korean]}%` : '—'}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
