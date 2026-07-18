import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import { BrandLogo } from '../layout/BrandLogo'
import { ARTICLES } from '../../data/articles'
import './HomePage.css'

type HomePageProps = {
  onGoArticles?: () => void
  onSelectArticle?: (articleId: number) => void
  onGoRoadmap?: () => void
  onGoAbout?: () => void
}

export function HomePage({
  onGoArticles,
  onSelectArticle,
  onGoRoadmap,
  onGoAbout,
}: HomePageProps) {
  const featured = ARTICLES[0]
  const moreArticles = ARTICLES.slice(1, 5)

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__plane" aria-hidden="true">
          <span className="home-hero__wash home-hero__wash--a" />
          <span className="home-hero__wash home-hero__wash--b" />
          <span className="home-hero__script">안녕하세요</span>
          <span className="home-hero__mark">{BRAND.mark}</span>
        </div>

        <div className="home-hero__content">
          <div className="home-hero__brand">
            <BrandLogo size="lg" className="home-hero__logo" />
            <p className="home-hero__brand-name">{BRAND.name}</p>
          </div>
          <h1 id="home-hero-title">Học tiếng Hàn rõ ràng, gần gũi từng ngày</h1>
          <p className="home-hero__lead">
            Lộ trình chọn lọc, bài viết thực tế và cộng đồng đồng hành cùng bạn.
          </p>
          <div className="home-hero__actions">
            <button type="button" className="home-hero__cta" onClick={onGoRoadmap}>
              Bắt đầu lộ trình
            </button>
            <button type="button" className="home-hero__cta home-hero__cta--ghost" onClick={onGoAbout}>
              Về chúng tôi
            </button>
          </div>
        </div>
      </section>

      <div className="home-page__body">
        <section className="home-articles" aria-labelledby="home-articles-title">
          <header className="home-articles__head">
            <div>
              <p className="home-kicker">Đọc & học</p>
              <h2 id="home-articles-title">Bài viết nổi bật</h2>
            </div>
            <button type="button" className="home-articles__all" onClick={onGoArticles}>
              Xem tất cả
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </header>

          <div className="home-articles__layout">
            {featured && (
              <article
                className="home-feature"
                role={onSelectArticle ? 'button' : undefined}
                tabIndex={onSelectArticle ? 0 : undefined}
                onClick={() => onSelectArticle?.(featured.id)}
                onKeyDown={(e) => {
                  if (!onSelectArticle) return
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectArticle(featured.id)
                  }
                }}
              >
                <div className="home-feature__media" style={{ background: featured.image }}>
                  <span aria-hidden="true">
                    <FontAwesomeIcon icon={featured.icon} />
                  </span>
                </div>
                <div className="home-feature__copy">
                  <p className="home-kicker">Nổi bật</p>
                  <h3>{featured.title}</h3>
                  <p>{featured.excerpt}</p>
                  <div className="home-feature__meta">
                    <img src={featured.avatar} alt="" />
                    <span>{featured.author}</span>
                    {featured.verified && (
                      <FontAwesomeIcon icon={faCheckCircle} className="home-feature__verified" />
                    )}
                    <span className="home-feature__dot" aria-hidden="true" />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </article>
            )}

            <ul className="home-article-list">
              {moreArticles.map((article, index) => (
                <li key={article.id}>
                  <button
                    type="button"
                    className="home-article-row"
                    style={{ ['--i' as string]: index }}
                    onClick={() => onSelectArticle?.(article.id)}
                  >
                    <span
                      className="home-article-row__thumb"
                      style={{ background: article.image }}
                      aria-hidden="true"
                    >
                      <FontAwesomeIcon icon={article.icon} />
                    </span>
                    <span className="home-article-row__body">
                      <strong>{article.title}</strong>
                      <small>
                        {article.author} · {article.readTime}
                      </small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-invite" aria-labelledby="home-invite-title">
          <div className="home-invite__copy">
            <p className="home-kicker home-kicker--light">Bước tiếp theo</p>
            <h2 id="home-invite-title">Chọn lộ trình phù hợp trình độ của bạn</h2>
            <p>Từ Hangul cơ bản đến giao tiếp tự tin — học đúng thứ tự, tiến đều mỗi tuần.</p>
            <button type="button" className="home-invite__cta" onClick={onGoRoadmap}>
              Xem lộ trình học
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="home-invite__visual" aria-hidden="true">
            <span className="home-invite__glyph">가</span>
            <span className="home-invite__glyph home-invite__glyph--b">나</span>
            <span className="home-invite__glyph home-invite__glyph--c">다</span>
          </div>
        </section>
      </div>
    </div>
  )
}
