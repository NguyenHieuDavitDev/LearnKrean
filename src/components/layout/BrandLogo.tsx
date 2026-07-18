import logoCct from '../../assets/logo cct.png'
import { BRAND } from '../../brand'
import './BrandLogo.css'

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  return (
    <img
      src={logoCct}
      alt={BRAND.company}
      className={`brand-logo brand-logo--${size}${className ? ` ${className}` : ''}`}
    />
  )
}
