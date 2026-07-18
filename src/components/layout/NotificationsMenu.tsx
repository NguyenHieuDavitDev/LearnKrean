import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { BRAND } from '../../brand'
import {
  formatUnreadBadge,
  NOTIFICATIONS,
  type NotificationAction,
  type NotificationItem,
} from '../../data/notifications'
import './NotificationsMenu.css'

function renderMessage(message: string): ReactNode[] {
  const parts = message.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return <span key={index}>{part}</span>
  })
}

type NotificationsMenuProps = {
  onViewAll?: () => void
  onOpenNotification?: (action: NotificationAction) => void
}

export function NotificationsMenu({ onViewAll, onOpenNotification }: NotificationsMenuProps) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<NotificationItem[]>(() => {
    try {
      const raw = localStorage.getItem('chth_notifs')
      if (raw) return JSON.parse(raw) as NotificationItem[]
    } catch {
      /* ignore */
    }
    return NOTIFICATIONS
  })
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const unreadCount = items.filter((item) => item.unread).length
  const badge = formatUnreadBadge(unreadCount)

  useEffect(() => {
    try {
      localStorage.setItem('chth_notifs', JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

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

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })))
  }

  const openItem = (item: NotificationItem) => {
    setItems((prev) =>
      prev.map((row) => (row.id === item.id ? { ...row, unread: false } : row)),
    )
    setOpen(false)
    if (item.action) onOpenNotification?.(item.action)
  }

  return (
    <div className="notif-menu" ref={rootRef}>
      <button
        type="button"
        className={`notif-menu__trigger${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Thông báo"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9a6 6 0 1 1 12 0c0 4 2 5.5 2 5.5H4S6 13 6 9zM10 19a2 2 0 0 0 4 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {badge && <span className="notif-menu__badge">{badge}</span>}
      </button>

      {open && (
        <div className="notif-menu__panel" id={menuId} role="menu">
          <div className="notif-menu__head">
            <strong>Thông báo</strong>
            <button
              type="button"
              className="notif-menu__mark"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              Đánh dấu đã đọc
            </button>
          </div>

          <ul className="notif-menu__list">
            {items.length === 0 ? (
              <li className="notif-menu__empty">Bạn chưa có thông báo nào.</li>
            ) : (
              items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`notif-menu__item${item.unread ? ' is-unread' : ''}`}
                    role="menuitem"
                    onClick={() => openItem(item)}
                  >
                    <span className="notif-menu__avatar" aria-hidden="true">
                      {BRAND.mark}
                    </span>
                    <span className="notif-menu__body">
                      <span className="notif-menu__text">{renderMessage(item.message)}</span>
                      <span className="notif-menu__time">{item.timeLabel}</span>
                    </span>
                    {item.unread && <span className="notif-menu__dot" aria-label="Chưa đọc" />}
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="notif-menu__foot">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onViewAll?.()
              }}
            >
              Xem tất cả thông báo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
