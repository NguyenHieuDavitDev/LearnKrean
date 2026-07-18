import { useMemo, useState } from 'react'
import { VIDEO_TOPICS, getVideosByTopic, type VideoTopic } from '../../data/videos'
import { VideoCard } from './VideoCard'
import './VideosPage.css'

type VideosPageProps = {
  onSelectVideo: (videoId: number) => void
}

export function VideosPage({ onSelectVideo }: VideosPageProps) {
  const [topic, setTopic] = useState<VideoTopic | 'all'>('all')
  const videos = useMemo(() => getVideosByTopic(topic), [topic])

  return (
    <div className="videos-page">
      <header className="videos-page__head">
        <div>
          <h1>Video nổi bật</h1>
          <p>Học tiếng Hàn qua video: Hangul, giao tiếp, luyện nghe và chiến lược TOPIK.</p>
        </div>
      </header>

      <div className="videos-page__chips" role="tablist" aria-label="Chủ đề video">
        {VIDEO_TOPICS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={topic === item.id}
            className={`videos-page__chip${topic === item.id ? ' is-active' : ''}`}
            onClick={() => setTopic(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="videos-page__grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={onSelectVideo} />
        ))}
      </div>

      {videos.length === 0 && (
        <p className="videos-page__empty">Chưa có video trong chủ đề này.</p>
      )}
    </div>
  )
}
