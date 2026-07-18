import { BRAND } from '../../brand'
import { BrandLogo } from './BrandLogo'
import './Footer.css'

type FooterProps = {
  onNavigateFlashcards?: () => void
}

export function Footer({ onNavigateFlashcards }: FooterProps) {
  const [phone1, phone2] = BRAND.phones

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__col footer__col--brand">
          <div className="footer__brand">
            <BrandLogo size="sm" className="footer__logo-mark" />
            <div>
              <strong>{BRAND.name}</strong>
              <p>{BRAND.slogan}</p>
            </div>
          </div>
          <ul className="footer__contact">
            <li>
              Điện thoại:{' '}
              <a href={`tel:${phone1.replace(/\s/g, '')}`}>{phone1}</a>
              {' – '}
              <a href={`tel:${phone2.replace(/\s/g, '')}`}>{phone2}</a>
            </li>
            <li>Địa chỉ: {BRAND.address}</li>
          </ul>
          <div className="footer__badges">
            <span className="footer__badge">DMCA PROTECTED</span>
            <span className="footer__badge footer__badge--gov">ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</span>
          </div>
        </div>

        <div className="footer__col">
          <h3>VỀ CHÚNG TÔI</h3>
          <ul>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#contact">Liên hệ</a></li>
            <li><a href="#terms">Điều khoản</a></li>
            <li><a href="#privacy">Bảo mật</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>HỖ TRỢ</h3>
          <ul>
            <li><a href="#pay">Thanh toán</a></li>
            <li><a href="#guide">Hướng dẫn học</a></li>
            <li><a href="#refund">Đổi trả</a></li>
            <li><a href="#pricing">Bảng giá</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>CÔNG CỤ</h3>
          <ul>
            <li><a href="#dict">Từ điển Việt-Hàn</a></li>
            <li><a href="#keyboard">Bàn phím tiếng Hàn</a></li>
            <li><a href="#topik">Luyện đề TOPIK</a></li>
            <li>
              <button type="button" className="footer__link-btn" onClick={onNavigateFlashcards}>
                Flashcard từ vựng
              </button>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--company">
          <h3>{BRAND.company.toUpperCase()}</h3>
          <p>Địa chỉ: {BRAND.address}</p>
          <p>Điện thoại: {BRAND.phoneDisplay}</p>
          <p>
            Đơn vị chủ quản của {BRAND.name}. Chúng tôi tập trung đào tạo tiếng Hàn chất lượng,
            đồng hành cùng học viên từ nền tảng đến giao tiếp và thi chứng chỉ.
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. Thuộc {BRAND.company}
        </p>
        <div className="footer__social">
          <a href="#youtube" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z"/></svg>
          </a>
          <a href="#facebook" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.2h2.4V5H14c-2.4 0-4 1.7-4 4.2V11H7.5v3.3H10V22h3.5v-7.7h2.7l.5-3.3H13.5V9.2c0-.6.3-1 1-1z"/></svg>
          </a>
          <a href="#tiktok" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 8.4a6.5 6.5 0 0 1-3.7-1.2v7.1a5.7 5.7 0 1 1-4.9-5.6v2.9a2.9 2.9 0 1 0 2.1 2.8V2.5h2.8a6.5 6.5 0 0 0 3.7 5.5v.4z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
