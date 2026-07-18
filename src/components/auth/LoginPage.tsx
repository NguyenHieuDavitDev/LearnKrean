import { useState, type FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { AuthShell } from './AuthShell'
import './Auth.css'

type LoginPageProps = {
  onSuccess: () => void
  onGoRegister: () => void
  onGoForgot: () => void
}

export function LoginPage({ onSuccess, onGoRegister, onGoForgot }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const next: { email?: string; password?: string } = {}
    if (!email.trim()) next.email = 'Vui lòng nhập email hoặc số điện thoại'
    if (!password) next.password = 'Vui lòng nhập mật khẩu'
    else if (password.length < 6) next.password = 'Mật khẩu tối thiểu 6 ký tự'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validate()) return
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      if (remember) localStorage.setItem('chth_auth', '1')
      else localStorage.setItem('chth_auth', '1')
      onSuccess()
    }, 700)
  }

  return (
    <AuthShell
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay lại — tiếp tục lộ trình học tiếng Hàn của bạn."
      footer={
        <>
          Chưa có tài khoản?{' '}
          <button type="button" className="auth__link" onClick={onGoRegister}>
            Đăng ký ngay
          </button>
        </>
      }
    >
      <form className="auth__form" onSubmit={onSubmit} noValidate>
        {error && <div className="auth__alert">{error}</div>}

        <div className="auth__field">
          <label htmlFor="login-email">Email hoặc số điện thoại</label>
          <input
            id="login-email"
            type="text"
            autoComplete="username"
            placeholder="vd: ban@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldErrors.email ? 'is-invalid' : ''}
          />
          {fieldErrors.email && <span className="auth__error">{fieldErrors.email}</span>}
        </div>

        <div className="auth__field">
          <label htmlFor="login-password">Mật khẩu</label>
          <div className="auth__password">
            <input
              id="login-password"
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldErrors.password ? 'is-invalid' : ''}
            />
            <button
              type="button"
              className="auth__toggle-pw"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
            </button>
          </div>
          {fieldErrors.password && <span className="auth__error">{fieldErrors.password}</span>}
        </div>

        <div className="auth__row">
          <label className="auth__check">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Ghi nhớ đăng nhập
          </label>
          <button type="button" className="auth__link" onClick={onGoForgot}>
            Quên mật khẩu?
          </button>
        </div>

        <button type="submit" className="auth__submit" disabled={loading}>
          <FontAwesomeIcon icon={faRightToBracket} />
          {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
        </button>

        <div className="auth__divider">hoặc</div>

        <div className="auth__social">
          <button type="button" onClick={onSuccess}>
            Google
          </button>
          <button type="button" onClick={onSuccess}>
            Facebook
          </button>
        </div>
      </form>
    </AuthShell>
  )
}
