import { getMyCourses } from '../../data/myCourses'
import './MyCoursesPage.css'

type MyCoursesPageProps = {
  onSelectKhoaHoc?: (id: number) => void
}

export function MyCoursesPage({ onSelectKhoaHoc }: MyCoursesPageProps) {
  const courses = getMyCourses()

  return (
    <div className="my-courses-page">
      <div className="my-courses-page__grid">
        {courses.map((course) => (
          <article
            key={course.id}
            className="my-courses-card"
            role={onSelectKhoaHoc ? 'button' : undefined}
            tabIndex={onSelectKhoaHoc ? 0 : undefined}
            onClick={() => onSelectKhoaHoc?.(course.id)}
            onKeyDown={(e) => {
              if (!onSelectKhoaHoc) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectKhoaHoc(course.id)
              }
            }}
          >
            <div className="my-courses-card__thumb" style={{ background: course.gradient }}>
              <pre>{course.thumbTitle}</pre>
            </div>
            <h3>{course.title}</h3>
            <p className="my-courses-card__price">{course.price}</p>
            <p className="my-courses-card__rating">Chưa có đánh giá</p>
            <div className="my-courses-card__meta">
              <span>{course.students} học viên</span>
              <span>{course.lessons} bài học</span>
              <span>{course.duration}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
