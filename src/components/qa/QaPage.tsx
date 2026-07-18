import { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClock,
  faComment,
  faEye,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import {
  filterQuestions,
  getCategoryLabel,
  QA_CATEGORIES,
  QA_FILTERS,
  QA_QUESTIONS,
  type QaCategory,
  type QaStatus,
} from '../../data/qa'
import './QaPage.css'

const PAGE_SIZE = 8

type QaPageProps = {
  onSelectQuestion?: (id: number) => void
}

export function QaPage({ onSelectQuestion }: QaPageProps) {
  const [category, setCategory] = useState<QaCategory>('all')
  const [status, setStatus] = useState<'all' | QaStatus>('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [usefulRange, setUsefulRange] = useState('30')

  const filtered = useMemo(
    () => filterQuestions(QA_QUESTIONS, { category, status, query }),
    [category, status, query],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const resetPage = () => setPage(1)

  return (
    <div className="qa-page">
      <header className="qa-page__intro">
        <h1>Hỏi và đáp</h1>
        <p>Kênh hỏi đáp dành cho học viên {BRAND.name} — ưu tiên hỗ trợ học viên Pro.</p>
      </header>

      <div className="qa-page__toolbar">
        <label className="qa-page__search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="search"
            placeholder="Tìm theo tiêu đề câu hỏi..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              resetPage()
            }}
            aria-label="Tìm câu hỏi"
          />
        </label>
        <select
          className="qa-page__select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as 'all' | QaStatus)
            resetPage()
          }}
          aria-label="Lọc trạng thái"
        >
          {QA_FILTERS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="qa-page__layout">
        <aside className="qa-page__cats">
          <h2>Danh mục</h2>
          <ul>
            {QA_CATEGORIES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={category === item.id ? 'is-active' : ''}
                  onClick={() => {
                    setCategory(item.id)
                    resetPage()
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="qa-page__useful">
            <h3>Hữu ích nhất</h3>
            <select
              value={usefulRange}
              onChange={(e) => setUsefulRange(e.target.value)}
              aria-label="Khoảng thời gian"
            >
              <option value="7">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="90">90 ngày qua</option>
            </select>
          </div>
        </aside>

        <section className="qa-page__list-wrap">
          <div className="qa-page__list-head">
            <h2>Câu hỏi</h2>
            <span>{filtered.length} kết quả</span>
          </div>

          <ul className="qa-page__list">
            {pageItems.map((item) => {
              const cat = QA_CATEGORIES.find((c) => c.id === item.category)
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="qa-item"
                    onClick={() => onSelectQuestion?.(item.id)}
                  >
                    <span className="qa-item__icon" aria-hidden="true">
                      {cat && <FontAwesomeIcon icon={cat.icon} />}
                    </span>
                    <div className="qa-item__main">
                      <h3>{item.title}</h3>
                      <p>
                        <strong>{item.author}</strong> {item.publishedAt}
                        <span> · trong {getCategoryLabel(item.category)}</span>
                      </p>
                    </div>
                    <div className="qa-item__meta">
                      <span className="qa-item__course">{item.courseTag}</span>
                      <span className={`qa-item__status qa-item__status--${item.status}`}>
                        {item.status === 'resolved' ? (
                          <>
                            <FontAwesomeIcon icon={faCheck} /> Đã giải quyết
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faClock} /> Chờ trả lời
                          </>
                        )}
                      </span>
                      <div className="qa-item__stats">
                        <span className="qa-item__avatars">
                          {item.participants.slice(0, 3).map((src) => (
                            <img key={src} src={src} alt="" />
                          ))}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faEye} />
                          {item.views}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faComment} />
                          {item.replies}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>

          {pageItems.length === 0 && (
            <p className="qa-page__empty">Không tìm thấy câu hỏi phù hợp.</p>
          )}

          {filtered.length > PAGE_SIZE && (
            <nav className="qa-page__pagination" aria-label="Phân trang hỏi đáp">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Trang trước"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={num === currentPage ? 'is-active' : ''}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Trang sau"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  )
}
