import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faHeadset,
  faInfinity,
  faRotate,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { BRAND } from '../../brand'
import { KHOA_HOC_PRO } from '../../data/courses'
import { KhoaHocCard } from './CourseCard'
import { ProCrown } from './shared'
import './ProPage.css'
import './CourseCard.css'

const BENEFIT_ICONS = {
  book: faBookOpen,
  support: faHeadset,
  refresh: faRotate,
  infinity: faInfinity,
} as const satisfies Record<string, IconDefinition>

const BENEFITS: { title: string; desc: string; icon: keyof typeof BENEFIT_ICONS }[] = [
  {
    title: 'Nội dung chuyên sâu',
    desc: 'Giáo trình Pro dày hơn, đi từ nền tảng đến chiến lược thi / làm việc thực tế.',
    icon: 'book',
  },
  {
    title: 'Hỗ trợ 1-1',
    desc: 'Được chữa bài viết, luyện nói và phản hồi cá nhân hóa từ giảng viên.',
    icon: 'support',
  },
  {
    title: 'Cập nhật liên tục',
    desc: 'Đề mới, mẫu câu mới và tài liệu bổ sung được thêm vào khóa suốt vòng đời.',
    icon: 'refresh',
  },
  {
    title: 'Học mãi mãi',
    desc: 'Mua một lần, truy cập trọn đời — học lại bất cứ khi nào bạn cần.',
    icon: 'infinity',
  },
]

const DIFFERENCES = [
  { label: 'Số lượng bài học', free: 'Ngắn gọn, giới thiệu', pro: 'Đầy đủ, chuyên sâu' },
  { label: 'Dự án / luyện đề', free: 'Ít bài thực hành', pro: 'Ngân hàng đề & case study' },
  { label: 'Chữa bài', free: 'Tự học', pro: 'Feedback cá nhân hóa' },
  { label: 'Hỗ trợ', free: 'Cộng đồng chung', pro: 'Nhóm Pro riêng + mentor' },
  { label: 'Thời hạn', free: 'Miễn phí xem', pro: 'Truy cập trọn đời' },
]

type ProPageProps = {
  onSelectKhoaHoc: (khoaHocId: number) => void
  onBackHome: () => void
}

export function ProPage({ onSelectKhoaHoc, onBackHome }: ProPageProps) {
  return (
    <div className="pro-page">
      <section className="pro-page__hero">
        <div className="pro-page__hero-copy">
          <p className="pro-page__eyebrow">{BRAND.shortName} Pro</p>
          <h1>
            Khóa học Pro
            <span> nâng tầm tiếng Hàn của bạn</span>
          </h1>
          <p className="pro-page__lead">
            Lộ trình trả phí chất lượng cao: TOPIK, giao tiếp bản ngữ, tiếng Hàn thương mại và biên phiên dịch —
            kèm hỗ trợ trực tiếp từ giảng viên.
          </p>
          <div className="pro-page__hero-actions">
            <a href="#pro-courses" className="pro-page__btn pro-page__btn--primary">
              Xem khóa Pro
            </a>
            <button type="button" className="pro-page__btn pro-page__btn--ghost" onClick={onBackHome}>
              Về trang chủ
            </button>
          </div>
          <ul className="pro-page__stats" aria-label="Thống kê Pro">
            <li>
              <strong>{KHOA_HOC_PRO.length}</strong>
              <span>khóa Pro</span>
            </li>
            <li>
              <strong>18K+</strong>
              <span>học viên Pro</span>
            </li>
            <li>
              <strong>4.8</strong>
              <span>điểm trung bình</span>
            </li>
          </ul>
        </div>
        <div className="pro-page__hero-visual" aria-hidden="true">
          <div className="pro-page__orb pro-page__orb--a" />
          <div className="pro-page__orb pro-page__orb--b" />
          <div className="pro-page__hero-card">
            <ProCrown className="pro-crown pro-page__hero-crown" />
            <p className="pro-page__hero-card-title">TOPIK Pro</p>
            <p className="pro-page__hero-card-price">
              <s>2.500.000đ</s>
              <strong>1.299.000đ</strong>
            </p>
            <span className="pro-page__hero-card-tag">Bán chạy nhất</span>
          </div>
        </div>
      </section>

      <section className="pro-page__section">
        <div className="pro-page__section-head">
          <h2>Pro có gì khác?</h2>
          <p>So với khóa miễn phí, Pro tập trung vào độ sâu nội dung và hỗ trợ thực chiến.</p>
        </div>
        <div className="pro-page__benefits">
          {BENEFITS.map((item) => (
            <article key={item.title} className="pro-page__benefit">
              <span className="pro-page__benefit-icon">
                <FontAwesomeIcon icon={BENEFIT_ICONS[item.icon]} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pro-page__section">
        <div className="pro-page__section-head">
          <h2>So sánh Free & Pro</h2>
          <p>Chọn lộ trình phù hợp mục tiêu học của bạn.</p>
        </div>
        <div className="pro-page__compare" role="table" aria-label="So sánh Free và Pro">
          <div className="pro-page__compare-row pro-page__compare-row--head" role="row">
            <span role="columnheader">Tiêu chí</span>
            <span role="columnheader">Free</span>
            <span role="columnheader">Pro</span>
          </div>
          {DIFFERENCES.map((row) => (
            <div key={row.label} className="pro-page__compare-row" role="row">
              <span role="cell">{row.label}</span>
              <span role="cell">{row.free}</span>
              <span role="cell" className="is-pro">
                {row.pro}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="pro-page__section" id="pro-courses">
        <div className="pro-page__section-head">
          <h2>
            Danh sách khóa Pro
            <span className="pro-page__badge">Mới</span>
          </h2>
          <p>Chọn khóa phù hợp mục tiêu: thi TOPIK, đi làm, hoặc luyện nói.</p>
        </div>
        <div className="pro-page__grid">
          {KHOA_HOC_PRO.map((c) => (
            <KhoaHocCard key={c.id} khoaHoc={c} onSelect={onSelectKhoaHoc} />
          ))}
        </div>
      </section>

      <section className="pro-page__cta">
        <div className="pro-page__cta-inner">
          <h2>Sẵn sàng học Pro?</h2>
          <p>Bắt đầu với TOPIK Pro hoặc Speaking Pro — mua một lần, học trọn đời.</p>
          <button type="button" className="pro-page__btn pro-page__btn--primary" onClick={() => onSelectKhoaHoc(5)}>
            Học TOPIK Pro ngay
          </button>
        </div>
      </section>
    </div>
  )
}
