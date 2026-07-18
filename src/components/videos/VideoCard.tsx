import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faEye, faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import type { Video } from '../../data/videos'
import './VideoCard.css'

type VideoCardProps = {
  video: Video
  onSelect?: (videoId: number) => void
  compact?: boolean
}

export function VideoCard({ video, onSelect, compact = false }: VideoCardProps) {
  return (
    <article
      className={`video-card${compact ? ' video-card--compact' : ''}`}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={() => onSelect?.(video.id)}
      onKeyDown={(e) => {
        if (!onSelect) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(video.id)
        }
      }}
    >
      <div className="video-card__thumb" style={{ background: video.gradient }}>
        <span className="video-card__play" aria-hidden="true">
          <FontAwesomeIcon icon={faPlay} />
        </span>
        <span className="video-card__duration">{video.duration}</span>
      </div>
      <div className="video-card__body">
        <h3>{video.title}</h3>
        {!compact && (
          <div className="video-card__stats">
            <span>
              <FontAwesomeIcon icon={faEye} />
              {video.views}
            </span>
            <span>
              <FontAwesomeIcon icon={faThumbsUp} />
              {video.likes}
            </span>
            <span>
              <FontAwesomeIcon icon={faComment} />
              {video.comments}
            </span>
          </div>
        )}
        {compact && (
          <p className="video-card__compact-meta">
            {video.views} lượt xem · {video.publishedAt}
          </p>
        )}
      </div>
    </article>
  )
}
