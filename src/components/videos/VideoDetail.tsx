import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faEye,
  faPause,
  faPlay,
  faShareNodes,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { getRelatedVideos, getVideoById } from '../../data/videos'
import { VideoCard } from './VideoCard'
import './VideoDetail.css'

type VideoDetailProps = {
  videoId: number
  onBack: () => void
  onSelectVideo: (videoId: number) => void
}

export function VideoDetail({ videoId, onBack, onSelectVideo }: VideoDetailProps) {
  const video = getVideoById(videoId)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [videoId])

  if (!video) {
    return (
      <div className="video-detail video-detail--empty">
        <p>Không tìm thấy video.</p>
        <button type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    )
  }

  const related = getRelatedVideos(video.id)
  const likeCount = video.likesCount + (liked ? 1 : 0)

  return (
    <div className="video-detail">
      <div className="video-detail__layout">
        <div className="video-detail__main">
          <div
            className={`video-detail__player${playing ? ' is-playing' : ''}`}
            style={{ background: video.gradient }}
          >
            <button
              type="button"
              className="video-detail__play-btn"
              aria-label={playing ? 'Tạm dừng' : 'Phát video'}
              onClick={() => setPlaying((v) => !v)}
            >
              <FontAwesomeIcon icon={playing ? faPause : faPlay} />
            </button>
            <span className="video-detail__duration">{video.duration}</span>
            {playing && (
              <div className="video-detail__progress" aria-hidden="true">
                <span />
              </div>
            )}
          </div>

          <h1 className="video-detail__title">{video.title}</h1>

          <div className="video-detail__meta-row">
            <div className="video-detail__author">
              <img src={video.avatar} alt="" />
              <div>
                <strong>{video.author}</strong>
                <p>
                  {video.views} lượt xem · {video.publishedAt}
                </p>
              </div>
            </div>
            <div className="video-detail__actions">
              <button
                type="button"
                className={liked ? 'is-active' : ''}
                onClick={() => setLiked((v) => !v)}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                {likeCount.toLocaleString('vi-VN')}
              </button>
              <button type="button">
                <FontAwesomeIcon icon={faComment} />
                {video.comments}
              </button>
              <button type="button">
                <FontAwesomeIcon icon={faShareNodes} />
                Chia sẻ
              </button>
            </div>
          </div>

          <div className="video-detail__desc">
            <div className="video-detail__tags">
              {video.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>{video.description}</p>
            <ul className="video-detail__stats-inline">
              <li>
                <FontAwesomeIcon icon={faEye} />
                {video.views} lượt xem
              </li>
              <li>
                <FontAwesomeIcon icon={faThumbsUp} />
                {video.likes} lượt thích
              </li>
              <li>
                <FontAwesomeIcon icon={faComment} />
                {video.comments} bình luận
              </li>
            </ul>
          </div>
        </div>

        <aside className="video-detail__aside">
          <h2>Video liên quan</h2>
          <div className="video-detail__related">
            {related.map((item) => (
              <VideoCard key={item.id} video={item} compact onSelect={onSelectVideo} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
