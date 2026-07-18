import { useEffect, useId, useRef, useState } from 'react'
import { getMyCourses } from '../../data/myCourses'
import './MyCoursesMenu.css'

type MyCoursesMenuProps = {
  onSelectCourse?: (id: number) => void
  onViewAll?: () => void
}

export function MyCoursesMenu({ onSelectCourse, onViewAll }: MyCoursesMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const courses = getMyCourses()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="my-courses" ref={rootRef}>
      <button
        type="button"
        className={`my-courses__trigger${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        Khóa học của tôi
      </button>

      {open && (
        <div className="my-courses__panel" id={menuId} role="menu">
          <div className="my-courses__head">
            <strong>Khóa học của tôi</strong>
            <button
              type="button"
              className="my-courses__view-all"
              onClick={() => {
                setOpen(false)
                onViewAll?.()
              }}
            >
              Xem tất cả
            </button>
          </div>

          <ul className="my-courses__list">
            {courses.map((course) => (
              <li key={course.id}>
                <button
                  type="button"
                  className="my-courses__item"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false)
                    onSelectCourse?.(course.id)
                  }}
                >
                  <span
                    className="my-courses__thumb"
                    style={{ background: course.gradient }}
                    aria-hidden="true"
                  >
                    {course.thumbTitle}
                  </span>
                  <span className="my-courses__info">
                    <span className="my-courses__title">{course.title}</span>
                    {course.progress !== null && course.lastStudiedLabel ? (
                      <>
                        <span className="my-courses__meta">{course.lastStudiedLabel}</span>
                        <span
                          className="my-courses__progress"
                          role="progressbar"
                          aria-valuenow={course.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Tiến độ ${course.progress}%`}
                        >
                          <span style={{ width: `${course.progress}%` }} />
                        </span>
                      </>
                    ) : (
                      <span className="my-courses__meta">
                        Bạn chưa học khóa này ·{' '}
                        <span className="my-courses__start">Bắt đầu học</span>
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
