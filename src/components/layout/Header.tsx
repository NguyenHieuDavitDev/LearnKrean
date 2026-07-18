import { BRAND } from '../../brand'
import { BrandLogo } from './BrandLogo'
import { NotificationsMenu } from './NotificationsMenu'
import { SearchBar } from './SearchBar'
import { UserMenu } from './UserMenu'
import type { SearchResult } from '../../data/search'
import type { NotificationAction } from '../../data/notifications'
import './Header.css'

type HeaderProps = {
  showBack?: boolean
  onBack?: () => void
  onHome?: () => void
  onProfile?: () => void
  onWriteBlog?: () => void
  onMyPosts?: () => void
  onSavedPosts?: () => void
  onSettings?: () => void
  onLogout?: () => void
  onSearchResult?: (result: SearchResult) => void
  onNotificationAction?: (action: NotificationAction) => void
  onViewAllNotifications?: () => void
}

export function Header({
  showBack = false,
  onBack,
  onHome,
  onProfile,
  onWriteBlog,
  onMyPosts,
  onSavedPosts,
  onSettings,
  onLogout,
  onSearchResult,
  onNotificationAction,
  onViewAllNotifications,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <button type="button" className="header__brand" onClick={onHome} aria-label={BRAND.name}>
            <BrandLogo />
          </button>
          {showBack && (
            <button type="button" className="header__back" onClick={onBack}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              QUAY LẠI
            </button>
          )}
        </div>

        <SearchBar onSelectResult={(result) => onSearchResult?.(result)} />

        <div className="header__actions">
          <NotificationsMenu
            onViewAll={onViewAllNotifications}
            onOpenNotification={onNotificationAction}
          />
          <UserMenu
            onProfile={onProfile}
            onWriteBlog={onWriteBlog}
            onMyPosts={onMyPosts}
            onSavedPosts={onSavedPosts}
            onSettings={onSettings}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  )
}
