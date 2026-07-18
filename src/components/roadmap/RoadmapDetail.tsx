import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheck, faClock, faFlag } from '@fortawesome/free-solid-svg-icons'
import { getRoadmapById } from '../../data/roadmaps'
import { getKhoaHocById } from '../../data/courses'
import './RoadmapDetail.css'

type RoadmapDetailProps = {
  roadmapId: string
  onBack: () => void
  onSelectKhoaHoc: (khoaHocId: number) => void
  onSelectRoadmap: (roadmapId: string) => void
}

export function RoadmapDetail({
  roadmapId,
  onBack,
  onSelectKhoaHoc,
  onSelectRoadmap,
}: RoadmapDetailProps) {
  const roadmap = getRoadmapById(roadmapId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [roadmapId])

  if (!roadmap) {
    return (
      <div className="roadmap-detail roadmap-detail--empty">
        <p>Không tìm thấy lộ trình.</p>
        <button type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    )
  }

  const otherId = roadmap.id === 'basic' ? 'advanced' : 'basic'

  return (
    <div className="roadmap-detail">
      <nav className="roadmap-detail__breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={onBack}>
          Lộ trình học
        </button>
        <span>/</span>
        <strong>{roadmap.shortTitle}</strong>
      </nav>

      <header className="roadmap-detail__hero">
        <div className="roadmap-detail__hero-copy">
          <p className="roadmap-detail__eyebrow">
            {roadmap.level === 'basic' ? 'Từ số 0' : 'Bứt phá chuyên sâu'}
          </p>
          <h1>{roadmap.title}</h1>
          <p className="roadmap-detail__lead">{roadmap.longDescription}</p>
          <ul className="roadmap-detail__facts">
            <li>
              <FontAwesomeIcon icon={faClock} />
              Thời lượng gợi ý: {roadmap.duration}
            </li>
            <li>
              <FontAwesomeIcon icon={faFlag} />
              Mục tiêu: {roadmap.outcome}
            </li>
          </ul>
          <div className="roadmap-detail__skills">
            {roadmap.skills.map((skill) => (
              <span key={skill.label}>
                <FontAwesomeIcon icon={skill.icon} />
                {skill.label}
              </span>
            ))}
          </div>
        </div>
        <div
          className="roadmap-detail__hero-visual"
          style={{ background: roadmap.illustration.gradient }}
          aria-hidden="true"
        >
          <span>{roadmap.illustration.mark}</span>
        </div>
      </header>

      <section className="roadmap-detail__section">
        <h2>Các bước trong lộ trình</h2>
        <p className="roadmap-detail__section-desc">
          Học lần lượt từng khóa theo thứ tự bên dưới để nền tảng vững và tiến bộ đều.
        </p>
        <ol className="roadmap-detail__steps">
          {roadmap.steps.map((step, index) => {
            const course = getKhoaHocById(step.khoaHocId)
            return (
              <li key={step.khoaHocId} className="roadmap-detail__step">
                <div className="roadmap-detail__step-index" aria-hidden="true">
                  {index + 1}
                </div>
                <div className="roadmap-detail__step-body">
                  <div className="roadmap-detail__step-head">
                    <h3>{step.title}</h3>
                    {course && (
                      <span className={course.price === 'Miễn phí' ? 'is-free' : 'is-pro'}>
                        {course.price}
                      </span>
                    )}
                  </div>
                  <p>{step.desc}</p>
                  {course && (
                    <div className="roadmap-detail__step-meta">
                      <span>{course.lessons} bài học</span>
                      <span>{course.durationFull}</span>
                      <span>{course.level}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    className="roadmap-detail__step-cta"
                    onClick={() => onSelectKhoaHoc(step.khoaHocId)}
                  >
                    Xem khóa học
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
                {course && (
                  <div
                    className="roadmap-detail__step-thumb"
                    style={{ background: course.gradient }}
                    aria-hidden="true"
                  >
                    <pre>{course.thumbTitle}</pre>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </section>

      <section className="roadmap-detail__section">
        <h2>Bạn sẽ đạt được</h2>
        <ul className="roadmap-detail__outcomes">
          <li>
            <FontAwesomeIcon icon={faCheck} />
            Lộ trình rõ ràng từ {roadmap.level === 'basic' ? 'mới bắt đầu' : 'trung cấp'} đến mục tiêu
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            {roadmap.outcome}
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            Có thể chuyển sang lộ trình {roadmap.id === 'basic' ? 'nâng cao' : 'cơ bản'} khi cần
          </li>
        </ul>
        <button type="button" className="roadmap-detail__switch" onClick={() => onSelectRoadmap(otherId)}>
          Xem lộ trình {roadmap.id === 'basic' ? 'Nâng cao' : 'Cơ bản'}
        </button>
      </section>
    </div>
  )
}
