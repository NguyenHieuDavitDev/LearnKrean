import { VIDEOS } from '../../data/videos'
import { VideoCard } from '../videos/VideoCard'
import './VideoSection.css'

type VideoSectionProps = {
  onGoVideos?: () => void
  onSelectVideo?: (videoId: number) => void
}

export function VideoSection({ onGoVideos, onSelectVideo }: VideoSectionProps) {
  const videos = VIDEOS.slice(0, 8)

  return (
    <section className="video-section">
      <div className="video-section__header">
        <h2>Video nổi bật</h2>
        <button type="button" onClick={onGoVideos}>
          Xem tất cả
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="video-section__grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={onSelectVideo} />
        ))}
      </div>
    </section>
  )
}
