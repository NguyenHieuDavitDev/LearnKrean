import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import './MyPostsPage.css'

type MyPostsPageProps = {
  onWriteBlog?: () => void
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

export function MyPostsPage({ onWriteBlog, onGoArticles }: MyPostsPageProps) {
  const [tab, setTab] = useState<'draft' | 'published'>('draft')

  return (
    <div className="my-posts-page">
      <div className="my-posts-page__layout">
        <div className="my-posts-page__main">
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

        <AccountPromoAside />
      </div>
    </div>
  )
}
