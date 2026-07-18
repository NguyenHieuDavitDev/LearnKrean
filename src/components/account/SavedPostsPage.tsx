import './SavedPostsPage.css'

type SavedPostsPageProps = {
  onGoArticles?: () => void
}

export function SavedPostsPage({ onGoArticles }: SavedPostsPageProps) {
  return (
    <div className="saved-posts-page">
      <h1>Bài viết đã lưu</h1>

      <div className="saved-posts-page__tabs" role="tablist">
        <button type="button" role="tab" aria-selected className="is-active">
          Bài viết (0)
        </button>
      </div>

      <p className="saved-posts-page__empty">
        Bạn chưa lưu bài viết nào.{' '}
        <button type="button" onClick={onGoArticles}>
          Khám phá bài viết
        </button>
      </p>
    </div>
  )
}
