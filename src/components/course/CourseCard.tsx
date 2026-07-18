import type { KhoaHoc } from '../../data/courses'
import { ProCrown, Stars } from './shared'
import './CourseCard.css'

type KhoaHocCardProps = {
  khoaHoc: KhoaHoc
  onSelect?: (khoaHocId: number) => void
}

export function KhoaHocCard({ khoaHoc, onSelect }: KhoaHocCardProps) {
  return (
    <article
      className="khoa-hoc-card"
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={() => onSelect?.(khoaHoc.id)}
      onKeyDown={(e) => {
        if (!onSelect) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(khoaHoc.id)
        }
      }}
    >
      <div className="khoa-hoc-card__thumb" style={{ background: khoaHoc.gradient }}>
        {khoaHoc.isPro && <ProCrown />}
        <pre className="khoa-hoc-card__thumb-title">{khoaHoc.thumbTitle}</pre>
      </div>
      <h3 className="khoa-hoc-card__title">{khoaHoc.title}</h3>
      <div className="khoa-hoc-card__price">
        {khoaHoc.oldPrice && <span className="khoa-hoc-card__old">{khoaHoc.oldPrice}</span>}
        <span className={khoaHoc.price === 'Miễn phí' ? 'khoa-hoc-card__free' : 'khoa-hoc-card__current'}>
          {khoaHoc.price}
        </span>
      </div>
      <div className="khoa-hoc-card__rating">
        <Stars rating={khoaHoc.rating} />
        <span>
          {khoaHoc.rating} ({khoaHoc.ratingCount})
        </span>
      </div>
      <div className="khoa-hoc-card__meta">
        <span>
          <MetaUsersIcon />
          {khoaHoc.students}
        </span>
        <span>
          <MetaPlayIcon />
          {khoaHoc.lessons}
        </span>
        <span>
          <MetaClockIcon />
          {khoaHoc.duration}
        </span>
      </div>
    </article>
  )
}

function MetaUsersIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1.5c-2.5 0-4.5 1.3-4.5 3V14h9v-1.5c0-1.7-2-3-4.5-3z"
        fill="currentColor"
      />
    </svg>
  )
}

function MetaPlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 3.5A1.5 1.5 0 0 1 4.5 2h7A1.5 1.5 0 0 1 13 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 12.5v-9zm4 2.3v4.4l3.5-2.2L7 5.8z"
        fill="currentColor"
      />
    </svg>
  )
}

function MetaClockIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM8 3a.75.75 0 0 1 .75.75V8l2.5 1.5a.75.75 0 1 1-.75 1.3l-2.9-1.74A.75.75 0 0 1 7.25 8.5V3.75A.75.75 0 0 1 8 3z"
        fill="currentColor"
      />
    </svg>
  )
}
