import { useMemo, useState, type MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import {
  ARTICLE_TOPICS,
  getArticlesByTopic,
  type Article,
  type ArticleTopic,
} from '../../data/articles'
import './ArticlesPage.css'

const PAGE_SIZE = 5

type ArticlesPageProps = {
  onSelectArticle: (articleId: number) => void
  initialTopic?: ArticleTopic | 'all'
}

function topicLabel(topic: ArticleTopic) {
  return ARTICLE_TOPICS.find((t) => t.id === topic)?.label ?? topic
}

export function ArticlesPage({ onSelectArticle, initialTopic = 'all' }: ArticlesPageProps) {
  const [topic, setTopic] = useState<ArticleTopic | 'all'>(initialTopic)
  const [page, setPage] = useState(1)
  const [saved, setSaved] = useState<Record<number, boolean>>({})

  const filtered = useMemo(() => getArticlesByTopic(topic), [topic])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const articles = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const selectTopic = (next: ArticleTopic | 'all') => {
    setTopic(next)
    setPage(1)
  }

  const toggleSave = (id: number, e: MouseEvent) => {
    e.stopPropagation()
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="articles-page">
      <div className="articles-page__layout">
        <div className="articles-page__main">
          <header className="articles-page__intro page-intro">
            <p className="page-intro__kicker">Đọc & học</p>
            <h1>Bài viết nổi bật</h1>
            <p>
              Tổng hợp bài về du học, cuộc sống tại Hàn, học phí trường đại học, TOPIK và giao tiếp — chọn
              lọc để bạn học tiếng Hàn hiệu quả hơn cùng {BRAND.shortName}.
            </p>
          </header>

          <div className="articles-page__feed">
            {articles.map((article) => (
              <ArticleFeedCard
                key={article.id}
                article={article}
                saved={!!saved[article.id]}
                onSave={(e) => toggleSave(article.id, e)}
                onOpen={() => onSelectArticle(article.id)}
              />
            ))}
          </div>

          {articles.length === 0 && (
            <p className="articles-page__empty">Chưa có bài viết trong chủ đề này.</p>
          )}

          {filtered.length > PAGE_SIZE && (
            <nav className="articles-page__pagination" aria-label="Phân trang bài viết">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Trang trước"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={num === currentPage ? 'is-active' : ''}
                  onClick={() => setPage(num)}
                  aria-current={num === currentPage ? 'page' : undefined}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Trang sau"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </nav>
          )}
        </div>

        <aside className="articles-page__aside">
          <section className="articles-page__topics-box">
            <p className="articles-page__topics-label">Xem các bài viết theo chủ đề</p>
            <div className="articles-page__chips" role="tablist" aria-label="Chủ đề bài viết">
              {ARTICLE_TOPICS.filter((t) => t.id !== 'all').map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={topic === item.id}
                  className={`articles-page__chip${topic === item.id ? ' is-active' : ''}`}
                  onClick={() => selectTopic(item.id)}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                role="tab"
                aria-selected={topic === 'all'}
                className={`articles-page__chip${topic === 'all' ? ' is-active' : ''}`}
                onClick={() => selectTopic('all')}
              >
                Tất cả
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function ArticleFeedCard({
  article,
  saved,
  onSave,
  onOpen,
}: {
  article: Article
  saved: boolean
  onSave: (e: MouseEvent) => void
  onOpen: () => void
}) {
  return (
    <article
      className="article-feed-card"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
    >
      <div className="article-feed-card__top">
        <div className="article-feed-card__author">
          <img src={article.avatar} alt="" />
          <span>{article.author}</span>
          {article.verified && (
            <FontAwesomeIcon icon={faCheckCircle} className="article-feed-card__verified" />
          )}
        </div>
        <div className="article-feed-card__actions">
          <button
            type="button"
            className={saved ? 'is-active' : ''}
            aria-label="Lưu bài viết"
            onClick={onSave}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </button>
          <button
            type="button"
            aria-label="Thêm"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      </div>

      <div className="article-feed-card__body">
        <div className="article-feed-card__text">
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <div className="article-feed-card__meta">
            <span className="article-feed-card__tag">{topicLabel(article.topic)}</span>
            <span>{article.publishedAt}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
        <div className="article-feed-card__thumb">
          <img src={article.image} alt="" loading="lazy" />
        </div>
      </div>
    </article>
  )
}
