import type { ReactNode } from 'react'
import { BRAND } from '../../brand'
import { BrandLogo } from '../layout/BrandLogo'
import './Auth.css'

type AuthShellProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="auth">
      <div className="auth__backdrop" aria-hidden="true" />
      <div className="auth__panel">
        <header className="auth__brand">
          <BrandLogo size="lg" />
          <div>
            <strong>{BRAND.name}</strong>
            <span>{BRAND.slogan}</span>
          </div>
        </header>

        <div className="auth__body">
          <h1>{title}</h1>
          <p className="auth__subtitle">{subtitle}</p>
          {children}
        </div>

        {footer && <footer className="auth__footer">{footer}</footer>}
      </div>
    </div>
  )
}
