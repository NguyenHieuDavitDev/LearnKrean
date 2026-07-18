import { KHOA_HOC_MIEN_PHI, KHOA_HOC_PRO } from '../../data/courses'
import { KhoaHocCard } from '../course'
import './CourseSection.css'

type KhoaHocSectionProps = {
  onSelectKhoaHoc: (khoaHocId: number) => void
  onGoPro?: () => void
}

export function KhoaHocSection({ onSelectKhoaHoc, onGoPro }: KhoaHocSectionProps) {
  return (
    <>
      <section className="khoa-hoc-section">
        <h2 className="khoa-hoc-section__heading">Dành cho bạn</h2>
        <div className="khoa-hoc-section__grid">
          {KHOA_HOC_MIEN_PHI.map((c) => (
            <KhoaHocCard key={c.id} khoaHoc={c} onSelect={onSelectKhoaHoc} />
          ))}
        </div>
        <div className="khoa-hoc-section__more-wrap">
          <button type="button" className="khoa-hoc-section__more">
            Xem thêm 12 khóa học
          </button>
        </div>
      </section>

      <div className="khoa-hoc-section__social-proof">
        <div className="khoa-hoc-section__avatars">
          <img src="https://i.pravatar.cc/40?img=1" alt="" />
          <img src="https://i.pravatar.cc/40?img=2" alt="" />
          <img src="https://i.pravatar.cc/40?img=3" alt="" />
        </div>
        <span>+128.450 học viên đã tham gia</span>
      </div>

      <section className="khoa-hoc-section">
        <div className="khoa-hoc-section__head-row">
          <h2 className="khoa-hoc-section__heading">
            Khóa học Pro
            <span className="khoa-hoc-section__badge">Mới</span>
          </h2>
          {onGoPro && (
            <button type="button" className="khoa-hoc-section__view-all" onClick={onGoPro}>
              Xem tất cả
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <p className="khoa-hoc-section__intro">
          Nội dung chuyên sâu, hỗ trợ 1-1 và truy cập trọn đời — dành cho người muốn bứt phá TOPIK & đi làm.
        </p>
        <div className="khoa-hoc-section__grid khoa-hoc-section__grid--pro">
          {KHOA_HOC_PRO.map((c) => (
            <KhoaHocCard key={c.id} khoaHoc={c} onSelect={onSelectKhoaHoc} />
          ))}
        </div>
        {onGoPro && (
          <div className="khoa-hoc-section__more-wrap">
            <button type="button" className="khoa-hoc-section__more" onClick={onGoPro}>
              Khám phá khóa Pro
            </button>
          </div>
        )}
      </section>
    </>
  )
}
