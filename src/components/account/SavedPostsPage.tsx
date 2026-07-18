import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import './SavedPostsPage.css'

type SavedPostsPageProps = {
  onGoArticles?: () => void
}

function AccountPromoAside() {
  return (
    <aside className="account-aside">
      <section className="account-aside__promo">
        <div className="account-aside__promo-media" aria-hidden="true">
          <img src="https://i.pravatar.cc/240?img=5" alt="" />
          <span className="account-aside__promo-badge">PRO</span>
        </div>
        <h2>TOPIK Pro</h2>
        <p>Lộ trình nâng cao cùng {BRAND.shortName}</p>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            Chiến lược đạt TOPIK 4–6
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            Chữa bài viết định kỳ
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            Hỗ trợ học viên trọn đời
          </li>
        </ul>
        <a href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`} className="account-aside__promo-cta">
          Tư vấn khóa Pro
        </a>
        <p className="account-aside__contact">
          {BRAND.company} · {BRAND.phoneDisplay}
        </p>
      </section>
    </aside>
  )
}

export function SavedPostsPage({ onGoArticles }: SavedPostsPageProps) {
  return (
    <div className="saved-posts-page">
      <div className="saved-posts-page__layout">
        <div className="saved-posts-page__main">
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

        <AccountPromoAside />
      </div>
    </div>
  )
}
