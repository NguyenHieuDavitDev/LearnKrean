import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faBookOpen,
  faBookmark,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faCirclePlay,
  faCode,
  faCommentDots,
  faCompress,
  faGift,
  faLightbulb,
  faListUl,
  faMagnifyingGlass,
  faMoon,
  faNoteSticky,
  faPenToSquare,
  faQuestion,
  faSun,
  faThumbsDown,
  faThumbsUp,
  faVideo,
  faVolumeHigh,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { getKhoaHocById } from '../../data/courses'
import { QA_QUESTIONS } from '../../data/qa'
import { CURRENT_USER } from '../../data/user'
import { speakKorean } from '../../utils/speakKorean'
import { BrandLogo } from '../layout/BrandLogo'
import {
  LearningVideoPlayer,
  type VideoQuality,
} from './LearningVideoPlayer'
import { buildLessonArticle } from './lessonArticle'
import { LessonExercisePanel } from './LessonExercisePanel'
import { formatTime } from './videoUtils'
import './LearningPage.css'

type LearningPageProps = {
  khoaHocId: number
  onBack: () => void
}

type Drawer = 'questions' | 'notes' | null
type LessonKind = 'video' | 'quiz' | 'practice'
type ContentTab = 'article' | 'exercise'

type NetworkInfo = {
  downlink: number
  effectiveType: string
  rtt: number
  saveData: boolean
}

type NavigatorConnection = EventTarget & {
  downlink?: number
  effectiveType?: string
  rtt?: number
  saveData?: boolean
  addEventListener: (type: string, listener: () => void) => void
  removeEventListener: (type: string, listener: () => void) => void
}

function readNetworkInfo(): NetworkInfo {
  const nav = navigator as Navigator & {
    connection?: NavigatorConnection
    mozConnection?: NavigatorConnection
    webkitConnection?: NavigatorConnection
  }
  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection
  if (connection) {
    return {
      downlink: connection.downlink ?? 5,
      effectiveType: connection.effectiveType ?? '4g',
      rtt: connection.rtt ?? 50,
      saveData: Boolean(connection.saveData),
    }
  }
  const online = typeof navigator.onLine === 'boolean' ? navigator.onLine : true
  return {
    downlink: online ? 8 : 0.3,
    effectiveType: online ? '4g' : 'slow-2g',
    rtt: online ? 40 : 800,
    saveData: false,
  }
}

function qualityFromNetwork(info: NetworkInfo): Exclude<VideoQuality, 'auto'> {
  if (info.saveData || !navigator.onLine) return '360p'
  if (info.effectiveType === 'slow-2g' || info.downlink < 0.7) return '360p'
  if (info.effectiveType === '2g' || info.downlink < 1.5) return '480p'
  if (info.effectiveType === '3g' || info.downlink < 4) return '720p'
  return '1080p'
}

function networkLabel(info: NetworkInfo) {
  if (!navigator.onLine) return 'Mất kết nối'
  if (info.saveData) return 'Chế độ tiết kiệm dữ liệu'
  if (info.downlink >= 8) return `Mạng nhanh · ${info.downlink.toFixed(1)} Mbps`
  if (info.downlink >= 3) return `Mạng ổn định · ${info.downlink.toFixed(1)} Mbps`
  if (info.downlink >= 1) return `Mạng trung bình · ${info.downlink.toFixed(1)} Mbps`
  return `Mạng chậm · ${info.downlink.toFixed(1)} Mbps`
}

export function LearningPage({ khoaHocId, onBack }: LearningPageProps) {
  const course = getKhoaHocById(khoaHocId)

  const lessons = useMemo(
    () =>
      course?.chapters.flatMap((chapter, chapterIndex) =>
        chapter.lessons.map((title, lessonIndex) => {
          const seed = chapterIndex * 10 + lessonIndex
          const kind: LessonKind = seed % 3 === 1 ? 'quiz' : seed % 3 === 2 ? 'practice' : 'video'
          return {
            chapterIndex,
            lessonIndex,
            title,
            kind,
            number: `${chapterIndex + 1}.${lessonIndex + 1}`,
            duration: `${String(3 + ((chapterIndex + lessonIndex) % 8)).padStart(2, '0')}:${String(
              12 + ((chapterIndex * 13 + lessonIndex * 9) % 47),
            ).padStart(2, '0')}`,
          }
        }),
      ) ?? [],
    [course],
  )

  const [lessonIndex, setLessonIndex] = useState(0)
  const [contentTab, setContentTab] = useState<ContentTab>('article')
  const [drawer, setDrawer] = useState<Drawer>(null)
  const [noteEditor, setNoteEditor] = useState(false)
  const [note, setNote] = useState('')
  const [noteAtSec, setNoteAtSec] = useState(0)
  const [savedNotes, setSavedNotes] = useState<string[]>([])
  const [questionQuery, setQuestionQuery] = useState('')
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({ 0: true })
  const [curriculumOpen, setCurriculumOpen] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [qualityMode, setQualityMode] = useState<VideoQuality>('auto')
  const [network, setNetwork] = useState<NetworkInfo>(() => readNetworkInfo())
  const [qualityToast, setQualityToast] = useState('')
  const [videoWatchSec, setVideoWatchSec] = useState(0)
  const qualityModeRef = useRef<VideoQuality>('auto')
  const prevSuggestedRef = useRef(qualityFromNetwork(readNetworkInfo()))

  const suggestedQuality = qualityFromNetwork(network)
  const activeQuality = qualityMode === 'auto' ? suggestedQuality : qualityMode

  useEffect(() => {
    qualityModeRef.current = qualityMode
  }, [qualityMode])

  useEffect(() => {
    let toastTimer = 0

    const update = () => {
      const info = readNetworkInfo()
      setNetwork(info)
      const nextQuality = qualityFromNetwork(info)
      if (qualityModeRef.current === 'auto' && nextQuality !== prevSuggestedRef.current) {
        prevSuggestedRef.current = nextQuality
        setQualityToast(`Tự động chuyển sang ${nextQuality} · ${networkLabel(info)}`)
        window.clearTimeout(toastTimer)
        toastTimer = window.setTimeout(() => setQualityToast(''), 2200)
      } else {
        prevSuggestedRef.current = nextQuality
      }
    }

    const nav = navigator as Navigator & {
      connection?: NavigatorConnection
      mozConnection?: NavigatorConnection
      webkitConnection?: NavigatorConnection
    }
    const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection
    connection?.addEventListener('change', update)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)

    const timer = window.setInterval(update, 8000)

    return () => {
      connection?.removeEventListener('change', update)
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
      window.clearInterval(timer)
      window.clearTimeout(toastTimer)
    }
  }, [])

  const currentLesson = lessons[lessonIndex]

  if (!course || !currentLesson) {
    return (
      <div className="learning-empty">
        <p>Không tìm thấy nội dung khóa học.</p>
        <button type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    )
  }

  const completedCount = Math.min(lessonIndex, lessons.length)
  const progress = Math.round((completedCount / lessons.length) * 100)
  const filteredQuestions = QA_QUESTIONS.filter(
    (item) =>
      item.title.toLowerCase().includes(questionQuery.toLowerCase()) ||
      item.courseTag.toLowerCase().includes(questionQuery.toLowerCase()),
  )

  const goLesson = (next: number) => {
    setLessonIndex(Math.max(0, Math.min(lessons.length - 1, next)))
    setNoteEditor(false)
    setVideoWatchSec(0)
    setNoteAtSec(0)
    setContentTab('article')
  }

  const toggleDrawer = (next: Exclude<Drawer, null>) => {
    setDrawer((current) => (current === next ? null : next))
  }

  const saveNote = () => {
    const value = note.trim()
    if (!value) return
    setSavedNotes((items) => [
      `${currentLesson.number} ${currentLesson.title} @ ${formatTime(noteAtSec)}: ${value}`,
      ...items,
    ])
    setNote('')
    setNoteEditor(false)
  }

  const kindIcon =
    currentLesson.kind === 'quiz' ? faQuestion : currentLesson.kind === 'practice' ? faPenToSquare : faCirclePlay

  const chapterTitle = course.chapters[currentLesson.chapterIndex]?.title ?? ''
  const lessonArticle = buildLessonArticle(
    currentLesson.title,
    course.title,
    chapterTitle,
    course.teacher.name,
  )

  const handleQualityChange = (next: VideoQuality) => {
    setQualityMode(next)
    setQualityToast(next === 'auto' ? `Đã bật Auto · phát ${suggestedQuality}` : `Đã chọn ${next}`)
    window.setTimeout(() => setQualityToast(''), 1800)
  }

  return (
    <div className={`learning learning--${theme}${curriculumOpen ? '' : ' learning--wide'}`}>
      <header className="learning__header">
        <button type="button" className="learning__back" onClick={onBack} aria-label="Quay lại">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <BrandLogo size="sm" />
        <strong className="learning__course-name">{course.title}</strong>
        <span
          className="learning__progress-ring"
          style={{ '--progress': `${progress * 3.6}deg` } as CSSProperties}
        >
          <span>{progress}%</span>
        </span>

        <div className="learning__header-actions">
          <button
            type="button"
            title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          </button>
          <button
            type="button"
            title={curriculumOpen ? 'Thu gọn danh sách bài học' : 'Mở danh sách bài học'}
            onClick={() => setCurriculumOpen((v) => !v)}
          >
            <FontAwesomeIcon icon={curriculumOpen ? faCompress : faListUl} />
          </button>
          <button
            type="button"
            title="Bài tập"
            onClick={() => {
              setContentTab('exercise')
              window.setTimeout(() => {
                document.getElementById('lesson-exercise')?.scrollIntoView({ behavior: 'smooth' })
              }, 50)
            }}
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button type="button" title="Hỏi đáp" onClick={() => toggleDrawer('questions')}>
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
          <button type="button" title="Quà tặng">
            <FontAwesomeIcon icon={faGift} />
          </button>
          <button type="button" title="Ghi chú" onClick={() => toggleDrawer('notes')}>
            <FontAwesomeIcon icon={faNoteSticky} />
          </button>
          <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
          <span>{CURRENT_USER.name}</span>
        </div>
      </header>

      <div className="learning__body">
        <main className="learning__main">
          <section className="learning__stage">
            {currentLesson.kind !== 'quiz' && (
              <LearningVideoPlayer
                key={`${currentLesson.number}-${currentLesson.title}`}
                title={currentLesson.title}
                courseTitle={course.title}
                lessonNumber={currentLesson.number}
                durationLabel={currentLesson.duration}
                gradient={course.gradient}
                teacherName={course.teacher.name}
                activeQuality={activeQuality}
                qualityMode={qualityMode}
                suggestedQuality={suggestedQuality}
                network={network}
                networkLabel={networkLabel(network)}
                qualityToast={qualityToast}
                onQualityChange={handleQualityChange}
                hasNextLesson={lessonIndex < lessons.length - 1}
                onNextLesson={() => goLesson(lessonIndex + 1)}
                onTimeUpdate={(current) => {
                  setVideoWatchSec(current)
                  if (!noteEditor) setNoteAtSec(current)
                }}
              />
            )}

            <div className="learning__lesson-info">
              <div>
                <h1>
                  <FontAwesomeIcon icon={kindIcon} className="learning__kind-icon" />
                  {currentLesson.number} {currentLesson.title}
                </h1>
                <p>
                  {currentLesson.kind === 'video'
                    ? 'Bài học video'
                    : currentLesson.kind === 'quiz'
                      ? 'Bài tập trắc nghiệm'
                      : 'Bài luyện tập'}{' '}
                  · Đã xem {formatTime(videoWatchSec)} · Cập nhật tháng 7 năm 2026
                </p>
              </div>
              <button
                type="button"
                className="learning__note-button"
                onClick={() => {
                  setNoteAtSec(videoWatchSec)
                  setNoteEditor(true)
                }}
              >
                <FontAwesomeIcon icon={faNoteSticky} />
                Thêm ghi chú tại {formatTime(videoWatchSec)}
              </button>
            </div>

            {noteEditor && (
              <div className="learning__note-editor">
                <h2>
                  Thêm ghi chú tại <span>{formatTime(noteAtSec)}</span>
                </h2>
                <div className="learning__editor-toolbar">
                  <select aria-label="Định dạng">
                    <option>Đoạn văn bản</option>
                  </select>
                  <button type="button">
                    <strong>B</strong>
                  </button>
                  <button type="button">
                    <em>I</em>
                  </button>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nội dung ghi chú..."
                  maxLength={3000}
                />
                <div className="learning__editor-actions">
                  <span>{note.length.toLocaleString('vi-VN')} / 3.000</span>
                  <button type="button" onClick={() => setNoteEditor(false)}>
                    Hủy bỏ
                  </button>
                  <button type="button" disabled={!note.trim()} onClick={saveNote}>
                    Tạo ghi chú
                  </button>
                </div>
              </div>
            )}

            {!noteEditor && (
              <>
                <div className="learning__tabs" role="tablist" aria-label="Nội dung bài học">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={contentTab === 'article'}
                    className={contentTab === 'article' ? 'is-active' : ''}
                    onClick={() => setContentTab('article')}
                  >
                    <FontAwesomeIcon icon={faBookOpen} />
                    Bài viết chi tiết
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={contentTab === 'exercise'}
                    className={contentTab === 'exercise' ? 'is-active' : ''}
                    onClick={() => setContentTab('exercise')}
                  >
                    <FontAwesomeIcon icon={currentLesson.kind === 'practice' ? faPenToSquare : faQuestion} />
                    {currentLesson.kind === 'practice' ? 'Bài luyện tập' : 'Bài tập'}
                  </button>
                  {currentLesson.kind === 'video' && (
                    <span className="learning__tabs-hint">
                      <FontAwesomeIcon icon={faVideo} />
                      Video + bài viết
                    </span>
                  )}
                </div>

                {contentTab === 'article' ? (
                  <article className="learning__article">
                    <header className="learning__article-head">
                      <h2>Bài viết: {currentLesson.title}</h2>
                      <p>
                        Chương {chapterTitle} · Khoảng {lessonArticle.readMinutes} phút đọc · Giảng viên{' '}
                        {course.teacher.name}
                      </p>
                    </header>

                    <p className="learning__article-intro">{lessonArticle.intro}</p>

                    <section className="learning__article-block">
                      <h3>Bạn sẽ nắm được gì?</h3>
                      <ul>
                        {lessonArticle.objectives.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    {lessonArticle.sections.map((section) => (
                      <section key={section.heading} className="learning__article-block">
                        <h3>{section.heading}</h3>
                        <p>{section.body}</p>
                      </section>
                    ))}

                    {lessonArticle.alphabet && lessonArticle.alphabet.length > 0 && (
                      <section className="learning__article-block">
                        <h3>{lessonArticle.alphabetTitle ?? 'Bảng chữ — bấm để nghe phát âm'}</h3>
                        <p className="learning__alphabet-hint">
                          Bấm vào từng chữ để nghe phát âm tiếng Hàn (ko-KR). Hãy nghe rồi nói theo.
                        </p>
                        <div className="learning__alphabet-grid">
                          {lessonArticle.alphabet.map((letter) => (
                            <button
                              key={`${letter.char}-${letter.romanization}-${letter.speakAs}`}
                              type="button"
                              className="learning__alphabet-btn"
                              onClick={() => speakKorean(letter.speakAs)}
                              aria-label={`Phát âm ${letter.char} (${letter.romanization})`}
                            >
                              <span className="learning__alphabet-char">{letter.char}</span>
                              <span className="learning__alphabet-rom">{letter.romanization}</span>
                              <span className="learning__alphabet-mean">{letter.meaning}</span>
                              <span className="learning__alphabet-speak" aria-hidden="true">
                                <FontAwesomeIcon icon={faVolumeHigh} />
                              </span>
                            </button>
                          ))}
                        </div>
                      </section>
                    )}

                    <section className="learning__article-block">
                      <h3>Từ vựng / mẫu câu liên quan</h3>
                      <div className="learning__vocab-grid">
                        {lessonArticle.vocabulary.map((item) => (
                          <button
                            key={item.korean}
                            type="button"
                            className="learning__vocab-card learning__vocab-card--speak"
                            onClick={() => speakKorean(item.korean)}
                            aria-label={`Phát âm ${item.korean}`}
                          >
                            <strong>{item.korean}</strong>
                            <span>{item.meaning}</span>
                            <FontAwesomeIcon icon={faVolumeHigh} className="learning__vocab-speak-icon" />
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="learning__article-block">
                      <h3>Ví dụ minh họa</h3>
                      <ul className="learning__example-list">
                        {lessonArticle.examples.map((item) => (
                          <li key={item.korean}>
                            <button
                              type="button"
                              className="learning__example-speak"
                              onClick={() => speakKorean(item.korean)}
                              aria-label={`Phát âm ${item.korean}`}
                            >
                              <FontAwesomeIcon icon={faVolumeHigh} />
                              <strong>{item.korean}</strong>
                            </button>
                            <span>{item.meaning}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <aside className="learning__article-tip">
                      <FontAwesomeIcon icon={faLightbulb} />
                      <div>
                        <strong>Mẹo ôn nhanh</strong>
                        <p>{lessonArticle.tip}</p>
                      </div>
                    </aside>

                    <div className="learning__article-cta">
                      <button type="button" onClick={() => setContentTab('exercise')}>
                        Làm bài tập của bài này
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </article>
                ) : (
                  <LessonExercisePanel lessonTitle={currentLesson.title} lessonKind={currentLesson.kind} />
                )}
              </>
            )}

            <div className="learning__feedback">
              <p>Bạn thấy bài học này thế nào?</p>
              <div>
                <button type="button" aria-label="Không hữu ích">
                  <FontAwesomeIcon icon={faThumbsDown} />
                </button>
                <button type="button" aria-label="Hữu ích">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
              </div>
            </div>
          </section>
        </main>

        {curriculumOpen && (
          <aside className="learning__curriculum">
            <div className="learning__curriculum-search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input placeholder="Tìm theo tên bài học" aria-label="Tìm bài học" />
              <button type="button" title="Bài học đã lưu">
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            </div>
            <div className="learning__streak">
              <span>🔥</span>
              <div>
                <strong>Bắt đầu chuỗi ngày học</strong>
                <p>Hoàn thành 1 bài để bắt đầu</p>
              </div>
            </div>
            <div className="learning__chapters">
              {course.chapters.map((chapter, chapterIndex) => {
                const chapterLessons = lessons.filter((lesson) => lesson.chapterIndex === chapterIndex)
                const isOpen = openChapters[chapterIndex] ?? chapterIndex === currentLesson.chapterIndex
                return (
                  <section key={chapter.title} className="learning__chapter">
                    <button
                      type="button"
                      className="learning__chapter-head"
                      onClick={() =>
                        setOpenChapters((items) => ({ ...items, [chapterIndex]: !isOpen }))
                      }
                    >
                      <span>
                        <strong>
                          {chapterIndex + 1}. {chapter.title}
                        </strong>
                        <small>
                          {
                            chapterLessons.filter((lesson) => lessons.indexOf(lesson) < lessonIndex)
                              .length
                          }{' '}
                          / {chapterLessons.length}
                        </small>
                      </span>
                      <FontAwesomeIcon icon={faChevronDown} className={isOpen ? 'is-open' : ''} />
                    </button>
                    {isOpen && (
                      <ul>
                        {chapterLessons.map((lesson) => {
                          const index = lessons.indexOf(lesson)
                          const complete = index < lessonIndex
                          const icon =
                            lesson.kind === 'quiz'
                              ? faQuestion
                              : lesson.kind === 'practice'
                                ? faPenToSquare
                                : complete
                                  ? faCheck
                                  : faCirclePlay
                          return (
                            <li key={`${lesson.chapterIndex}-${lesson.lessonIndex}`}>
                              <button
                                type="button"
                                className={index === lessonIndex ? 'is-active' : ''}
                                onClick={() => goLesson(index)}
                              >
                                <FontAwesomeIcon icon={icon} />
                                <span>
                                  <strong>
                                    {lesson.number} {lesson.title}
                                  </strong>
                                  <small>
                                    {lesson.kind === 'video'
                                      ? lesson.duration
                                      : lesson.kind === 'quiz'
                                        ? 'Trắc nghiệm'
                                        : 'Luyện tập'}
                                  </small>
                                </span>
                                {complete && (
                                  <i>
                                    <FontAwesomeIcon icon={faCheck} />
                                  </i>
                                )}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </section>
                )
              })}
            </div>
          </aside>
        )}
      </div>

      <footer className="learning__footer">
        <button
          type="button"
          className="learning__footer-toggle"
          onClick={() => setCurriculumOpen((v) => !v)}
          aria-label={curriculumOpen ? 'Thu gọn danh sách bài học' : 'Mở danh sách bài học'}
        >
          <FontAwesomeIcon icon={curriculumOpen ? faCompress : faListUl} />
          <span>{curriculumOpen ? 'Thu gọn bài học' : 'Danh sách bài học'}</span>
        </button>

        <div className="learning__nav">
          <button type="button" disabled={lessonIndex === 0} onClick={() => goLesson(lessonIndex - 1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Bài trước
          </button>
          <button
            type="button"
            className="learning__nav-next"
            disabled={lessonIndex === lessons.length - 1}
            onClick={() => goLesson(lessonIndex + 1)}
          >
            Bài tiếp theo <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <span className="learning__footer-chapter">
          {currentLesson.chapterIndex + 1}. {course.chapters[currentLesson.chapterIndex]?.title}
        </span>
      </footer>

      <button type="button" className="learning__help" aria-label="Trợ giúp">
        <FontAwesomeIcon icon={faQuestion} />
      </button>

      {drawer && (
        <>
          <button type="button" className="learning__scrim" onClick={() => setDrawer(null)} aria-label="Đóng" />
          <aside className="learning__drawer">
            <header>
              <div>
                <button type="button" onClick={() => setDrawer(null)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h2>{drawer === 'questions' ? 'Hỏi đáp' : 'Ghi chú của tôi'}</h2>
              </div>
              <button type="button" onClick={() => setDrawer(null)} aria-label="Đóng">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </header>
            {drawer === 'questions' ? (
              <div className="learning__questions">
                <h3>
                  {currentLesson.number} {currentLesson.title}
                </h3>
                <label>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <input
                    value={questionQuery}
                    onChange={(e) => setQuestionQuery(e.target.value)}
                    placeholder="Tìm câu hỏi..."
                  />
                </label>
                <div className="learning__ask">
                  <p>Không tìm thấy câu hỏi bạn cần?</p>
                  <button type="button">Đặt câu hỏi mới</button>
                </div>
                <h3>Các câu hỏi của cộng đồng ({filteredQuestions.length})</h3>
                <ul>
                  {filteredQuestions.slice(0, 8).map((question) => (
                    <li key={question.id}>
                      <FontAwesomeIcon icon={question.status === 'resolved' ? faCheck : faCommentDots} />
                      <span>{question.title}</span>
                      <small>{question.courseTag}</small>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="learning__notes">
                <div className="learning__note-filters">
                  <select>
                    <option>Trong chương hiện tại</option>
                    <option>Toàn khóa học</option>
                  </select>
                  <select>
                    <option>Mới nhất</option>
                    <option>Cũ nhất</option>
                  </select>
                </div>
                {savedNotes.length ? (
                  <ul>
                    {savedNotes.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="learning__notes-empty">
                    <FontAwesomeIcon icon={faNoteSticky} />
                    <p>Bạn chưa có ghi chú nào.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setDrawer(null)
                        setNoteEditor(true)
                      }}
                    >
                      Tạo ghi chú đầu tiên
                    </button>
                  </div>
                )}
              </div>
            )}
          </aside>
        </>
      )}
    </div>
  )
}
