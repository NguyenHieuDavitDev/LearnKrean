import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import { BrandLogo } from './BrandLogo'
import './Footer.css'

type FooterProps = {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: () => void
  onNavigateArticles?: () => void
  onNavigateRoadmap?: () => void
  onNavigateQa?: () => void
}

const EXPLORE_LINKS = [
  { label: 'Trang chủ', key: 'home' as const },
  { label: 'Giới thiệu', key: 'about' as const },
  { label: 'Bài viết', key: 'articles' as const },
  { label: 'Lộ trình TOPIK', key: 'roadmap' as const },
  { label: 'Hỏi đáp', key: 'qa' as const },
]

const LEARN_LINKS = [
  { label: 'TOPIK 1 – 2 (Sơ cấp)', key: 'roadmap' as const },
  { label: 'TOPIK 3 – 4 (Trung cấp)', key: 'roadmap' as const },
  { label: 'TOPIK 5 – 6 (Cao cấp)', key: 'roadmap' as const },
  { label: 'Bài viết văn hóa', key: 'articles' as const },
]

export function Footer({
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
  onNavigateArticles,
  onNavigateRoadmap,
  onNavigateQa,
}: FooterProps) {
  const [phone1, phone2] = BRAND.phones
  const year = new Date().getFullYear()

  const handlers = {
    home: onNavigateHome,
    about: onNavigateAbout,
    articles: onNavigateArticles,
    roadmap: onNavigateRoadmap,
    qa: onNavigateQa,
  }

  const go = (key: keyof typeof handlers) => {
    handlers[key]?.()
  }

  return (
    <footer className="footer">
      <div className="footer__cta">
        <div className="footer__cta-inner">
          <div className="footer__cta-copy">
            <p className="footer__cta-kicker">Bắt đầu hôm nay</p>
            <h2 className="footer__cta-title">Lộ trình TOPIK 1–6 rõ ràng, bám sát giáo trình chuẩn</h2>
            <p className="footer__cta-lead">
              Tư vấn trình độ đầu vào và định hướng học tập miễn phí tại {BRAND.address}.
            </p>
          </div>
          <div className="footer__cta-actions">
            <a className="footer__cta-btn" href={`tel:${phone1.replace(/\s/g, '')}`}>
              <FontAwesomeIcon icon={faPhone} />
              Gọi {phone1}
            </a>
            <button type="button" className="footer__cta-btn footer__cta-btn--ghost" onClick={onNavigateContact}>
              Liên hệ tư vấn
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer__main">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-lockup">
              <BrandLogo size="md" className="footer__logo" />
              <div>
                <strong>{BRAND.name}</strong>
                <span>{BRAND.slogan}</span>
              </div>
            </div>
            <p className="footer__brand-desc">
              Đơn vị đào tạo tiếng Hàn thuộc {BRAND.company}. Chương trình theo bộ Tiếng Hàn Tổng hợp dành
              cho người Việt Nam — từ Sơ cấp đến Cao cấp, gắn mục tiêu TOPIK từng cấp.
            </p>
            <ul className="footer__tags">
              <li>Giáo trình chuẩn</li>
              <li>TOPIK 1–6</li>
              <li>Huế</li>
            </ul>
          </div>

          <nav className="footer__nav" aria-label="Khám phá">
            <h3>Khám phá</h3>
            <ul>
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label}>
                  <button type="button" className="footer__link" onClick={() => go(item.key)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__nav" aria-label="Chương trình học">
            <h3>Chương trình</h3>
            <ul>
              {LEARN_LINKS.map((item) => (
                <li key={item.label}>
                  <button type="button" className="footer__link" onClick={() => go(item.key)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__contact">
            <h3>Liên hệ</h3>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__contact-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <span>
                  <a href={`tel:${phone1.replace(/\s/g, '')}`}>{phone1}</a>
                  <br />
                  <a href={`tel:${phone2.replace(/\s/g, '')}`}>{phone2}</a>
                </span>
              </li>
              <li>
                <span className="footer__contact-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <span>{BRAND.address}</span>
              </li>
            </ul>
            <button type="button" className="footer__contact-btn" onClick={onNavigateContact}>
              Xem thông tin liên hệ
            </button>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p>
            © {year} {BRAND.name}. Thuộc {BRAND.company}
          </p>
          <div className="footer__social" aria-label="Mạng xã hội">
            <a href="#youtube" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
              </svg>
            </a>
            <a href="#facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 8.2h2.4V5H14c-2.4 0-4 1.7-4 4.2V11H7.5v3.3H10V22h3.5v-7.7h2.7l.5-3.3H13.5V9.2c0-.6.3-1 1-1z" />
              </svg>
            </a>
            <a href="#tiktok" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.6 8.4a6.5 6.5 0 0 1-3.7-1.2v7.1a5.7 5.7 0 1 1-4.9-5.6v2.9a2.9 2.9 0 1 0 2.1 2.8V2.5h2.8a6.5 6.5 0 0 0 3.7 5.5v.4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
