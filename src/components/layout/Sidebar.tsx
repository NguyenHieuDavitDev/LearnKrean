import './Sidebar.css'

type SidebarProps = {
  active?: 'home' | 'articles' | 'roadmap' | 'qa' | 'about' | string
  onNavigateHome?: () => void
  onNavigateArticles?: () => void
  onNavigateRoadmap?: () => void
  onNavigateQa?: () => void
  onNavigateAbout?: () => void
}

export function Sidebar({
  active = 'home',
  onNavigateHome,
  onNavigateArticles,
  onNavigateRoadmap,
  onNavigateQa,
  onNavigateAbout,
}: SidebarProps) {
  const navItems = [
    {
      id: 'home',
      label: 'Trang chủ',
      onClick: onNavigateHome,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'roadmap',
      label: 'Lộ trình',
      onClick: onNavigateRoadmap,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16.5 7.5l1.5-1.5M7.5 16.5L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'articles',
      label: 'Bài viết',
      onClick: onNavigateArticles,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'qa',
      label: 'Hỏi đáp',
      onClick: onNavigateQa,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 13.5v-7z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 8.5h6M9 11.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'about',
      label: 'Giới thiệu',
      onClick: onNavigateAbout,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav" aria-label="Điều hướng chính">
        {navItems.map((item) => {
          const isActive = active === item.id
          const className = `sidebar__item${isActive ? ' sidebar__item--active' : ''}`

          return (
            <button
              key={item.id}
              type="button"
              className={className}
              onClick={item.onClick}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
