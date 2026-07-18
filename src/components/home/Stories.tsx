import { STORIES } from '../../data/stories'
import { CURRENT_USER } from '../../data/user'
import './Stories.css'

type StoriesProps = {
  onOpenStory: (storyId: number) => void
  onCreateStory?: () => void
}

export function Stories({ onOpenStory, onCreateStory }: StoriesProps) {
  return (
    <section className="stories">
      <h2 className="stories__title">Tin</h2>
      <div className="stories__list">
        <article
          className="stories__card stories__card--create"
          role="button"
          tabIndex={0}
          onClick={() => onCreateStory?.()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onCreateStory?.()
            }
          }}
        >
          <div className="stories__media stories__media--create">
            <img src={CURRENT_USER.avatar} alt="" className="stories__avatar" />
            <span className="stories__create-plus" aria-hidden="true">
              +
            </span>
            <span className="stories__label">Tạo tin</span>
          </div>
          <p className="stories__name">Tin của bạn</p>
        </article>

        {STORIES.slice(0, 5).map((story) => (
          <article
            key={story.id}
            className="stories__card"
            role="button"
            tabIndex={0}
            onClick={() => onOpenStory(story.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpenStory(story.id)
              }
            }}
          >
            <div className="stories__media" style={{ background: story.previewBg }}>
              <img src={story.avatar} alt="" className="stories__avatar" />
              <span className="stories__label">{story.label}</span>
            </div>
            <p className="stories__name">
              {story.name}
              {story.verified && (
                <svg className="stories__verified" viewBox="0 0 16 16" aria-hidden="true">
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
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
