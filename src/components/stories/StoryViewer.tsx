import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFaceAngry,
  faFaceLaugh,
  faFaceSadTear,
  faFaceSmileBeam,
  faFaceSurprise,
  faHeart,
  faImage,
  faLink,
  faPause,
  faPlay,
  faThumbsUp,
  faTrashCan,
  faVideo,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { CURRENT_USER } from '../../data/user'
import { STORIES, type StoryMedia, type StorySlide, type StoryUser } from '../../data/stories'
import { BrandLogo } from '../layout/BrandLogo'
import './StoryViewer.css'

const REACTIONS: { icon: IconDefinition; label: string }[] = [
  { icon: faThumbsUp, label: 'Thích' },
  { icon: faHeart, label: 'Yêu thích' },
  { icon: faFaceSmileBeam, label: 'Ấm áp' },
  { icon: faFaceLaugh, label: 'Haha' },
  { icon: faFaceSurprise, label: 'Wow' },
  { icon: faFaceSadTear, label: 'Buồn' },
  { icon: faFaceAngry, label: 'Giận' },
]
const SLIDE_DURATION = 5000

const STORY_CTA_COURSE: Record<number, number> = {
  1: 3,
  2: 1,
  3: 5,
  4: 3,
  5: 4,
  6: 3,
}

type StoryViewerProps = {
  initialStoryId: number
  onClose: () => void
  onSelectKhoaHoc?: (id: number) => void
  startCreate?: boolean
}

type Comment = { id: string; author: string; text: string; time: string }

const DEMO_COMMENTS: Comment[] = [
  { id: 'c1', author: 'Lan Anh', text: 'Câu này siêu hữu ích 👍', time: '2 giờ trước' },
  { id: 'c2', author: 'Minh Hàn', text: 'Mình vừa luyện phát âm xong!', time: '45 phút trước' },
]

export function StoryViewer({
  initialStoryId,
  onClose,
  onSelectKhoaHoc,
  startCreate = false,
}: StoryViewerProps) {
  const [feed, setFeed] = useState<StoryUser[]>(STORIES)
  const [myStories, setMyStories] = useState<StoryUser[]>([])
  const initialIndex = Math.max(0, feed.findIndex((s) => s.id === initialStoryId))
  const [storyIndex, setStoryIndex] = useState(initialIndex >= 0 ? initialIndex : 0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [liked, setLiked] = useState(false)
  const [reaction, setReaction] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(startCreate)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<Comment[]>(DEMO_COMMENTS)
  const [toast, setToast] = useState('')
  const [createKorean, setCreateKorean] = useState('')
  const [createMeaning, setCreateMeaning] = useState('')
  const [createTip, setCreateTip] = useState('')
  const [createMedia, setCreateMedia] = useState<StoryMedia | null>(null)
  const [mediaError, setMediaError] = useState('')

  const progressRef = useRef(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const createdUrlsRef = useRef<string[]>([])
  const createFormId = useId()

  const allStories = [...myStories, ...feed]
  const story = allStories[storyIndex] ?? allStories[0]
  const slides = story?.slides ?? []
  const slide = slides[slideIndex]

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  const markRead = useCallback((id: number) => {
    setFeed((prev) => prev.map((s) => (s.id === id ? { ...s, unread: false } : s)))
    setMyStories((prev) => prev.map((s) => (s.id === id ? { ...s, unread: false } : s)))
  }, [])

  useEffect(() => {
    if (story) markRead(story.id)
  }, [story?.id, markRead])

  const goNextSlide = useCallback(() => {
    progressRef.current = 0
    setProgress(0)
    setMenuOpen(false)
    if (slideIndex < slides.length - 1) {
      setSlideIndex((i) => i + 1)
      return
    }
    if (storyIndex < allStories.length - 1) {
      setStoryIndex((i) => i + 1)
      setSlideIndex(0)
      setLiked(false)
      setReaction(null)
      return
    }
    onClose()
  }, [slideIndex, slides.length, storyIndex, allStories.length, onClose])

  const goPrevSlide = useCallback(() => {
    progressRef.current = 0
    setProgress(0)
    setMenuOpen(false)
    if (slideIndex > 0) {
      setSlideIndex((i) => i - 1)
      return
    }
    if (storyIndex > 0) {
      const prev = allStories[storyIndex - 1]
      setStoryIndex((i) => i - 1)
      setSlideIndex(prev.slides.length - 1)
      setLiked(false)
      setReaction(null)
    }
  }, [slideIndex, storyIndex, allStories])

  const selectStory = (id: number) => {
    const idx = allStories.findIndex((s) => s.id === id)
    if (idx < 0) return
    progressRef.current = 0
    setProgress(0)
    setStoryIndex(idx)
    setSlideIndex(0)
    setLiked(false)
    setReaction(null)
    setPaused(false)
    setMenuOpen(false)
    setCommentsOpen(false)
  }

  useEffect(() => {
    if (paused || createOpen || commentsOpen) return
    let frame = 0
    let last = performance.now()

    const loop = (now: number) => {
      const delta = now - last
      last = now
      progressRef.current = Math.min(1, progressRef.current + delta / SLIDE_DURATION)
      setProgress(progressRef.current)
      if (progressRef.current >= 1) {
        goNextSlide()
        return
      }
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [paused, storyIndex, slideIndex, goNextSlide, createOpen, commentsOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (createOpen || commentsOpen) {
        if (e.key === 'Escape') {
          setCreateOpen(false)
          setCommentsOpen(false)
        }
        return
      }
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNextSlide()
      if (e.key === 'ArrowLeft') goPrevSlide()
      if (e.key === ' ') {
        e.preventDefault()
        setPaused((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNextSlide, goPrevSlide, createOpen, commentsOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuOpen])

  const pickMedia = (file: File | undefined) => {
    setMediaError('')
    if (!file) return
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    if (!isImage && !isVideo) {
      setMediaError('Chỉ hỗ trợ tệp ảnh hoặc video.')
      return
    }
    const maxMb = isVideo ? 50 : 10
    if (file.size > maxMb * 1024 * 1024) {
      setMediaError(`Tệp quá lớn (tối đa ${maxMb}MB).`)
      return
    }
    if (createMedia) URL.revokeObjectURL(createMedia.url)
    const url = URL.createObjectURL(file)
    createdUrlsRef.current.push(url)
    setCreateMedia({ type: isVideo ? 'video' : 'image', url })
  }

  const clearMedia = () => {
    if (createMedia) URL.revokeObjectURL(createMedia.url)
    setCreateMedia(null)
    setMediaError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  useEffect(() => {
    const urls = createdUrlsRef.current
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const publishStory = () => {
    const korean = createKorean.trim()
    const meaning = createMeaning.trim()
    if (!korean && !meaning && !createMedia) {
      showToast('Thêm ảnh/video hoặc nhập nội dung để đăng')
      return
    }
    const slideNew: StorySlide = {
      id: `mine-${Date.now()}`,
      bg: createMedia
        ? '#0f0f0f'
        : 'linear-gradient(160deg, #f05123 0%, #ff8a5c 55%, #ffc3a0 100%)',
      korean: korean || undefined,
      meaning: meaning || undefined,
      tip: createTip.trim() || undefined,
      media: createMedia ?? undefined,
    }
    const existing = myStories[0]
    if (existing) {
      const updated = {
        ...existing,
        time: 'Vừa xong',
        unread: false,
        slides: [...existing.slides, slideNew],
      }
      setMyStories([updated])
      setStoryIndex(0)
      setSlideIndex(updated.slides.length - 1)
    } else {
      const mine: StoryUser = {
        id: 9000,
        name: CURRENT_USER.name,
        avatar: CURRENT_USER.avatar,
        verified: false,
        time: 'Vừa xong',
        unread: false,
        label: 'Tin của bạn',
        previewBg: 'linear-gradient(160deg, #f05123 0%, #ff8a5c 100%)',
        cta: 'XEM KHÓA HỌC',
        likes: 0,
        comments: 0,
        shares: 0,
        slides: [slideNew],
      }
      setMyStories([mine])
      setStoryIndex(0)
      setSlideIndex(0)
    }
    setCreateKorean('')
    setCreateMeaning('')
    setCreateTip('')
    setCreateMedia(null)
    setMediaError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
    setCreateOpen(false)
    setPaused(false)
    showToast('Đã đăng tin của bạn')
  }

  const sendComment = () => {
    const text = commentText.trim()
    if (!text) return
    setComments((prev) => [
      { id: `c-${Date.now()}`, author: 'Bạn', text, time: 'Vừa xong' },
      ...prev,
    ])
    setCommentText('')
    setFeed((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, comments: s.comments + 1 } : s)),
    )
    setMyStories((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, comments: s.comments + 1 } : s)),
    )
  }

  const shareStory = async () => {
    const url = `${window.location.origin}/?story=${story.id}`
    try {
      await navigator.clipboard.writeText(url)
      showToast('Đã sao chép liên kết tin')
    } catch {
      showToast('Không sao chép được — thử lại')
    }
    setFeed((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, shares: s.shares + 1 } : s)),
    )
    setMyStories((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, shares: s.shares + 1 } : s)),
    )
  }

  const handleCta = () => {
    const courseId = STORY_CTA_COURSE[story.id] ?? 1
    onClose()
    onSelectKhoaHoc?.(courseId)
  }

  if (!story || !slide) return null

  return (
    <div className="story-viewer" role="dialog" aria-modal="true" aria-label="Xem tin">
      <aside className="story-viewer__sidebar">
        <div className="story-viewer__sidebar-top">
          <button type="button" className="story-viewer__close" onClick={onClose} aria-label="Đóng">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
          <BrandLogo size="sm" className="story-viewer__logo" />
        </div>

        <div className="story-viewer__your">
          <h3>Tin của bạn</h3>
          <button
            type="button"
            className="story-viewer__create"
            onClick={() => {
              setCreateOpen(true)
              setPaused(true)
            }}
          >
            <span className="story-viewer__create-icon">+</span>
            <span>
              <strong>Tạo tin</strong>
              <small>Chia sẻ từ vựng hoặc mẹo học tiếng Hàn</small>
            </span>
          </button>
          {myStories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`story-viewer__list-item${item.id === story.id ? ' is-active' : ''}`}
              onClick={() => selectStory(item.id)}
            >
              <span className="story-viewer__ring">
                <img src={item.avatar} alt="" />
              </span>
              <span className="story-viewer__list-meta">
                <span className="story-viewer__list-name">{item.name}</span>
                <span className="story-viewer__list-time">
                  {item.slides.length} thẻ · {item.time}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="story-viewer__all">
          <h3>Tất cả tin</h3>
          <ul className="story-viewer__list">
            {feed.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`story-viewer__list-item${item.id === story.id ? ' is-active' : ''}`}
                  onClick={() => selectStory(item.id)}
                >
                  <span className={`story-viewer__ring${item.unread ? ' is-unread' : ''}`}>
                    <img src={item.avatar} alt="" />
                  </span>
                  <span className="story-viewer__list-meta">
                    <span className="story-viewer__list-name">
                      {item.name}
                      {item.verified && (
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                          <circle cx="8" cy="8" r="8" fill="#1da1f2" />
                          <path
                            d="M4.5 8l2.2 2.2 4.8-4.8"
                            stroke="#fff"
                            strokeWidth="1.6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="story-viewer__list-time">{item.time}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="story-viewer__stage">
        <button type="button" className="story-viewer__close-mobile" onClick={onClose} aria-label="Đóng">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          className="story-viewer__nav story-viewer__nav--prev"
          onClick={goPrevSlide}
          aria-label="Tin trước"
          disabled={storyIndex === 0 && slideIndex === 0}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="story-viewer__frame">
          <div className="story-viewer__progress">
            {slides.map((s, i) => (
              <div key={s.id} className="story-viewer__bar">
                <div
                  className="story-viewer__bar-fill"
                  style={{
                    width: i < slideIndex ? '100%' : i === slideIndex ? `${progress * 100}%` : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="story-viewer__header">
            <div className="story-viewer__user">
              <img src={story.avatar} alt="" />
              <div>
                <strong>
                  {story.name}
                  {story.verified && (
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <circle cx="8" cy="8" r="8" fill="#1da1f2" />
                      <path
                        d="M4.5 8l2.2 2.2 4.8-4.8"
                        stroke="#fff"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </strong>
                <span>{story.time}</span>
              </div>
            </div>
            <div className="story-viewer__controls" ref={menuRef}>
              <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Bật tiếng' : 'Tắt tiếng'}>
                <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
              </button>
              <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Phát' : 'Tạm dừng'}>
                <FontAwesomeIcon icon={paused ? faPlay : faPause} />
              </button>
              <button
                type="button"
                aria-label="Thêm tùy chọn"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.6" />
                  <circle cx="12" cy="12" r="1.6" />
                  <circle cx="12" cy="19" r="1.6" />
                </svg>
              </button>
              {menuOpen && (
                <div className="story-viewer__menu" role="menu">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setPaused(true)
                      setMenuOpen(false)
                      showToast('Đã tạm dừng tin')
                    }}
                  >
                    Tạm dừng
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      void shareStory()
                      setMenuOpen(false)
                    }}
                  >
                    Sao chép liên kết
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false)
                      showToast('Đã ẩn tin này trong phiên hiện tại')
                      goNextSlide()
                    }}
                  >
                    Ẩn tin
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="is-danger"
                    onClick={() => {
                      setMenuOpen(false)
                      showToast('Đã gửi báo cáo tin')
                    }}
                  >
                    Báo cáo
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="story-viewer__content"
            style={{ background: slide.bg }}
            onClick={(e) => {
              if (commentsOpen || createOpen) return
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              if (x < rect.width / 3) goPrevSlide()
              else goNextSlide()
            }}
          >
            {slide.media &&
              (slide.media.type === 'video' ? (
                <video
                  className="story-viewer__media"
                  src={slide.media.url}
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                />
              ) : (
                <img className="story-viewer__media" src={slide.media.url} alt="" />
              ))}
            {(slide.korean || slide.meaning || slide.tip) && (
              <div
                className={
                  slide.media ? 'story-viewer__card story-viewer__card--overlay' : 'story-viewer__card'
                }
              >
                {slide.korean && <p className="story-viewer__korean">{slide.korean}</p>}
                {slide.meaning && <p className="story-viewer__meaning">{slide.meaning}</p>}
                {slide.tip && <p className="story-viewer__tip">{slide.tip}</p>}
              </div>
            )}
          </div>

          <div className="story-viewer__actions">
            <button
              type="button"
              className={liked ? 'is-liked' : ''}
              onClick={() => setLiked((l) => !l)}
              aria-label="Thích"
            >
              <svg viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'}>
                <path
                  d="M12 21s-7-4.4-9.5-8.2C.5 9.5 2.2 6 5.5 6c1.9 0 3.2 1.1 3.9 2.1C10.1 7.1 11.4 6 13.3 6c3.3 0 5 3.5 3 6.8C19 16.6 12 21 12 21z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <span>{story.likes + (liked ? 1 : 0)}</span>
            </button>
            <button
              type="button"
              aria-label="Bình luận"
              onClick={() => {
                setCommentsOpen(true)
                setPaused(true)
              }}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <span>{story.comments + Math.max(0, comments.length - DEMO_COMMENTS.length)}</span>
            </button>
            <button type="button" aria-label="Chia sẻ" onClick={() => void shareStory()}>
              <FontAwesomeIcon icon={faLink} />
              <span>{story.shares}</span>
            </button>
          </div>

          <button type="button" className="story-viewer__cta" onClick={handleCta}>
            {story.cta}
          </button>

          <div className="story-viewer__reactions">
            {REACTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                className={reaction === item.label ? 'is-active' : ''}
                onClick={() => {
                  setReaction(item.label)
                  setLiked(true)
                  showToast(`Bạn đã bày tỏ cảm xúc: ${item.label}`)
                }}
              >
                <FontAwesomeIcon icon={item.icon} />
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="story-viewer__nav story-viewer__nav--next" onClick={goNextSlide} aria-label="Tin tiếp">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {commentsOpen && (
        <div className="story-viewer__drawer" role="dialog" aria-label="Bình luận">
          <div className="story-viewer__drawer-head">
            <strong>Bình luận</strong>
            <button
              type="button"
              aria-label="Đóng bình luận"
              onClick={() => {
                setCommentsOpen(false)
                setPaused(false)
              }}
            >
              ×
            </button>
          </div>
          <ul className="story-viewer__comments">
            {comments.map((c) => (
              <li key={c.id}>
                <strong>{c.author}</strong>
                <p>{c.text}</p>
                <small>{c.time}</small>
              </li>
            ))}
          </ul>
          <form
            className="story-viewer__comment-form"
            onSubmit={(e) => {
              e.preventDefault()
              sendComment()
            }}
          >
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Viết bình luận..."
              aria-label="Viết bình luận"
            />
            <button type="submit" disabled={!commentText.trim()}>
              Gửi
            </button>
          </form>
        </div>
      )}

      {createOpen && (
        <div className="story-viewer__modal" role="dialog" aria-modal="true" aria-labelledby={createFormId}>
          <div className="story-viewer__modal-card">
            <div className="story-viewer__modal-head">
              <h2 id={createFormId}>Tạo tin của bạn</h2>
              <button
                type="button"
                aria-label="Đóng"
                onClick={() => {
                  setCreateOpen(false)
                  setPaused(false)
                }}
              >
                ×
              </button>
            </div>
            <p className="story-viewer__modal-desc">Chia sẻ ảnh / video kỷ niệm, thành quả học tập của bạn — hoặc thêm một thẻ từ vựng.</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={(e) => pickMedia(e.target.files?.[0])}
            />

            {createMedia ? (
              <div className="story-viewer__media-preview">
                {createMedia.type === 'video' ? (
                  <video src={createMedia.url} controls muted playsInline />
                ) : (
                  <img src={createMedia.url} alt="Xem trước" />
                )}
                <div className="story-viewer__media-preview-actions">
                  <button type="button" onClick={() => fileInputRef.current?.click()}>
                    <FontAwesomeIcon icon={faImage} /> Đổi tệp
                  </button>
                  <button type="button" className="is-danger" onClick={clearMedia}>
                    <FontAwesomeIcon icon={faTrashCan} /> Xóa
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="story-viewer__media-drop"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="story-viewer__media-drop-icons">
                  <FontAwesomeIcon icon={faImage} />
                  <FontAwesomeIcon icon={faVideo} />
                </span>
                <strong>Tải ảnh hoặc video</strong>
                <small>Ảnh tối đa 10MB · Video tối đa 50MB</small>
              </button>
            )}
            {mediaError && <p className="story-viewer__media-error">{mediaError}</p>}

            <label>
              Chữ / câu tiếng Hàn (tuỳ chọn)
              <input
                value={createKorean}
                onChange={(e) => setCreateKorean(e.target.value)}
                placeholder="안녕하세요"
              />
            </label>
            <label>
              Nghĩa / mô tả (tuỳ chọn)
              <input
                value={createMeaning}
                onChange={(e) => setCreateMeaning(e.target.value)}
                placeholder="Kỷ niệm buổi học đầu tiên..."
              />
            </label>
            <label>
              Mẹo nhớ (tuỳ chọn)
              <input
                value={createTip}
                onChange={(e) => setCreateTip(e.target.value)}
                placeholder="Dùng khi gặp lần đầu..."
              />
            </label>
            <div className="story-viewer__modal-actions">
              <button
                type="button"
                className="is-ghost"
                onClick={() => {
                  setCreateOpen(false)
                  setPaused(false)
                }}
              >
                Hủy
              </button>
              <button type="button" className="is-primary" onClick={publishStory}>
                Đăng tin
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="story-viewer__toast">{toast}</div>}
    </div>
  )
}
