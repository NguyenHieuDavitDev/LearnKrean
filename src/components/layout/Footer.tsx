import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import { BRAND, SOCIAL } from '../../brand'
import { BrandLogo } from './BrandLogo'
import { SocialPlatformIcon } from './SocialPlatformIcon'
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
            {SOCIAL.links.map((link) => (
              <a
                key={link.id}
                className="footer__social-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                aria-label={`${link.label} — ${link.action}`}
              >
                <SocialPlatformIcon platform={link.id} size="md" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
