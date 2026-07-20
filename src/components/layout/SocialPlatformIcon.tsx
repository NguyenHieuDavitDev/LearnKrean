import type { ReactElement } from 'react'
import type { SocialPlatformId } from '../../brand'
import './SocialPlatformIcon.css'

type SocialPlatformIconProps = {
  platform: SocialPlatformId
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const ICONS: Record<SocialPlatformId, ReactElement> = {
  youtube: (
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
  ),
  tiktok: (
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.93 2.93 0 0 1 2.31-2.84V8.26a6.33 6.33 0 1 0 5.34 9.31V9.41a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.84z" />
  ),
  facebook: (
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  ),
}

export function SocialPlatformIcon({ platform, size = 'md', className }: SocialPlatformIconProps) {
  const rootClass = ['social-platform-icon', `social-platform-icon--${platform}`, `social-platform-icon--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={rootClass} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        {ICONS[platform]}
      </svg>
    </span>
  )
}
