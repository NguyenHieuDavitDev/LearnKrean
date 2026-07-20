import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faCheckCircle,
  faComment,
  faEllipsis,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import {
  getArticleById,
  getArticlesByAuthor,
  getFeaturedArticles,
} from '../../data/articles'
import './ArticleDetail.css'

type ArticleDetailProps = {
  articleId: number
  onBack: () => void
  onSelectArticle: (articleId: number) => void
}

export function ArticleDetail({ articleId, onBack, onSelectArticle }: ArticleDetailProps) {
  const article = getArticleById(articleId)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [articleId])

  if (!article) {
    return (
      <div className="article-detail article-detail--empty">
        <p>Không tìm thấy bài viết.</p>
        <button type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    )
  }

  const sameAuthor = getArticlesByAuthor(article.author, article.id).slice(0, 5)
  const featured = getFeaturedArticles(article.id, 4)
  const likeCount = article.likes + (liked ? 1 : 0)

  return (
    <article className="article-detail" itemScope itemType="https://schema.org/Article">
      <div className="article-detail__layout">
        <aside className="article-detail__aside">
          <strong className="article-detail__aside-name">{article.author}</strong>
          <a
            className="article-detail__aside-link"
            href={article.authorUrl}
            target="_blank"
            rel="noreferrer"
          >
            {article.authorUrl.replace(/^https?:\/\//, '')}
          </a>
          <div className="article-detail__aside-actions">
            <button
              type="button"
              className={liked ? 'is-active' : ''}
              aria-label="Thích"
              onClick={() => setLiked((v) => !v)}
            >
              <FontAwesomeIcon icon={faHeart} />
              <span>{likeCount}</span>
            </button>
            <button type="button" aria-label="Bình luận">
              <FontAwesomeIcon icon={faComment} />
              <span>{article.comments}</span>
            </button>
          </div>
        </aside>

        <div className="article-detail__main">
          <h1 className="article-detail__title" itemProp="headline">
            {article.title}
          </h1>

          <div className="article-detail__cover">
            <img src={article.image} alt={article.title} itemProp="image" />
          </div>

          <div className="article-detail__head">
            <div className="article-detail__author">
              <img src={article.avatar} alt={`Ảnh đại diện ${article.author}`} />
              <div>
                <p className="article-detail__author-name">
                  {article.author}
                  {article.verified && (
                    <FontAwesomeIcon icon={faCheckCircle} className="article-detail__verified" />
                  )}
                </p>
            <p className="article-detail__author-meta">
              <time itemProp="datePublished">{article.publishedAt}</time> · {article.readTime}
            </p>
              </div>
            </div>
            <div className="article-detail__head-actions">
              <button
                type="button"
                aria-label="Lưu bài viết"
                className={bookmarked ? 'is-active' : ''}
                onClick={() => setBookmarked((v) => !v)}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
              <button type="button" aria-label="Thêm">
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
          </div>

          <div className="article-detail__body" itemProp="articleBody">
            {article.body.map((block, index) => {
              if (block.type === 'p') {
                return <p key={index}>{block.text}</p>
              }
              if (block.type === 'emphasis') {
                return (
                  <p key={index} className="article-detail__emphasis">
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'list') {
                return (
                  <ul key={index} className="article-detail__list">
                    {block.items.map((item) => (
                      <li key={item}>
                        <strong>{item.split(':')[0]}:</strong>
                        {item.includes(':') ? item.slice(item.indexOf(':') + 1) : ''}
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <figure key={index} className="article-detail__figure">
                  <div className="article-detail__figure-media">
                    <img src={block.src} alt={block.alt} loading="lazy" />
                  </div>
                  <figcaption>{block.caption}</figcaption>
                </figure>
              )
            })}
          </div>

          <div className="article-detail__footer-actions">
            <button
              type="button"
              className={liked ? 'is-active' : ''}
              onClick={() => setLiked((v) => !v)}
            >
              <FontAwesomeIcon icon={faHeart} />
              <span>{likeCount}</span>
            </button>
            <button type="button">
              <FontAwesomeIcon icon={faComment} />
              <span>{article.comments}</span>
            </button>
          </div>

          {sameAuthor.length > 0 && (
            <section className="article-detail__section">
              <h2>Bài đăng cùng tác giả</h2>
              <ul className="article-detail__same-author">
                {sameAuthor.map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => onSelectArticle(item.id)}>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="article-detail__section">
            <h2>Bài viết nổi bật khác</h2>
            <div className="article-detail__featured">
              {featured.map((item) => (
                <article
                  key={item.id}
                  className="article-detail__featured-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectArticle(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelectArticle(item.id)
                    }
                  }}
                >
                  <div className="article-detail__featured-thumb">
                    <img src={item.image} alt="" loading="lazy" />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <div className="article-detail__featured-meta">
                      <img src={item.avatar} alt="" />
                      <span>{item.author}</span>
                      <span>· {item.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
