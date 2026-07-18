import { useEffect, useId, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faFileLines,
  faGear,
  faPenToSquare,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { CURRENT_USER } from '../../data/user'
import './UserMenu.css'

export type UserMenuProps = {
  onProfile?: () => void
  onWriteBlog?: () => void
  onMyPosts?: () => void
  onSavedPosts?: () => void
  onSettings?: () => void
  onLogout?: () => void
}

type MenuItem = {
  label: string
  icon: typeof faUser
  action?: () => void
}

export function UserMenu({
  onProfile,
  onWriteBlog,
  onMyPosts,
  onSavedPosts,
  onSettings,
  onLogout,
}: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

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

  const items: MenuItem[] = [
    { label: 'Trang cá nhân', icon: faUser, action: onProfile },
    { label: 'Viết blog', icon: faPenToSquare, action: onWriteBlog },
    { label: 'Bài viết của tôi', icon: faFileLines, action: onMyPosts },
    { label: 'Bài viết đã lưu', icon: faBookmark, action: onSavedPosts },
    { label: 'Cài đặt', icon: faGear, action: onSettings },
    { label: 'Đăng xuất', icon: faRightFromBracket, action: onLogout },
  ]

  const runItem = (action?: () => void) => {
    setOpen(false)
    action?.()
  }

  return (
    <div className="user-menu" ref={rootRef}>
      <button
        type="button"
        className={`user-menu__trigger${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Menu tài khoản"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="user-menu__ring">
          <img src={CURRENT_USER.avatar} alt="" className="user-menu__avatar" />
        </span>
      </button>

      {open && (
        <div className="user-menu__panel" id={menuId} role="menu">
          <div className="user-menu__profile">
            <img src={CURRENT_USER.avatar} alt="" className="user-menu__profile-avatar" />
            <div>
              <strong>{CURRENT_USER.name}</strong>
              <span>{CURRENT_USER.handle}</span>
            </div>
          </div>

          <div className="user-menu__divider" role="separator" />

          <ul className="user-menu__list">
            {items.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className="user-menu__item"
                  role="menuitem"
                  onClick={() => runItem(item.action)}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
