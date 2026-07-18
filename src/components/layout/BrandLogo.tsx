import { BRAND } from '../../brand'
import './BrandLogo.css'

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  return (
    <span
      className={`brand-logo brand-logo--${size}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {BRAND.mark}
    </span>
  )
}
