import { CURRENT_USER } from '../../data/user'
import './ProfilePage.css'

const HEATMAP_WEEKS = 52
const HEATMAP_DAYS = 7

function buildHeatmap(): boolean[][] {
  const grid: boolean[][] = []
  for (let w = 0; w < HEATMAP_WEEKS; w++) {
    const week: boolean[] = []
    for (let d = 0; d < HEATMAP_DAYS; d++) {
      week.push((w * 3 + d * 5) % 11 === 0 || (w + d) % 17 === 0)
    }
    grid.push(week)
  }
  return grid
}

const HEATMAP = buildHeatmap()

export function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-page__layout">
        <aside className="profile-page__sidebar">
          <div className="profile-page__avatar-wrap">
            <img src={CURRENT_USER.avatar} alt="" className="profile-page__avatar" />
          </div>
          <h1>{CURRENT_USER.name}</h1>
          <p className="profile-page__handle">{CURRENT_USER.handle}</p>
          <div className="profile-page__stats">
            <span>
              <strong>{CURRENT_USER.followers}</strong> người theo dõi
            </span>
            <span>
              <strong>{CURRENT_USER.following}</strong> đang theo dõi
            </span>
          </div>
          <p className="profile-page__joined">{CURRENT_USER.joinedLabel}</p>
        </aside>

        <div className="profile-page__main">
          <section className="profile-page__activity">
            <h2>2 hoạt động trong 12 tháng qua</h2>
            <div className="profile-page__heatmap" aria-hidden="true">
              {HEATMAP.map((week, wi) => (
                <div key={wi} className="profile-page__heatmap-week">
                  {week.map((active, di) => (
                    <span
                      key={di}
                      className={`profile-page__heatmap-cell${active ? ' is-active' : ''}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>

          <h2>Bài viết đã đăng</h2>
          <p className="profile-page__empty">Chưa có bài viết nào.</p>
        </div>
      </div>
    </div>
  )
}
