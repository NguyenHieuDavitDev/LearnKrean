import { useState, type FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { AuthShell } from './AuthShell'
import './Auth.css'

type ForgotPasswordPageProps = {
  onGoLogin: () => void
}

export function ForgotPasswordPage({ onGoLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Vui lòng nhập email hợp lệ đã đăng ký')
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 700)
  }

  return (
    <AuthShell
      title={sent ? 'Kiểm tra email' : 'Quên mật khẩu'}
      subtitle={
        sent
          ? 'Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu nếu email tồn tại trong hệ thống.'
          : 'Nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu.'
      }
      footer={
        <>
          Nhớ mật khẩu rồi?{' '}
          <button type="button" className="auth__link" onClick={onGoLogin}>
            Quay lại đăng nhập
          </button>
        </>
      }
    >
      {sent ? (
        <div className="auth__success">
          <div className="auth__success-icon" aria-hidden="true">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <p>
            Nếu <strong>{email}</strong> đã được đăng ký, bạn sẽ nhận được email trong vài phút.
            Hãy kiểm tra cả hộp thư spam.
          </p>
          <button type="button" className="auth__submit" onClick={onGoLogin}>
            Về trang đăng nhập
          </button>
          <button
            type="button"
            className="auth__link"
            onClick={() => {
              setSent(false)
              setEmail('')
            }}
          >
            Gửi lại cho email khác
          </button>
        </div>
      ) : (
        <form className="auth__form" onSubmit={onSubmit} noValidate>
          <div className="auth__field">
            <label htmlFor="forgot-email">Email</label>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="ban@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? 'is-invalid' : ''}
            />
            {error && <span className="auth__error">{error}</span>}
          </div>

          <p className="auth__hint">
            Vì lý do bảo mật, chúng tôi không cho biết email có tồn tại hay không — chỉ gửi link nếu
            khớp tài khoản.
          </p>

          <button type="submit" className="auth__submit" disabled={loading}>
            <FontAwesomeIcon icon={faPaperPlane} />
            {loading ? 'Đang gửi…' : 'Gửi link đặt lại'}
          </button>
        </form>
      )}
    </AuthShell>
  )
}
