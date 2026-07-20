import { BRAND } from '../../brand'
import { BrandLogo } from './BrandLogo'
import { SearchBar } from './SearchBar'
import type { SearchResult } from '../../data/search'
import './Header.css'

type HeaderProps = {
  showBack?: boolean
  onBack?: () => void
  onHome?: () => void
  onSearchResult?: (result: SearchResult) => void
}

export function Header({ showBack = false, onBack, onHome, onSearchResult }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__glow" aria-hidden="true" />
      <div className="header__inner">
        <div className="header__left">
          <button type="button" className="header__brand" onClick={onHome} aria-label={BRAND.name}>
            <span className="header__logo-wrap">
              <BrandLogo size="md" className="header__logo" />
            </span>
            <span className="header__brand-text">
              <strong>{BRAND.shortName}</strong>
              <small>{BRAND.slogan}</small>
            </span>
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
              Quay lại
            </button>
          )}
        </div>

        <div className="header__search">
          <SearchBar onSelectResult={(result) => onSearchResult?.(result)} />
        </div>

        <a
          className="header__phone"
          href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
          aria-label={`Gọi ${BRAND.phones[0]}`}
        >
          <span className="header__phone-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M8.5 4.5h2.2l1 4.2-1.6 1a12.5 12.5 0 0 0 4.2 4.2l1-1.6 4.2 1v2.2a1.8 1.8 0 0 1-1.9 1.8A15.8 15.8 0 0 1 4.7 6.4 1.8 1.8 0 0 1 6.5 4.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="header__phone-copy">
            <small>Tư vấn lộ trình</small>
            <strong>{BRAND.phones[0]}</strong>
          </span>
        </a>
      </div>
    </header>
  )
}
