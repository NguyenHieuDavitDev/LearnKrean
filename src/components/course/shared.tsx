import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCertificate,
  faCheck,
  faClock,
  faCrown,
  faLayerGroup,
  faPlay,
  faSignal,
} from '@fortawesome/free-solid-svg-icons'

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="khoa-hoc-card__stars" aria-label={`${rating} sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 16 16" className={i < Math.round(rating) ? 'filled' : ''}>
          <path
            d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.7 4.4 12.5l.7-4L2.2 5.7l4-.6L8 1.5z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  )
}

export function ProCrown({ className = 'pro-crown' }: { className?: string }) {
  return (
    <span className={className} aria-label="Pro">
      <FontAwesomeIcon icon={faCrown} />
    </span>
  )
}

export function CheckIcon() {
  return <FontAwesomeIcon icon={faCheck} aria-hidden />
}

const FEATURE_ICONS = {
  level: faSignal,
  lessons: faPlay,
  time: faClock,
  cert: faCertificate,
  access: faLayerGroup,
} as const

export function FeatureIcon({ type }: { type: keyof typeof FEATURE_ICONS }) {
  return <FontAwesomeIcon icon={FEATURE_ICONS[type]} aria-hidden />
}
