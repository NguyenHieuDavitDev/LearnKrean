import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBookOpen,
  faComments,
  faExternalLink,
  faGraduationCap,
  faHandshake,
  faHeart,
  faLocationDot,
  faPhone,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import { BRAND, SOCIAL } from '../../brand'
import { BrandLogo } from '../layout/BrandLogo'
import { SocialPlatformIcon } from '../layout/SocialPlatformIcon'
import aboutHeroImg from '../../assets/anhbiatrangvechungtoi.jpg'
import contactImg from '../../assets/anh san sang lo trinh.jpg'
import './AboutPage.css'

type AboutPageProps = {
  onGoRoadmap?: () => void
  scrollTo?: 'top' | 'contact'
}

const VALUES = [
  {
    icon: faSeedling,
    title: 'Lộ trình chuẩn',
    desc: 'Bám sát giáo trình Tiếng Hàn Tổng hợp dành cho người Việt — từ Sơ cấp đến Cao cấp, tương ứng TOPIK 1–6.',
  },
  {
    icon: faBookOpen,
    title: 'Học đủ 4 kỹ năng',
    desc: 'Mỗi bài gồm từ vựng, ngữ pháp và luyện nghe – nói – đọc – viết theo đúng cấu trúc giáo trình.',
  },
  {
    icon: faHandshake,
    title: 'Đồng hành sát sao',
    desc: 'Tư vấn trình độ đầu vào, giải đáp thắc mắc và điều chỉnh nhịp học phù hợp mục tiêu của bạn.',
  },
  {
    icon: faHeart,
    title: 'Gần gũi – bền vững',
    desc: 'Giữ tinh thần học nhẹ nhàng, rõ ràng, giúp bạn duy trì thói quen lâu dài thay vì học dồn.',
  },
] as const

const PROGRAMS = [
  {
    icon: faComments,
    level: 'Sơ cấp',
    title: 'TOPIK 1 – 2',
    desc: 'Hangul, giao tiếp đời sống và hoàn thành giáo trình Sơ cấp 1 & 2.',
    tone: 'a',
  },
  {
    icon: faGraduationCap,
    level: 'Trung cấp',
    title: 'TOPIK 3 – 4',
    desc: 'Ngữ pháp trung cấp, đọc – viết mở rộng theo giáo trình Trung cấp 1 & 2.',
    tone: 'b',
  },
  {
    icon: faBookOpen,
    level: 'Cao cấp',
    title: 'TOPIK 5 – 6',
    desc: 'Văn bản học thuật – xã hội, luyện đề và hoàn thiện Cao cấp 1 & 2.',
    tone: 'c',
  },
] as const

export function AboutPage({ onGoRoadmap, scrollTo = 'top' }: AboutPageProps) {
  useEffect(() => {
    if (scrollTo === 'contact') {
      const id = window.requestAnimationFrame(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => window.cancelAnimationFrame(id)
    }
    window.scrollTo(0, 0)
  }, [scrollTo])

  return (
    <div className="about-page">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__bg" aria-hidden="true">
          <img
            className="about-hero__photo"
            src={aboutHeroImg}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <div className="about-hero__shade" />
        </div>

        <div className="about-hero__layout">
          <div className="about-hero__content">
            <p className="about-hero__kicker">{BRAND.company}</p>
            <div className="about-hero__brand">
              <span className="about-hero__logo-wrap">
                <BrandLogo size="lg" className="about-hero__logo" />
              </span>
              <div className="about-hero__titles">
                <h1 id="about-hero-title">{BRAND.name}</h1>
                <p className="about-hero__slogan">{BRAND.slogan}</p>
              </div>
            </div>
            <p className="about-hero__lead">
              Giáo trình chuẩn dành cho người Việt · Lộ trình TOPIK 1–6 · Đồng hành đến mục tiêu thực
              tế.
            </p>
            <div className="about-hero__actions">
              <a className="about-hero__cta" href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}>
                Liên hệ tư vấn
              </a>
              {onGoRoadmap && (
                <button
                  type="button"
                  className="about-hero__cta about-hero__cta--ghost"
                  onClick={onGoRoadmap}
                >
                  Xem lộ trình TOPIK
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story__copy">
          <p className="about-eyebrow">Về chúng tôi</p>
          <h2 id="about-story-title">Đơn vị đào tạo tiếng Hàn tại Huế</h2>
          <p>
            {BRAND.name} thuộc {BRAND.company}. Chúng tôi giúp người Việt học tiếng Hàn đúng trình
            tự, dễ hiểu và dùng được ngay trong học tập, thi cử và đời sống.
          </p>
          <p>
            Chương trình theo bộ Tiếng Hàn Tổng hợp dành cho người Việt Nam — từ Sơ cấp 1 đến Cao cấp
            2 — gắn mục tiêu TOPIK từng cấp. Tư vấn lộ trình tại trụ sở {BRAND.address}.
          </p>
          <p>
            Bạn cũng có thể theo dõi {BRAND.shortName} trên YouTube, TikTok và Facebook để xem bài giảng,
            mẹo học và tham gia cộng đồng học viên online.
          </p>
          <ul className="about-story__facts">
            <li>Trụ sở Huế</li>
            <li>TOPIK 1–6</li>
            <li>Giáo trình chuẩn</li>
          </ul>
        </div>

        <aside className="about-story__aside">
          <div className="about-story__portrait">
            <BrandLogo size="lg" className="about-story__logo" />
          </div>
          <p className="about-story__aside-name">{BRAND.name}</p>
          <p className="about-story__aside-company">{BRAND.company}</p>
        </aside>
      </section>

      <section className="about-social" id="social" aria-labelledby="about-social-title">
        <header className="about-social__intro">
          <p className="about-eyebrow">Cộng đồng online</p>
          <h2 id="about-social-title">Kênh học tiếng Hàn của {BRAND.shortName}</h2>
          <p className="about-social__lead">{SOCIAL.intro}</p>
          <p className="about-social__cta">{SOCIAL.cta}</p>
        </header>

        <ul className="about-social__channels">
          {SOCIAL.links.map((channel) => (
            <li key={channel.id} className={`about-social__channel about-social__channel--${channel.id}`}>
              <div className="about-social__channel-head">
                <span className="about-social__channel-icon">
                  <SocialPlatformIcon platform={channel.id} size="lg" />
                </span>
                <div>
                  <h3>{channel.label}</h3>
                  <p className="about-social__channel-handle">{channel.handle}</p>
                </div>
              </div>
              <p className="about-social__channel-desc">{channel.description}</p>
              <ul className="about-social__highlights">
                {channel.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="about-social__channel-link"
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {channel.action}
                <FontAwesomeIcon icon={faExternalLink} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-programs" aria-labelledby="about-programs-title">
        <header className="about-section-head">
          <p className="about-eyebrow">Chương trình</p>
          <h2 id="about-programs-title">Ba cấp độ · sáu lộ trình TOPIK</h2>
          <p className="about-section-head__desc">
            Liên thông từ sơ cấp đến cao cấp — mỗi bước bám giáo trình và mục tiêu kỳ thi.
          </p>
        </header>
        <ul className="about-programs__list">
          {PROGRAMS.map((item, index) => (
            <li key={item.title} className={`about-programs__item about-programs__item--${item.tone}`}>
              <span className="about-programs__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="about-programs__icon" aria-hidden="true">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <p className="about-programs__level">{item.level}</p>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
        {onGoRoadmap && (
          <div className="about-programs__cta">
            <button type="button" className="about-programs__btn" onClick={onGoRoadmap}>
              Xem chi tiết 6 lộ trình
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        )}
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <header className="about-section-head about-section-head--center">
          <p className="about-eyebrow">Phương châm</p>
          <h2 id="about-values-title">Cam kết khi học cùng {BRAND.shortName}</h2>
        </header>
        <ul className="about-values__list">
          {VALUES.map((item, index) => (
            <li
              key={item.title}
              className="about-values__item"
              style={{ ['--i' as string]: index }}
            >
              <span className="about-values__icon" aria-hidden="true">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-contact" id="contact" aria-labelledby="about-contact-title">
        <img
          className="about-contact__photo"
          src={contactImg}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="about-contact__shade" aria-hidden="true" />
        <div className="about-contact__layout">
          <div className="about-contact__panel">
            <div className="about-contact__copy">
              <p className="about-eyebrow about-eyebrow--light">Liên hệ</p>
              <h2 id="about-contact-title">Sẵn sàng chọn lộ trình phù hợp?</h2>
              <p>
                Đội ngũ {BRAND.shortName} hỗ trợ tư vấn cấp độ và lịch học theo mục tiêu TOPIK hoặc giao
                tiếp của bạn.
              </p>
            </div>
            <ul className="about-contact__details">
              <li>
                <span className="about-contact__icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div>
                  <strong>Điện thoại</strong>
                  <a href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}>{BRAND.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <span className="about-contact__icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <div>
                  <strong>Địa chỉ</strong>
                  <span>{BRAND.address}</span>
                </div>
              </li>
            </ul>
            <div className="about-contact__social">
              <p className="about-contact__social-title">Theo dõi trên mạng xã hội</p>
              <p>{SOCIAL.cta}</p>
              <ul className="about-contact__social-links">
                {SOCIAL.links.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${channel.label} — ${channel.action}`}
                    >
                      <SocialPlatformIcon platform={channel.id} size="sm" />
                      <span>{channel.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
