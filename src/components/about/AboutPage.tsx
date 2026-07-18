import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments,
  faHandshake,
  faHeart,
  faLocationDot,
  faPhone,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import { BrandLogo } from '../layout/BrandLogo'
import './AboutPage.css'

type AboutPageProps = {
  onGoRoadmap?: () => void
  scrollTo?: 'top' | 'contact'
}

const VALUES = [
  {
    icon: faSeedling,
    title: 'Nền tảng vững',
    desc: 'Học đúng trình tự từ Hangul đến giao tiếp, không nhảy cóc.',
  },
  {
    icon: faComments,
    title: 'Thực tế mỗi ngày',
    desc: 'Ưu tiên mẫu câu dùng được ngay trong đời sống và công việc.',
  },
  {
    icon: faHandshake,
    title: 'Đồng hành sát sao',
    desc: 'Giảng viên và cộng đồng sẵn sàng giải đáp khi bạn gặp khó.',
  },
  {
    icon: faHeart,
    title: 'Học vì yêu thích',
    desc: 'Giữ nhịp học nhẹ nhàng, bền lâu — không chỉ để “chạy deadline”.',
  },
] as const

const MILESTONES = [
  {
    year: '2018',
    title: 'Khởi đầu tại Huế',
    desc: 'Những lớp học nhỏ đầu tiên với mục tiêu giúp người mới đọc được Hangul.',
  },
  {
    year: '2020',
    title: 'Mở rộng trực tuyến',
    desc: 'Mang lộ trình học tiếng Hàn đến học viên mọi miền qua nền tảng số.',
  },
  {
    year: '2023',
    title: 'Cộng đồng lớn mạnh',
    desc: 'Hàng nghìn học viên theo lộ trình cơ bản đến chuẩn bị TOPIK.',
  },
  {
    year: 'Nay',
    title: 'Tiếp tục đồng hành',
    desc: `${BRAND.name} vẫn giữ tinh thần gần gũi, chất lượng và rõ ràng.`,
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
        <div className="about-hero__atmosphere" aria-hidden="true">
          <span className="about-hero__orb about-hero__orb--a" />
          <span className="about-hero__orb about-hero__orb--b" />
          <span className="about-hero__hangul">한글</span>
          <span className="about-hero__hangul about-hero__hangul--soft">사랑</span>
        </div>

        <div className="about-hero__content">
          <div className="about-hero__brand">
            <BrandLogo size="lg" className="about-hero__logo" />
            <p className="about-hero__brand-name">{BRAND.name}</p>
          </div>
          <h1 id="about-hero-title">Học tiếng Hàn gần gũi, rõ ràng và bền vững</h1>
          <p className="about-hero__lead">
            Chúng tôi đồng hành cùng bạn từ những chữ cái đầu tiên đến giao tiếp tự tin.
          </p>
          <div className="about-hero__actions">
            <a
              className="about-hero__cta"
              href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
            >
              Liên hệ tư vấn
            </a>
            {onGoRoadmap && (
              <button type="button" className="about-hero__cta about-hero__cta--ghost" onClick={onGoRoadmap}>
                Xem lộ trình học
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story__visual" aria-hidden="true">
          <div className="about-story__frame">
            <span className="about-story__mark">{BRAND.mark}</span>
            <p>{BRAND.slogan}</p>
          </div>
        </div>
        <div className="about-story__copy">
          <p className="about-eyebrow">Câu chuyện</p>
          <h2 id="about-story-title">Vì sao chúng tôi tồn tại</h2>
          <p>
            Nhiều người muốn học tiếng Hàn nhưng bị choáng bởi quá nhiều nguồn, thiếu lộ trình và
            dễ bỏ cuộc giữa chừng. {BRAND.shortName} ra đời để rút ngắn khoảng cách đó: nội dung
            chọn lọc, thứ tự học hợp lý, và sự đồng hành thật sự.
          </p>
          <p>
            Thuộc {BRAND.company}, chúng tôi đặt trụ sở tại {BRAND.address} — nơi kết nối học viên
            yêu thích tiếng Hàn, văn hóa và cơ hội học tập, làm việc liên quan đến Hàn Quốc.
          </p>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <header className="about-section-head">
          <p className="about-eyebrow">Phương châm</p>
          <h2 id="about-values-title">Cách chúng tôi đồng hành cùng bạn</h2>
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
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-timeline" aria-labelledby="about-timeline-title">
        <header className="about-section-head">
          <p className="about-eyebrow">Hành trình</p>
          <h2 id="about-timeline-title">Từ lớp nhỏ đến cộng đồng học viên</h2>
        </header>
        <ol className="about-timeline__list">
          {MILESTONES.map((item) => (
            <li key={item.year} className="about-timeline__item">
              <span className="about-timeline__year">{item.year}</span>
              <div className="about-timeline__body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-contact" id="contact" aria-labelledby="about-contact-title">
        <div className="about-contact__copy">
          <p className="about-eyebrow about-eyebrow--light">Liên hệ</p>
          <h2 id="about-contact-title">Sẵn sàng bắt đầu cùng {BRAND.shortName}?</h2>
          <p>
            Gọi điện hoặc ghé thăm để được tư vấn lộ trình phù hợp trình độ và mục tiêu của bạn.
          </p>
        </div>
        <ul className="about-contact__details">
          <li>
            <FontAwesomeIcon icon={faPhone} aria-hidden />
            <div>
              <strong>Điện thoại</strong>
              <a href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}>{BRAND.phoneDisplay}</a>
            </div>
          </li>
          <li>
            <FontAwesomeIcon icon={faLocationDot} aria-hidden />
            <div>
              <strong>Địa chỉ</strong>
              <span>{BRAND.address}</span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
