import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BRAND } from '../../brand'
import { ROADMAPS } from '../../data/roadmaps'
import communityImg from '../../assets/anh cong dong hoc vien.jpg'
import './RoadmapPage.css'

type RoadmapPageProps = {
  onSelectRoadmap: (roadmapId: string) => void
}

export function RoadmapPage({ onSelectRoadmap }: RoadmapPageProps) {
  return (
    <div className="roadmap-page">
      <header className="roadmap-page__intro page-intro">
        <p className="page-intro__kicker">Theo giáo trình chuẩn</p>
        <h1>Lộ trình học</h1>
        <p>
          Sáu lộ trình bám sát bộ{' '}
          <strong>Tiếng Hàn Tổng hợp dành cho người Việt Nam</strong> (Sơ cấp 1  đến  Cao cấp 2) — từng
          bài cụ thể, ngữ pháp rõ ràng, hướng tới TOPIK 1–6 tại {BRAND.name}.
        </p>
      </header>

      <div className="roadmap-page__grid">
        {ROADMAPS.map((roadmap) => (
          <article key={roadmap.id} className="roadmap-card">
            <div className="roadmap-card__content">
              <p className="roadmap-card__exam">{roadmap.textbook}</p>
              <h2>{roadmap.title}</h2>
              <p>{roadmap.description}</p>
              <p className="roadmap-card__meta">
                {roadmap.steps.length} bài · {roadmap.duration}
              </p>
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

      <section className="roadmap-page__community" aria-labelledby="roadmap-community-title">
        <img
          className="roadmap-page__community-photo"
          src={communityImg}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="roadmap-page__community-shade" aria-hidden="true" />
        <div className="roadmap-page__community-inner">
          <div className="roadmap-page__community-copy">
            <h2 id="roadmap-community-title">Tham gia cộng đồng học viên {BRAND.shortName}</h2>
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
        </div>
      </section>
    </div>
  )
}
