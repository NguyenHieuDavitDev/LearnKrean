import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClock, faFlag, faBook } from '@fortawesome/free-solid-svg-icons'
import { getAdjacentRoadmaps, getRoadmapById } from '../../data/roadmaps'
import './RoadmapDetail.css'

type RoadmapDetailProps = {
  roadmapId: string
  onBack: () => void
  onSelectRoadmap: (roadmapId: string) => void
}

export function RoadmapDetail({
  roadmapId,
  onBack,
  onSelectRoadmap,
}: RoadmapDetailProps) {
  const roadmap = getRoadmapById(roadmapId)
  const { prev, next } = getAdjacentRoadmaps(roadmapId)

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

  const bandLabel =
    roadmap.level <= 2
      ? 'Sơ cấp · TOPIK I'
      : roadmap.level <= 4
        ? 'Trung cấp · TOPIK II'
        : 'Cao cấp · TOPIK II'

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
          <p className="roadmap-detail__eyebrow">{bandLabel}</p>
          <h1>{roadmap.title}</h1>
          <p className="roadmap-detail__textbook">{roadmap.textbook}</p>
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
            <li>
              <FontAwesomeIcon icon={faBook} />
              Vốn từ: {roadmap.vocabHint}
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
        <h2>Các bài trong giáo trình</h2>
        <p className="roadmap-detail__section-desc">
          Học lần lượt theo từng bài của <strong>{roadmap.textbook}</strong>. Mỗi bài gồm từ vựng,
          ngữ pháp và luyện 4 kỹ năng nghe – nói – đọc – viết. {roadmap.scoreHint}.
        </p>
        <ol className="roadmap-detail__steps">
          {roadmap.steps.map((step, index) => (
            <li key={step.id} className="roadmap-detail__step">
              <div className="roadmap-detail__step-index" aria-hidden="true">
                {index + 1}
              </div>
              <div className="roadmap-detail__step-body">
                <div className="roadmap-detail__step-head">
                  <h3>{step.title}</h3>
                </div>
                <p>{step.desc}</p>
                <p className="roadmap-detail__grammar">
                  <span>Ngữ pháp</span>
                  {step.grammar}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="roadmap-detail__section">
        <h2>Bạn sẽ đạt được</h2>
        <ul className="roadmap-detail__outcomes">
          <li>
            <FontAwesomeIcon icon={faCheck} />
            Hoàn thành {roadmap.textbook}
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            {roadmap.outcome}
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            Vốn từ mục tiêu: {roadmap.vocabHint}
          </li>
        </ul>
        <div className="roadmap-detail__nav">
          {prev ? (
            <button
              type="button"
              className="roadmap-detail__switch"
              onClick={() => onSelectRoadmap(prev.id)}
            >
              ← {prev.shortTitle}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              className="roadmap-detail__switch"
              onClick={() => onSelectRoadmap(next.id)}
            >
              {next.shortTitle}  đến 
            </button>
          ) : null}
        </div>
      </section>
    </div>
  )
}
