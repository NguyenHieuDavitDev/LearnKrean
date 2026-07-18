import { useState, type FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthShell } from './AuthShell'
import './Auth.css'

type RegisterPageProps = {
  onSuccess: () => void
  onGoLogin: () => void
}

export function RegisterPage({ onSuccess, onGoLogin }: RegisterPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const next: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) next.name = 'Nhập họ tên (tối thiểu 2 ký tự)'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Email không hợp lệ'
    }
    if (phone && !/^[0-9+\s-]{9,15}$/.test(phone.trim())) {
      next.phone = 'Số điện thoại không hợp lệ'
    }
    if (password.length < 6) next.password = 'Mật khẩu tối thiểu 6 ký tự'
    if (confirm !== password) next.confirm = 'Mật khẩu xác nhận không khớp'
    if (!agree) next.agree = 'Bạn cần đồng ý điều khoản để tiếp tục'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    window.setTimeout(() => {
      localStorage.setItem('chth_auth', '1')
      setLoading(false)
      onSuccess()
    }, 800)
  }

  return (
    <AuthShell
      title="Đăng ký tài khoản"
      subtitle="Tạo tài khoản miễn phí để lưu tiến độ học và luyện flashcard."
      footer={
        <>
          Đã có tài khoản?{' '}
          <button type="button" className="auth__link" onClick={onGoLogin}>
            Đăng nhập
          </button>
        </>
      }
    >
      <form className="auth__form" onSubmit={onSubmit} noValidate>
        <div className="auth__field">
          <label htmlFor="reg-name">Họ và tên</label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'is-invalid' : ''}
          />
          {errors.name && <span className="auth__error">{errors.name}</span>}
        </div>

        <div className="auth__field">
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="ban@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'is-invalid' : ''}
          />
          {errors.email && <span className="auth__error">{errors.email}</span>}
        </div>

        <div className="auth__field">
          <label htmlFor="reg-phone">
            Số điện thoại <span className="auth__hint">(tuỳ chọn)</span>
          </label>
          <input
            id="reg-phone"
            type="tel"
            autoComplete="tel"
            placeholder="09xx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? 'is-invalid' : ''}
          />
          {errors.phone && <span className="auth__error">{errors.phone}</span>}
        </div>

        <div className="auth__field">
          <label htmlFor="reg-password">Mật khẩu</label>
          <div className="auth__password">
            <input
              id="reg-password"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'is-invalid' : ''}
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
          {errors.password && <span className="auth__error">{errors.password}</span>}
        </div>

        <div className="auth__field">
          <label htmlFor="reg-confirm">Xác nhận mật khẩu</label>
          <input
            id="reg-confirm"
            type={showPw ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={errors.confirm ? 'is-invalid' : ''}
          />
          {errors.confirm && <span className="auth__error">{errors.confirm}</span>}
        </div>

        <label className="auth__check">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật
        </label>
        {errors.agree && <span className="auth__error">{errors.agree}</span>}

        <button type="submit" className="auth__submit" disabled={loading}>
          <FontAwesomeIcon icon={faUserPlus} />
          {loading ? 'Đang tạo tài khoản…' : 'Tạo tài khoản'}
        </button>
      </form>
    </AuthShell>
  )
}
