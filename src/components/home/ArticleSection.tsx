import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ARTICLES } from '../../data/articles'
import './ArticleSection.css'

type ArticleSectionProps = {
  onGoArticles?: () => void
  onSelectArticle?: (articleId: number) => void
}

export function ArticleSection({ onGoArticles, onSelectArticle }: ArticleSectionProps) {
  const articles = ARTICLES.slice(0, 8)

  return (
    <section className="article-section">
      <div className="article-section__header">
        <h2>Bài viết nổi bật</h2>
        <button type="button" onClick={onGoArticles}>
          Xem tất cả
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="article-section__grid">
        {articles.map((article) => (
          <article
            key={article.id}
            className="article-card"
            role={onSelectArticle ? 'button' : undefined}
            tabIndex={onSelectArticle ? 0 : undefined}
            onClick={() => onSelectArticle?.(article.id)}
            onKeyDown={(e) => {
              if (!onSelectArticle) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectArticle(article.id)
              }
            }}
          >
            <div className="article-card__thumb" style={{ background: article.image }}>
              <span className="article-card__icon" aria-hidden="true">
                <FontAwesomeIcon icon={article.icon} />
              </span>
            </div>
            <h3>{article.title}</h3>
            <div className="article-card__footer">
              <div className="article-card__author">
                <img src={article.avatar} alt="" />
                <span>{article.author}</span>
                {article.verified && (
                  <FontAwesomeIcon icon={faCheckCircle} className="article-card__verified" />
                )}
              </div>
              <span className="article-card__time">{article.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
