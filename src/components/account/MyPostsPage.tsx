import { useState } from 'react'
import './MyPostsPage.css'

type MyPostsPageProps = {
  onWriteBlog?: () => void
  onGoArticles?: () => void
}

export function MyPostsPage({ onWriteBlog, onGoArticles }: MyPostsPageProps) {
  const [tab, setTab] = useState<'draft' | 'published'>('draft')

  return (
    <div className="my-posts-page">
      <h1>Bài viết của tôi</h1>

      <div className="my-posts-page__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'draft'}
          className={tab === 'draft' ? 'is-active' : ''}
          onClick={() => setTab('draft')}
        >
          Bản nháp
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'published'}
          className={tab === 'published' ? 'is-active' : ''}
          onClick={() => setTab('published')}
        >
          Đã xuất bản
        </button>
      </div>

      {tab === 'draft' ? (
        <p className="my-posts-page__empty">
          Chưa có bản nháp nào. Bạn có thể{' '}
          <button type="button" onClick={onWriteBlog}>
            viết bài mới
          </button>{' '}
          hoặc{' '}
          <button type="button" onClick={onGoArticles}>
            đọc bài viết khác
          </button>
          .
        </p>
      ) : (
        <p className="my-posts-page__empty">Chưa có bài viết đã xuất bản.</p>
      )}
    </div>
  )
}
