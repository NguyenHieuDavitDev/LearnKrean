export type NotificationAction =
  | { type: 'article'; id: number }
  | { type: 'qa'; id: number }
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
    id: 2,
    message: 'Cô Huyền đã trả lời câu hỏi **Khi nào dùng 아요 / 어요?** của bạn.',
    timeLabel: '5 giờ trước',
    unread: true,
    action: { type: 'qa', id: 1 },
  },
  {
    id: 5,
    message: 'Bài viết mới: **Cách nhớ batchim nhanh cho người mới**.',
    timeLabel: '3 ngày trước',
    unread: false,
    action: { type: 'article', id: 7 },
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
