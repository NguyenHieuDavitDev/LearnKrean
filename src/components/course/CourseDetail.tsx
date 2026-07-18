import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faPlay, faUser } from '@fortawesome/free-solid-svg-icons'
import { getKhoaHocById, getKhoaHocLienQuan, type KhoaHoc } from '../../data/courses'
import { KhoaHocCard } from './CourseCard'
import { CheckIcon, FeatureIcon, ProCrown, Stars } from './shared'
import './CourseDetail.css'

type KhoaHocDetailProps = {
  khoaHocId: number
  onBack: () => void
  onSelectKhoaHoc: (khoaHocId: number) => void
  onGoPro?: () => void
}

export function KhoaHocDetail({ khoaHocId, onBack, onSelectKhoaHoc, onGoPro }: KhoaHocDetailProps) {
  const khoaHoc = getKhoaHocById(khoaHocId)
  const [descExpanded, setDescExpanded] = useState(false)
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({ 0: true })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [khoaHocId])

  if (!khoaHoc) {
    return (
      <div className="khoa-hoc-detail khoa-hoc-detail--empty">
        <p>Không tìm thấy khóa học.</p>
        <button type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    )
  }

  const related = getKhoaHocLienQuan(khoaHoc.id)
  const totalLessons = khoaHoc.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
  const visibleDescription = descExpanded ? khoaHoc.description : khoaHoc.description.slice(0, 1)

  const toggleChapter = (index: number) => {
    setOpenChapters((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const expandAll = () => {
    const all: Record<number, boolean> = {}
    khoaHoc.chapters.forEach((_, i) => {
      all[i] = true
    })
    setOpenChapters(all)
  }

  return (
    <div className="khoa-hoc-detail">
      <div className="khoa-hoc-detail__layout">
        <div className="khoa-hoc-detail__main">
          <nav className="khoa-hoc-detail__breadcrumb" aria-label="Breadcrumb">
            {khoaHoc.isPro ? (
              <>
                <button type="button" onClick={onGoPro ?? onBack}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Khóa học Pro
                </button>
                <span>/</span>
              </>
            ) : (
              <>
                <button type="button" onClick={onBack}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Trang chủ
                </button>
                <span>/</span>
                <span>Khóa học</span>
                <span>/</span>
              </>
            )}
            <strong>{khoaHoc.title}</strong>
          </nav>

          <h1 className="khoa-hoc-detail__title">
            {khoaHoc.title}
            {khoaHoc.isPro && <span className="khoa-hoc-detail__pro-badge">Pro</span>}
          </h1>
          <p className="khoa-hoc-detail__summary">{khoaHoc.summary}</p>

          <div className="khoa-hoc-detail__meta">
            <span className="khoa-hoc-detail__rating">
              <Stars rating={khoaHoc.rating} />
              <strong>{khoaHoc.rating}</strong>
              <span>({khoaHoc.ratingCount} đánh giá)</span>
            </span>
            <span className="khoa-hoc-detail__students">
              <FontAwesomeIcon icon={faUser} />
              {khoaHoc.studentsCount.toLocaleString('vi-VN')} học viên
            </span>
            <span className="khoa-hoc-detail__teacher-inline">
              <img src={khoaHoc.teacher.avatar} alt="" />
              {khoaHoc.teacher.name}
            </span>
          </div>

          <section className="khoa-hoc-detail__section">
            <h2>Bạn sẽ học được gì?</h2>
            <ul className="khoa-hoc-detail__learnings">
              {khoaHoc.learnings.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="khoa-hoc-detail__section">
            <div className="khoa-hoc-detail__section-head">
              <div>
                <h2>Nội dung khóa học</h2>
                <p>
                  {khoaHoc.chapters.length} chương • {totalLessons} bài học • {khoaHoc.durationFull}
                </p>
              </div>
              <button type="button" className="khoa-hoc-detail__expand-all" onClick={expandAll}>
                Mở rộng tất cả
              </button>
            </div>
            <div className="khoa-hoc-detail__chapters">
              {khoaHoc.chapters.map((chapter, index) => (
                <div key={chapter.title} className="khoa-hoc-detail__chapter">
                  <button
                    type="button"
                    className="khoa-hoc-detail__chapter-toggle"
                    onClick={() => toggleChapter(index)}
                    aria-expanded={!!openChapters[index]}
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={openChapters[index] ? 'is-open' : ''}
                    />
                    <strong>{chapter.title}</strong>
                    <span>{chapter.lessons.length} bài học</span>
                  </button>
                  {openChapters[index] && (
                    <ul className="khoa-hoc-detail__lessons">
                      {chapter.lessons.map((lesson) => (
                        <li key={lesson}>
                          <FontAwesomeIcon icon={faPlay} />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="khoa-hoc-detail__section">
            <h2>Mô tả khóa học</h2>
            <div className="khoa-hoc-detail__desc">
              {visibleDescription.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {khoaHoc.description.length > 1 && (
              <button
                type="button"
                className="khoa-hoc-detail__more-desc"
                onClick={() => setDescExpanded((v) => !v)}
              >
                {descExpanded ? 'Thu gọn' : 'Mở rộng'}
                <FontAwesomeIcon icon={faChevronDown} className={descExpanded ? 'is-open' : ''} />
              </button>
            )}
          </section>

          <section className="khoa-hoc-detail__section">
            <h2>Yêu cầu</h2>
            <ul className="khoa-hoc-detail__requirements">
              {khoaHoc.requirements.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="khoa-hoc-detail__section">
            <h2>Thông tin giảng viên</h2>
            <div className="khoa-hoc-detail__instructor">
              <img src={khoaHoc.teacher.avatar} alt={khoaHoc.teacher.name} />
              <div>
                <h3>{khoaHoc.teacher.name}</h3>
                <div className="khoa-hoc-detail__instructor-stats">
                  <span>
                    <Stars rating={khoaHoc.teacher.rating} /> {khoaHoc.teacher.rating} Rating
                  </span>
                  <span>{khoaHoc.teacher.students} học viên</span>
                  <span>{khoaHoc.teacher.soKhoaHoc} khóa học</span>
                </div>
              </div>
            </div>
          </section>

          {related.length > 0 && (
            <section className="khoa-hoc-detail__section">
              <h2>Khóa học liên quan</h2>
              <div className="khoa-hoc-detail__related">
                {related.map((c) => (
                  <KhoaHocCard key={c.id} khoaHoc={c} onSelect={onSelectKhoaHoc} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="khoa-hoc-detail__aside">
          <EnrollCard khoaHoc={khoaHoc} />
        </aside>
      </div>
    </div>
  )
}

function EnrollCard({ khoaHoc }: { khoaHoc: KhoaHoc }) {
  return (
    <div className="enroll-card">
      <div className="enroll-card__preview" style={{ background: khoaHoc.gradient }}>
        {khoaHoc.isPro && <ProCrown />}
        <pre>{khoaHoc.thumbTitle}</pre>
      </div>
      <p className="enroll-card__label">Chi phí khóa học</p>
      <div className="enroll-card__price">
        {khoaHoc.oldPrice && <span className="enroll-card__old">{khoaHoc.oldPrice}</span>}
        <strong className={khoaHoc.price === 'Miễn phí' ? 'is-free' : ''}>{khoaHoc.price}</strong>
      </div>
      <button type="button" className={`enroll-card__cta${khoaHoc.isPro ? ' enroll-card__cta--pro' : ''}`}>
        {khoaHoc.isPro ? 'ĐĂNG KÝ PRO' : 'ĐĂNG KÝ HỌC'}
      </button>
      {khoaHoc.isPro && (
        <p className="enroll-card__pro-note">Mua một lần · Truy cập trọn đời · Hỗ trợ Pro</p>
      )}
      <ul className="enroll-card__features">
        <li>
          <FeatureIcon type="level" />
          {khoaHoc.level}
        </li>
        <li>
          <FeatureIcon type="lessons" />
          Tổng số {khoaHoc.lessons} bài học
        </li>
        <li>
          <FeatureIcon type="time" />
          Thời lượng {khoaHoc.durationFull}
        </li>
        <li>
          <FeatureIcon type="cert" />
          Học mọi lúc, mọi nơi
        </li>
        <li>
          <FeatureIcon type="access" />
          {khoaHoc.isPro ? 'Hỗ trợ Pro trọn đời' : 'Chứng chỉ hoàn thành'}
        </li>
      </ul>
    </div>
  )
}
