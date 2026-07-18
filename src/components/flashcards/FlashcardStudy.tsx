import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateLeft,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faRotate,
  faVolumeHigh,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { getDeckById, shuffleCards, type Flashcard } from '../../data/flashcards'
import { speakKorean } from '../../utils/speakKorean'
import './FlashcardStudy.css'

type FlashcardStudyProps = {
  deckId: string
  onBack: () => void
}

type Mode = 'ko-vi' | 'vi-ko'

export function FlashcardStudy({ deckId, onBack }: FlashcardStudyProps) {
  const deck = getDeckById(deckId)
  const [mode, setMode] = useState<Mode>('ko-vi')
  const [queue, setQueue] = useState<Flashcard[]>([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [again, setAgain] = useState(0)
  const [done, setDone] = useState(false)
  const [sessionTotal, setSessionTotal] = useState(0)

  const startSession = useCallback(() => {
    if (!deck) return
    const cards = shuffleCards(deck.cards)
    setQueue(cards)
    setSessionTotal(cards.length)
    setIndex(0)
    setFlipped(false)
    setKnown(0)
    setAgain(0)
    setDone(false)
  }, [deck])

  useEffect(() => {
    startSession()
  }, [startSession])

  const card = queue[index]
  const progress = sessionTotal === 0 ? 0 : ((known + again) / sessionTotal) * 100

  const front = useMemo(() => {
    if (!card) return { primary: '', secondary: '' }
    if (mode === 'ko-vi') {
      return { primary: card.korean, secondary: card.romanization }
    }
    return { primary: card.meaning, secondary: 'Nghĩa tiếng Việt' }
  }, [card, mode])

  const back = useMemo(() => {
    if (!card) return { primary: '', secondary: '', example: '', exampleMeaning: '' }
    if (mode === 'ko-vi') {
      return {
        primary: card.meaning,
        secondary: card.romanization,
        example: card.example ?? '',
        exampleMeaning: card.exampleMeaning ?? '',
      }
    }
    return {
      primary: card.korean,
      secondary: card.romanization,
      example: card.example ?? '',
      exampleMeaning: card.exampleMeaning ?? '',
    }
  }, [card, mode])

  const speak = useCallback((text: string) => {
    speakKorean(text)
  }, [])

  const goNext = useCallback(
    (remembered: boolean) => {
      if (!card) return
      if (remembered) setKnown((n) => n + 1)
      else setAgain((n) => n + 1)

      if (index >= queue.length - 1) {
        setDone(true)
        setFlipped(false)
        return
      }
      setIndex((i) => i + 1)
      setFlipped(false)
    },
    [card, index, queue.length],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setFlipped((f) => !f)
      }
      if (!flipped) return
      if (e.key === 'ArrowRight' || e.key === '1') goNext(true)
      if (e.key === 'ArrowLeft' || e.key === '2') goNext(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, flipped, goNext])

  if (!deck) {
    return (
      <div className="flash-study flash-study--empty">
        <p>Không tìm thấy bộ thẻ.</p>
        <button type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    )
  }

  if (done) {
    const percent = sessionTotal === 0 ? 0 : Math.round((known / sessionTotal) * 100)
    return (
      <div className="flash-study">
        <div className="flash-study__result">
          <div className="flash-study__result-icon" style={{ background: deck.color }}>
            {deck.icon}
          </div>
          <h1>Hoàn thành bộ thẻ!</h1>
          <p>
            Bạn đã ôn <strong>{sessionTotal}</strong> từ trong «{deck.title}».
          </p>
          <div className="flash-study__result-stats">
            <div>
              <strong>{known}</strong>
              <span>Đã nhớ</span>
            </div>
            <div>
              <strong>{again}</strong>
              <span>Học lại</span>
            </div>
            <div>
              <strong>{percent}%</strong>
              <span>Tỷ lệ nhớ</span>
            </div>
          </div>
          <div className="flash-study__result-actions">
            <button type="button" className="flash-study__btn flash-study__btn--primary" onClick={startSession}>
              <FontAwesomeIcon icon={faRotate} />
              Học lại bộ này
            </button>
            <button type="button" className="flash-study__btn flash-study__btn--ghost" onClick={onBack}>
              Chọn bộ thẻ khác
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!card) return null

  return (
    <div className="flash-study">
      <header className="flash-study__top">
        <button type="button" className="flash-study__back" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Bộ thẻ
        </button>
        <div className="flash-study__title">
          <h1>{deck.title}</h1>
          <p>
            Thẻ {index + 1}/{queue.length}
          </p>
        </div>
        <div className="flash-study__modes" role="group" aria-label="Chế độ học">
          <button
            type="button"
            className={mode === 'ko-vi' ? 'is-active' : ''}
            onClick={() => {
              setMode('ko-vi')
              setFlipped(false)
            }}
          >
            Hàn → Việt
          </button>
          <button
            type="button"
            className={mode === 'vi-ko' ? 'is-active' : ''}
            onClick={() => {
              setMode('vi-ko')
              setFlipped(false)
            }}
          >
            Việt → Hàn
          </button>
        </div>
      </header>

      <div className="flash-study__progress" aria-hidden="true">
        <div className="flash-study__progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="flash-study__stage">
        <button
          type="button"
          className={`flash-card${flipped ? ' is-flipped' : ''}`}
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'Ẩn đáp án' : 'Lật thẻ xem nghĩa'}
        >
          <div className="flash-card__inner">
            <div className="flash-card__face flash-card__face--front" style={{ background: deck.color }}>
              <span className="flash-card__hint">Nhấn để lật</span>
              <p className="flash-card__primary">{front.primary}</p>
              <p className="flash-card__secondary">{front.secondary}</p>
            </div>
            <div className="flash-card__face flash-card__face--back">
              <p className="flash-card__primary flash-card__primary--dark">{back.primary}</p>
              <p className="flash-card__secondary flash-card__secondary--dark">{back.secondary}</p>
              {back.example && (
                <div className="flash-card__example">
                  <p>{back.example}</p>
                  {back.exampleMeaning && <span>{back.exampleMeaning}</span>}
                </div>
              )}
            </div>
          </div>
        </button>

        <div className="flash-study__tools">
          <button
            type="button"
            className="flash-study__speak"
            onClick={() => speak(card.korean)}
            aria-label="Nghe phát âm"
          >
            <FontAwesomeIcon icon={faVolumeHigh} />
            Nghe phát âm
          </button>
          <button
            type="button"
            className="flash-study__speak"
            onClick={() => setFlipped((f) => !f)}
            aria-label="Lật thẻ"
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            Lật thẻ
          </button>
        </div>

        <div className="flash-study__actions">
          <button
            type="button"
            className="flash-study__btn flash-study__btn--again"
            disabled={!flipped}
            onClick={() => goNext(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
            Học lại
            <kbd>←</kbd>
          </button>
          <button
            type="button"
            className="flash-study__btn flash-study__btn--known"
            disabled={!flipped}
            onClick={() => goNext(true)}
          >
            <FontAwesomeIcon icon={faCheck} />
            Đã nhớ
            <kbd>→</kbd>
          </button>
        </div>

        <p className="flash-study__shortcut">
          <FontAwesomeIcon icon={faChevronRight} /> Phím cách: lật thẻ · ← học lại · → đã nhớ
        </p>
      </div>
    </div>
  )
}
