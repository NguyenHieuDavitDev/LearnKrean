import { SOCIAL } from '../../brand'
import { SocialPlatformIcon } from './SocialPlatformIcon'
import './SocialLinks.css'

type SocialLinksProps = {
  variant?: 'icons' | 'cards' | 'compact'
  className?: string
}

export function SocialLinks({ variant = 'icons', className }: SocialLinksProps) {
  const rootClass = ['social-links', `social-links--${variant}`, className].filter(Boolean).join(' ')

  return (
    <ul className={rootClass} aria-label="Mạng xã hội Cô Huyền Tiếng Hàn">
      {SOCIAL.links.map((link) => (
        <li key={link.id}>
          <a
            className="social-links__item"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} — ${link.action}`}
          >
            <SocialPlatformIcon platform={link.id} size={variant === 'cards' ? 'lg' : 'sm'} className="social-links__icon" />
            {variant !== 'icons' && (
              <span className="social-links__text">
                <strong>{variant === 'compact' ? link.action : link.label}</strong>
                {variant === 'cards' && <small>{link.action}</small>}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
