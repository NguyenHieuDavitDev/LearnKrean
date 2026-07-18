import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faClosedCaptioning,
  faCompress,
  faExpand,
  faForward,
  faPause,
  faPlay,
  faRedo,
  faStepBackward,
  faStepForward,
  faVolumeHigh,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons'
import { formatTime, resolveDemoDuration } from './videoUtils'

export type VideoQuality = 'auto' | '1080p' | '720p' | '480p' | '360p'
type SubtitleLang = 'off' | 'vi' | 'ko' | 'en'
type Panel = 'volume' | 'speed' | 'subtitle' | 'quality' | null

type NetworkInfo = {
  downlink: number
  effectiveType: string
  rtt: number
  saveData: boolean
}

type LearningVideoPlayerProps = {
  title: string
  courseTitle: string
  lessonNumber: string
  durationLabel: string
  gradient: string
  teacherName: string
  activeQuality: Exclude<VideoQuality, 'auto'>
  qualityMode: VideoQuality
  suggestedQuality: Exclude<VideoQuality, 'auto'>
  network: NetworkInfo
  networkLabel: string
  qualityToast: string
  onQualityChange: (quality: VideoQuality) => void
  onEnded?: () => void
  onNextLesson?: () => void
  hasNextLesson?: boolean
  onTimeUpdate?: (currentSec: number, durationSec: number) => void
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const
const QUALITY_OPTIONS: { id: VideoQuality; label: string; hint: string }[] = [
  { id: 'auto', label: 'Tự động', hint: 'Theo tốc độ mạng' },
  { id: '1080p', label: '1080p', hint: 'Full HD · ~5 Mbps' },
  { id: '720p', label: '720p', hint: 'HD · ~2.5 Mbps' },
  { id: '480p', label: '480p', hint: 'SD · ~1 Mbps' },
  { id: '360p', label: '360p', hint: 'Tiết kiệm dữ liệu' },
]
const SUBTITLE_OPTIONS: { id: SubtitleLang; label: string }[] = [
  { id: 'off', label: 'Tắt phụ đề' },
  { id: 'vi', label: 'Tiếng Việt' },
  { id: 'ko', label: '한국어' },
  { id: 'en', label: 'English' },
]

function subtitleFor(lang: SubtitleLang, title: string, progress: number) {
  if (lang === 'off') return ''
  const phase = progress < 0.15 ? 'intro' : progress < 0.55 ? 'main' : progress < 0.9 ? 'practice' : 'outro'
  if (lang === 'ko') {
    if (phase === 'intro') return `${title} · 안녕하세요, 오늘 수업을 시작합니다.`
    if (phase === 'main') return `${title} · 핵심 표현을 함께 익혀 봅시다.`
    if (phase === 'practice') return `${title} · 따라 말해 보세요.`
    return `${title} · 오늘 수업은 여기까지입니다.`
  }
  if (lang === 'en') {
    if (phase === 'intro') return `${title} · Welcome — let's start today's lesson.`
    if (phase === 'main') return `${title} · Focus on the key expressions.`
    if (phase === 'practice') return `${title} · Try repeating after me.`
    return `${title} · That's the end of this lesson.`
  }
  if (phase === 'intro') return `${title} · Xin chào, chúng ta bắt đầu bài học.`
  if (phase === 'main') return `${title} · Cùng nắm các mẫu câu trọng tâm.`
  if (phase === 'practice') return `${title} · Hãy nhắc lại theo cô.`
  return `${title} · Cảm ơn bạn đã hoàn thành bài học.`
}

export function LearningVideoPlayer({
  title,
  courseTitle,
  lessonNumber,
  durationLabel,
  gradient,
  teacherName,
  activeQuality,
  qualityMode,
  suggestedQuality,
  network,
  networkLabel,
  qualityToast,
  onQualityChange,
  onEnded,
  onNextLesson,
  hasNextLesson = false,
  onTimeUpdate,
}: LearningVideoPlayerProps) {
  const durationSec = resolveDemoDuration(durationLabel)
  const rootRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef(0)
  const endTimerRef = useRef(0)
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)
  const playingRef = useRef(false)
  const speedRef = useRef(1)
  const currentRef = useRef(0)
  const durationRef = useRef(durationSec)
  const endedRef = useRef(false)
  const bufferingRef = useRef(true)
  const onEndedRef = useRef(onEnded)
  const onNextRef = useRef(onNextLesson)
  const handlersRef = useRef<{
    togglePlay: () => void
    seekBy: (delta: number) => void
    toggleFullscreen: () => Promise<void>
  }>({
    togglePlay: () => undefined,
    seekBy: () => undefined,
    toggleFullscreen: async () => undefined,
  })

  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [buffering, setBuffering] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [buffered, setBuffered] = useState(3)
  const [volume, setVolume] = useState(80)
  const [muted, setMuted] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [subtitle, setSubtitle] = useState<SubtitleLang>('vi')
  const [fullscreen, setFullscreen] = useState(false)
  const [panel, setPanel] = useState<Panel>(null)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [hoverPct, setHoverPct] = useState<number | null>(null)
  const [seekFlash, setSeekFlash] = useState<'back' | 'fwd' | null>(null)
  const [endCountdown, setEndCountdown] = useState(8)

  const progressPct = durationSec > 0 ? (currentTime / durationSec) * 100 : 0
  const bufferedPct = durationSec > 0 ? (buffered / durationSec) * 100 : 0
  const subtitleText = subtitleFor(subtitle, title, currentTime / Math.max(durationSec, 1))

  useEffect(() => {
    onEndedRef.current = onEnded
    onNextRef.current = onNextLesson
  }, [onEnded, onNextLesson])

  useEffect(() => {
    playingRef.current = playing
    speedRef.current = speed
    currentRef.current = currentTime
    durationRef.current = durationSec
    endedRef.current = ended
    bufferingRef.current = buffering
  }, [playing, speed, currentTime, durationSec, ended, buffering])

  useEffect(() => {
    onTimeUpdate?.(currentTime, durationSec)
  }, [currentTime, durationSec, onTimeUpdate])

  useEffect(() => {
    bufferingRef.current = true
    const start = window.setTimeout(() => setBuffering(true), 0)
    const stop = window.setTimeout(() => {
      setBuffering(false)
      bufferingRef.current = false
    }, 650)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(stop)
    }
  }, [activeQuality])

  useEffect(() => {
    const start = window.setTimeout(() => setBuffering(true), 0)
    const stop = window.setTimeout(() => {
      setBuffering(false)
      setBuffered(Math.min(durationSec * 0.15, 5))
    }, 900)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(stop)
    }
  }, [durationSec])

  useEffect(() => {
    const tick = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts
      const delta = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      if (playingRef.current && !endedRef.current && !bufferingRef.current) {
        const next = Math.min(durationRef.current, currentRef.current + delta * speedRef.current)
        setCurrentTime(next)
        setBuffered((prev) =>
          Math.min(durationRef.current, Math.max(prev, next + 6 * delta * speedRef.current)),
        )
        if (next >= durationRef.current - 0.05) {
          setPlaying(false)
          setEnded(true)
          setCurrentTime(durationRef.current)
          setControlsVisible(true)
          onEndedRef.current?.()
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    if (!ended || !hasNextLesson) return
    let count = 8
    const timer = window.setInterval(() => {
      count -= 1
      setEndCountdown(count)
      if (count <= 0) {
        window.clearInterval(timer)
        onNextRef.current?.()
      }
    }, 1000)
    endTimerRef.current = timer
    return () => window.clearInterval(timer)
  }, [ended, hasNextLesson])

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const showControls = () => {
    setControlsVisible(true)
    window.clearTimeout(hideTimerRef.current)
    if (playingRef.current && !endedRef.current) {
      hideTimerRef.current = window.setTimeout(() => {
        setControlsVisible(false)
        setPanel(null)
      }, 2800)
    }
  }

  const replay = () => {
    window.clearInterval(endTimerRef.current)
    setEnded(false)
    setCurrentTime(0)
    setBuffered(4)
    setEndCountdown(8)
    setPanel(null)
    setControlsVisible(true)
    setBuffering(true)
    window.setTimeout(() => {
      setBuffering(false)
      setPlaying(true)
    }, 450)
  }

  const togglePlay = () => {
    if (endedRef.current) {
      replay()
      return
    }
    if (bufferingRef.current) return
    setPlaying((v) => {
      const next = !v
      if (!next) setControlsVisible(true)
      else showControls()
      return next
    })
  }

  const seekBy = (delta: number) => {
    if (endedRef.current && delta < 0) setEnded(false)
    setSeekFlash(delta < 0 ? 'back' : 'fwd')
    window.setTimeout(() => setSeekFlash(null), 450)
    setCurrentTime((t) => {
      const next = Math.min(durationSec, Math.max(0, t + delta))
      if (next >= durationSec - 0.05) {
        setPlaying(false)
        setEnded(true)
      }
      return next
    })
    setBuffered((b) => Math.max(b, Math.min(durationSec, currentRef.current + Math.abs(delta) + 3)))
    setBuffering(true)
    window.setTimeout(() => setBuffering(false), 250)
    showControls()
  }

  const seekToRatio = (ratio: number) => {
    const next = Math.min(durationSec, Math.max(0, ratio * durationSec))
    setEnded(false)
    setCurrentTime(next)
    setBuffered((b) => Math.max(b, Math.min(durationSec, next + 4)))
    setBuffering(true)
    window.setTimeout(() => setBuffering(false), 280)
    showControls()
  }

  const toggleFullscreen = async () => {
    const node = rootRef.current
    if (!node) return
    if (!document.fullscreenElement) await node.requestFullscreen()
    else await document.exitFullscreen()
  }

  useEffect(() => {
    handlersRef.current = { togglePlay, seekBy, toggleFullscreen }
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      showControls()
      const { togglePlay: play, seekBy: seek, toggleFullscreen: fs } = handlersRef.current
      if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
        e.preventDefault()
        play()
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault()
        seek(10)
      } else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
        e.preventDefault()
        seek(-10)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setMuted(false)
        setVolume((v) => Math.min(100, v + 5))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setVolume((v) => {
          const next = Math.max(0, v - 5)
          if (next === 0) setMuted(true)
          return next
        })
      } else if (e.key === 'm' || e.key === 'M') setMuted((v) => !v)
      else if (e.key === 'f' || e.key === 'F') void fs()
      else if (e.key === 'c' || e.key === 'C') setSubtitle((s) => (s === 'off' ? 'vi' : 'off'))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const togglePanel = (next: Exclude<Panel, null>) => {
    setPanel((current) => (current === next ? null : next))
    showControls()
  }

  const onProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    seekToRatio((e.clientX - rect.left) / rect.width)
  }

  return (
    <div
      className={`learning__video${fullscreen ? ' is-fullscreen' : ''}${controlsVisible || !playing || ended || buffering ? ' show-controls' : ''}${ended ? ' is-ended' : ''}`}
      ref={rootRef}
      style={{ background: gradient }}
      onMouseMove={showControls}
      onMouseLeave={() => {
        if (playing && !ended) setControlsVisible(false)
        setHoverPct(null)
      }}
      onClick={(e) => {
        if (
          (e.target as HTMLElement).closest(
            'button, input, .learning__progress, .learning__popup, .learning__end-screen',
          )
        )
          return
        togglePlay()
      }}
      onDoubleClick={(e) => {
        if ((e.target as HTMLElement).closest('button, input, .learning__progress, .learning__popup')) return
        void toggleFullscreen()
      }}
      role="region"
      aria-label={`Trình phát video ${lessonNumber} ${title}`}
    >
      <div className="learning__video-decoration learning__video-decoration--one" />
      <div className="learning__video-decoration learning__video-decoration--two" />

      <div className={`learning__video-copy${playing && !ended ? ' is-dim' : ''}`}>
        <span>{courseTitle}</span>
        <strong>{title}</strong>
        <small>
          Bài {lessonNumber} · {activeQuality}
          {qualityMode === 'auto' ? ' (Auto)' : ''} · {speed}x · GV {teacherName}
        </small>
      </div>

      <div className="learning__quality-badge" title={networkLabel}>
        <strong>{activeQuality}</strong>
        <span>
          {qualityMode === 'auto' ? 'Auto' : 'Thủ công'} · {network.downlink.toFixed(1)} Mbps
        </span>
      </div>

      {qualityToast && <div className="learning__quality-toast">{qualityToast}</div>}
      {subtitleText && !ended && <div className="learning__subtitle">{subtitleText}</div>}

      {buffering && !ended && (
        <div className="learning__buffering" aria-live="polite">
          <span className="learning__spinner" />
          <small>Đang tải {activeQuality}...</small>
        </div>
      )}

      {seekFlash && (
        <div className={`learning__seek-flash learning__seek-flash--${seekFlash}`}>
          <FontAwesomeIcon icon={seekFlash === 'back' ? faStepBackward : faStepForward} />
          <span>{seekFlash === 'back' ? '−10 giây' : '+10 giây'}</span>
        </div>
      )}

      {!ended && !buffering && (
        <button
          type="button"
          className={`learning__big-play${!playing ? ' is-visible' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          aria-label={playing ? 'Tạm dừng' : 'Phát video'}
        >
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </button>
      )}

      {ended && (
        <div className="learning__end-screen" onClick={(e) => e.stopPropagation()}>
          <h3>Đã xem xong bài học</h3>
          <p>
            {lessonNumber} {title}
          </p>
          <div className="learning__end-actions">
            <button type="button" onClick={replay}>
              <FontAwesomeIcon icon={faRedo} /> Xem lại
            </button>
            {hasNextLesson && (
              <button
                type="button"
                className="is-primary"
                onClick={() => {
                  window.clearInterval(endTimerRef.current)
                  onNextLesson?.()
                }}
              >
                <FontAwesomeIcon icon={faForward} /> Bài tiếp theo
                {endCountdown > 0 && <em> ({endCountdown})</em>}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="learning__chrome" onClick={(e) => e.stopPropagation()}>
        <div
          className="learning__progress"
          onClick={onProgressClick}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setHoverPct(((e.clientX - rect.left) / rect.width) * 100)
          }}
          onMouseLeave={() => setHoverPct(null)}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={durationSec}
          aria-valuenow={Math.floor(currentTime)}
          aria-label="Tiến độ video"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') seekBy(5)
            if (e.key === 'ArrowLeft') seekBy(-5)
          }}
        >
          <div className="learning__progress-buffered" style={{ width: `${bufferedPct}%` }} />
          <div className="learning__progress-played" style={{ width: `${progressPct}%` }} />
          <span className="learning__progress-thumb" style={{ left: `${progressPct}%` } as CSSProperties} />
          {hoverPct !== null && (
            <span className="learning__progress-hover" style={{ left: `${hoverPct}%` }}>
              {formatTime((hoverPct / 100) * durationSec)}
            </span>
          )}
        </div>

        <div className="learning__controls">
          <button type="button" onClick={togglePlay} aria-label="Phát/Tạm dừng">
            <FontAwesomeIcon icon={ended ? faRedo : playing ? faPause : faPlay} />
          </button>
          <button type="button" onClick={() => seekBy(-10)} aria-label="Tua lại 10 giây">
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button type="button" onClick={() => seekBy(10)} aria-label="Tua tới 10 giây">
            <FontAwesomeIcon icon={faStepForward} />
          </button>

          <div className="learning__control-group">
            <button
              type="button"
              onClick={() => {
                if (muted || volume === 0) {
                  setMuted(false)
                  setVolume((v) => (v === 0 ? 60 : v))
                } else setMuted(true)
              }}
              aria-label="Tắt/bật tiếng"
            >
              <FontAwesomeIcon icon={muted || volume === 0 ? faVolumeMute : faVolumeHigh} />
            </button>
            <button type="button" className="learning__control-label" onClick={() => togglePanel('volume')}>
              {muted ? 0 : volume}%
            </button>
            {panel === 'volume' && (
              <div className="learning__popup">
                <label>
                  Âm lượng
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      const next = Number(e.target.value)
                      setVolume(next)
                      setMuted(next === 0)
                    }}
                  />
                </label>
              </div>
            )}
          </div>

          <span className="learning__time">
            {formatTime(currentTime)} / {formatTime(durationSec)}
            <small>demo</small>
          </span>
          <span className="learning__control-spacer" />

          <div className="learning__control-group">
            <button type="button" onClick={() => togglePanel('speed')} aria-label="Tốc độ phát">
              {speed}x
            </button>
            {panel === 'speed' && (
              <div className="learning__popup learning__popup--list">
                {SPEEDS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={speed === item ? 'is-active' : ''}
                    onClick={() => {
                      setSpeed(item)
                      setPanel(null)
                    }}
                  >
                    {item}x
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="learning__control-group">
            <button
              type="button"
              className="learning__control-label"
              onClick={() => togglePanel('quality')}
              aria-label="Chất lượng video"
            >
              {qualityMode === 'auto' ? `Auto ${activeQuality}` : activeQuality}
            </button>
            {panel === 'quality' && (
              <div className="learning__popup learning__popup--quality">
                <p className="learning__popup-meta">{networkLabel}</p>
                <p className="learning__popup-meta learning__popup-meta--soft">
                  Gợi ý hiện tại: <strong>{suggestedQuality}</strong>
                </p>
                {QUALITY_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={qualityMode === item.id ? 'is-active' : ''}
                    onClick={() => {
                      onQualityChange(item.id)
                      setPanel(null)
                    }}
                  >
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.hint}</small>
                    </span>
                    {qualityMode === item.id && <FontAwesomeIcon icon={faCheck} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="learning__control-group">
            <button type="button" onClick={() => togglePanel('subtitle')} aria-label="Phụ đề">
              <FontAwesomeIcon icon={faClosedCaptioning} />
            </button>
            {panel === 'subtitle' && (
              <div className="learning__popup learning__popup--list">
                {SUBTITLE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={subtitle === item.id ? 'is-active' : ''}
                    onClick={() => {
                      setSubtitle(item.id)
                      setPanel(null)
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" onClick={() => void toggleFullscreen()} aria-label="Phóng to video">
            <FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} />
          </button>
        </div>
      </div>
    </div>
  )
}
