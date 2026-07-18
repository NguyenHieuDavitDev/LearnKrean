import { useState } from 'react'
import { Stories } from './Stories'
import { HeroBanner, type HeroBannerAction } from './HeroBanner'
import { KhoaHocSection } from './CourseSection'
import { ArticleSection } from './ArticleSection'
import { VideoSection } from './VideoSection'
import { StoryViewer } from '../stories/StoryViewer'
import { STORIES } from '../../data/stories'
import './HomePage.css'

type HomePageProps = {
  onSelectKhoaHoc: (khoaHocId: number) => void
  onGoPro?: () => void
  onGoArticles?: () => void
  onSelectArticle?: (articleId: number) => void
  onGoVideos?: () => void
  onSelectVideo?: (videoId: number) => void
  onGoFlashcards?: () => void
  onGoRoadmap?: () => void
}

export function HomePage({
  onSelectKhoaHoc,
  onGoPro,
  onGoArticles,
  onSelectArticle,
  onGoVideos,
  onSelectVideo,
  onGoFlashcards,
  onGoRoadmap,
}: HomePageProps) {
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null)
  const [startCreate, setStartCreate] = useState(false)

  const handleBannerAction = (action: HeroBannerAction) => {
    if (action.type === 'course') {
      onSelectKhoaHoc(action.khoaHocId)
      return
    }
    if (action.type === 'pro') {
      onGoPro?.()
      return
    }
    if (action.page === 'flashcards') onGoFlashcards?.()
    else if (action.page === 'roadmap') onGoRoadmap?.()
    else if (action.page === 'videos') onGoVideos?.()
  }

  const openCreate = () => {
    setStartCreate(true)
    setActiveStoryId(STORIES[0]?.id ?? 1)
  }

  return (
    <div className="home-page">
      <Stories onOpenStory={setActiveStoryId} onCreateStory={openCreate} />
      <HeroBanner onAction={handleBannerAction} />
      <KhoaHocSection onSelectKhoaHoc={onSelectKhoaHoc} onGoPro={onGoPro} />
      <ArticleSection onGoArticles={onGoArticles} onSelectArticle={onSelectArticle} />
      <VideoSection onGoVideos={onGoVideos} onSelectVideo={onSelectVideo} />

      {activeStoryId !== null && (
        <StoryViewer
          key={`${activeStoryId}-${startCreate ? 'create' : 'view'}`}
          initialStoryId={activeStoryId}
          startCreate={startCreate}
          onClose={() => {
            setActiveStoryId(null)
            setStartCreate(false)
          }}
          onSelectKhoaHoc={onSelectKhoaHoc}
        />
      )}
    </div>
  )
}
