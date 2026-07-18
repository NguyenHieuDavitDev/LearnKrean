import { DANH_SACH_KHOA_HOC, type KhoaHoc } from './courses'

export type MyCourseItem = {
  courseId: number
  lastStudiedLabel: string | null
  progress: number | null
}

export type MyCourseView = KhoaHoc & {
  lastStudiedLabel: string | null
  progress: number | null
}

const MY_COURSE_ENTRIES: MyCourseItem[] = [
  { courseId: 5, lastStudiedLabel: 'Học cách đây 2 ngày trước', progress: 62 },
  { courseId: 2, lastStudiedLabel: 'Học cách đây 5 ngày trước', progress: 18 },
  { courseId: 3, lastStudiedLabel: 'Học cách đây 12 ngày trước', progress: 41 },
  { courseId: 4, lastStudiedLabel: 'Học cách đây 20 ngày trước', progress: 55 },
  { courseId: 1, lastStudiedLabel: null, progress: null },
  { courseId: 7, lastStudiedLabel: null, progress: null },
]

export function getMyCourses(): MyCourseView[] {
  return MY_COURSE_ENTRIES.flatMap((entry) => {
    const course = DANH_SACH_KHOA_HOC.find((c) => c.id === entry.courseId)
    if (!course) return []
    return [
      {
        ...course,
        lastStudiedLabel: entry.lastStudiedLabel,
        progress: entry.progress,
      },
    ]
  })
}
