export type NotificationAction =
  | { type: 'course'; id: number }
  | { type: 'article'; id: number }
  | { type: 'qa'; id: number }
  | { type: 'flashcard'; id: string }
  | { type: 'settings' }
  | { type: 'home' }

export type NotificationItem = {
  id: number
  /** Plain text with optional **bold** segments */
  message: string
  timeLabel: string
  unread: boolean
  action?: NotificationAction
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    message: 'Bài học **Tóm tắt chương Hangul** mới được thêm vào.',
    timeLabel: '2 giờ trước',
    unread: true,
    action: { type: 'course', id: 1 },
  },
  {
    id: 2,
    message: 'Cô Huyền đã trả lời câu hỏi **Khi nào dùng 아요 / 어요?** của bạn.',
    timeLabel: '5 giờ trước',
    unread: true,
    action: { type: 'qa', id: 1 },
  },
  {
    id: 3,
    message: 'Khóa học **TOPIK Pro** vừa cập nhật bài luyện đề mới.',
    timeLabel: '1 ngày trước',
    unread: true,
    action: { type: 'course', id: 5 },
  },
  {
    id: 4,
    message: 'Bạn đã hoàn thành **80%** khóa Tiếng Hàn sơ cấp 1. Cố lên nhé!',
    timeLabel: '2 ngày trước',
    unread: true,
    action: { type: 'course', id: 2 },
  },
  {
    id: 5,
    message: 'Bài viết mới: **Cách nhớ batchim nhanh cho người mới**.',
    timeLabel: '3 ngày trước',
    unread: false,
    action: { type: 'article', id: 7 },
  },
  {
    id: 6,
    message: 'Nhắc lịch: buổi **Luyện nói với bản ngữ** vào 20:00 tối nay.',
    timeLabel: '4 ngày trước',
    unread: false,
    action: { type: 'course', id: 7 },
  },
  {
    id: 7,
    message: 'Flashcard tuần 4 khóa **Giao tiếp hàng ngày** đã sẵn sàng.',
    timeLabel: '1 tuần trước',
    unread: false,
    action: { type: 'flashcard', id: 'greetings' },
  },
  {
    id: 8,
    message: 'Chúc mừng! Bạn đạt chuỗi học **7 ngày liên tục**.',
    timeLabel: '2 tuần trước',
    unread: false,
    action: { type: 'home' },
  },
]

export function formatUnreadBadge(count: number) {
  if (count <= 0) return null
  if (count > 99) return '99+'
  return String(count)
}
