import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import { ROADMAPS } from '../../data/roadmaps'
import './RoadmapPage.css'

type RoadmapPageProps = {
  onSelectRoadmap: (roadmapId: string) => void
}

export function RoadmapPage({ onSelectRoadmap }: RoadmapPageProps) {
  return (
    <div className="roadmap-page">
      <header className="roadmap-page__intro">
        <h1>Lộ trình học</h1>
        <p>
          Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Lộ trình từ{' '}
          <strong>cơ bản đến nâng cao</strong> sẽ giúp bạn học đúng trình tự, tránh lan man và đạt mục
          tiêu rõ ràng hơn tại {BRAND.name}.
        </p>
      </header>

      <div className="roadmap-page__grid">
        {ROADMAPS.map((roadmap) => (
          <article key={roadmap.id} className="roadmap-card">
            <div className="roadmap-card__content">
              <h2>{roadmap.title}</h2>
              <p>{roadmap.description}</p>
              <div className="roadmap-card__skills" aria-label="Kỹ năng trong lộ trình">
                {roadmap.skills.map((skill) => (
                  <span key={skill.label} className="roadmap-card__skill" title={skill.label}>
                    <FontAwesomeIcon icon={skill.icon} />
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="roadmap-card__cta"
                onClick={() => onSelectRoadmap(roadmap.id)}
              >
                Xem chi tiết
              </button>
            </div>
            <div
              className="roadmap-card__visual"
              style={{ background: roadmap.illustration.gradient }}
              aria-hidden="true"
            >
              <span className="roadmap-card__mark">{roadmap.illustration.mark}</span>
              <span className="roadmap-card__badge">{roadmap.illustration.caption}</span>
            </div>
          </article>
        ))}
      </div>

      <section className="roadmap-page__community">
        <div className="roadmap-page__community-copy">
          <h2>Tham gia cộng đồng học viên {BRAND.shortName}</h2>
          <p>
            Hỏi đáp bài tập, chia sẻ kinh nghiệm học tiếng Hàn và nhận hỗ trợ từ giảng viên cùng học
            viên khác.
          </p>
          <a
            href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
            className="roadmap-page__community-btn"
          >
            Liên hệ tư vấn lộ trình
          </a>
        </div>
        <div className="roadmap-page__community-art" aria-hidden="true">
          <span className="roadmap-page__bubble roadmap-page__bubble--a">
            <FontAwesomeIcon icon={faUsers} />
          </span>
          <span className="roadmap-page__bubble roadmap-page__bubble--b">한글</span>
          <span className="roadmap-page__bubble roadmap-page__bubble--c">TOPIK</span>
        </div>
      </section>
    </div>
  )
}
