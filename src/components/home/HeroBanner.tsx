import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faCrown, faFlag } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './HeroBanner.css'

const AUTO_MS = 5000

export type HeroBannerAction =
  | { type: 'course'; khoaHocId: number }
  | { type: 'pro' }
  | { type: 'page'; page: 'flashcards' | 'roadmap' | 'videos' }

type Slide = {
  id: number
  title: string
  titleIcon: IconDefinition
  desc: string
  cta: string
  gradient: string
  badge: string
  oldPrice: string
  newPrice: string
  action: HeroBannerAction
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Mở bán khóa TOPIK Pro',
    titleIcon: faCrown,
    desc: 'Từ 16/07/2026 khóa học sẽ có giá 1.399k. Khi khóa học hoàn thiện sẽ trở về giá gốc.',
    cta: 'HỌC THỬ MIỄN PHÍ',
    gradient: 'linear-gradient(105deg, #6a11cb 0%, #8e2de2 45%, #c471ed 100%)',
    badge: 'TOPIK PRO',
    oldPrice: '3.299K',
    newPrice: '1.199K',
    action: { type: 'course', khoaHocId: 5 },
  },
  {
    id: 2,
    title: 'Tiếng Hàn Giao Tiếp Pro',
    titleIcon: faCommentDots,
    desc: 'Luyện nói 1-1 với giáo viên bản ngữ. Cam kết giao tiếp tự tin sau 3 tháng.',
    cta: 'ĐĂNG KÝ NGAY',
    gradient: 'linear-gradient(105deg, #e63946 0%, #d62828 45%, #f77f00 100%)',
    badge: 'SPEAKING',
    oldPrice: '2.499K',
    newPrice: '999K',
    action: { type: 'course', khoaHocId: 7 },
  },
  {
    id: 3,
    title: 'Hangul Zero to Hero',
    titleIcon: faFlag,
    desc: 'Từ bảng chữ cái đến đọc hiểu sơ cấp. Miễn phí cho 1000 học viên đầu tiên.',
    cta: 'BẮT ĐẦU HỌC',
    gradient: 'linear-gradient(105deg, #0077b6 0%, #00b4d8 50%, #90e0ef 100%)',
    badge: 'HANGEUL',
    oldPrice: '899K',
    newPrice: '0K',
    action: { type: 'course', khoaHocId: 1 },
  },
]

type HeroBannerProps = {
  onAction?: (action: HeroBannerAction) => void
}

export function HeroBanner({ onAction }: HeroBannerProps) {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const progressRef = useRef(0)

  const goTo = useCallback((index: number) => {
    setCurrent(index)
    progressRef.current = 0
    setProgress(0)
    setAnimKey((k) => k + 1)
  }, [])

  const prev = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1)
  }, [current, goTo])

  useEffect(() => {
    if (paused) return

    let frame = 0
    let last = performance.now()

    const loop = (now: number) => {
      const delta = now - last
      last = now
      progressRef.current = Math.min(1, progressRef.current + delta / AUTO_MS)
      setProgress(progressRef.current)

      if (progressRef.current >= 1) {
        progressRef.current = 0
        setProgress(0)
        setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))
        setAnimKey((k) => k + 1)
        return
      }

      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [paused, current])

  const slide = slides[current]

  const handleCta = () => {
    onAction?.(slide.action)
  }

  return (
    <section
      className="hero-banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
      aria-roledescription="carousel"
      aria-label="Khóa học nổi bật"
    >
      <div
        key={animKey}
        className="hero-banner__slide"
        style={{ background: slide.gradient }}
        aria-live="polite"
      >
        <button type="button" className="hero-banner__nav hero-banner__nav--prev" onClick={prev} aria-label="Trước">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="hero-banner__content">
          <div className="hero-banner__text">
            <h2>
              {slide.title}{' '}
              <FontAwesomeIcon icon={slide.titleIcon} className="hero-banner__title-icon" />
            </h2>
            <p>{slide.desc}</p>
            <button type="button" className="hero-banner__cta" onClick={handleCta}>
              {slide.cta}
            </button>
          </div>
          <button
            type="button"
            className="hero-banner__visual"
            onClick={handleCta}
            aria-label={`${slide.cta}: ${slide.title}`}
          >
            <div className="hero-banner__box">
              <span className="hero-banner__badge">{slide.badge}</span>
              <div className="hero-banner__prices">
                <span className="hero-banner__old">{slide.oldPrice}</span>
                <span className="hero-banner__new">{slide.newPrice}</span>
              </div>
            </div>
          </button>
        </div>

        <button type="button" className="hero-banner__nav hero-banner__nav--next" onClick={next} aria-label="Sau">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="hero-banner__dots" role="tablist" aria-label="Chọn slide">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === current}
            className={`hero-banner__dot${i === current ? ' hero-banner__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}: ${s.title}`}
          >
            {i === current && (
              <span className="hero-banner__dot-fill" style={{ width: `${progress * 100}%` }} />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
