import './Sidebar.css'

type SidebarProps = {
  active?: 'home' | 'pro' | 'articles' | 'videos' | 'roadmap' | 'qa' | 'flashcards' | string
  onNavigateHome?: () => void
  onNavigatePro?: () => void
  onNavigateArticles?: () => void
  onNavigateVideos?: () => void
  onNavigateRoadmap?: () => void
  onNavigateQa?: () => void
  onNavigateFlashcards?: () => void
}

export function Sidebar({
  active = 'home',
  onNavigateHome,
  onNavigatePro,
  onNavigateArticles,
  onNavigateVideos,
  onNavigateRoadmap,
  onNavigateQa,
  onNavigateFlashcards,
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
      id: 'pro',
      label: 'Khóa Pro',
      onClick: onNavigatePro,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 16.5l2.2-8.2L9.8 12l2.2-5.5L14.2 12l2.6-3.7L19 16.5H5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'flashcards',
      label: 'Từ vựng',
      onClick: onNavigateFlashcards,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="5" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 5V4a1 1 0 0 1 1-1h9a2 2 0 0 1 2 2v14a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 10h6M7 14h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
      id: 'videos',
      label: 'Video',
      onClick: onNavigateVideos,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor" />
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
