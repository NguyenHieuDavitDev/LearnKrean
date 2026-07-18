import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBagShopping,
  faBell,
  faChevronRight,
  faFileInvoice,
  faShieldHalved,
  faUser,
  faUserLock,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { BrandLogo } from '../layout/BrandLogo'
import { CURRENT_USER } from '../../data/user'
import './SettingsPage.css'

export type SettingsTab =
  | 'personal'
  | 'security'
  | 'privacy'
  | 'orders'
  | 'payments'
  | 'notifications'

type SettingsPageProps = {
  onClose: () => void
  initialTab?: SettingsTab
}

type NavItem = {
  id: SettingsTab
  label: string
  icon: typeof faUser
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'TÀI KHOẢN',
    items: [
      { id: 'personal', label: 'Thông tin cá nhân', icon: faUser },
      { id: 'security', label: 'Mật khẩu và bảo mật', icon: faShieldHalved },
      { id: 'privacy', label: 'Quyền riêng tư', icon: faUserLock },
    ],
  },
  {
    title: 'MUA HÀNG',
    items: [
      { id: 'orders', label: 'Đơn hàng của tôi', icon: faBagShopping },
      { id: 'payments', label: 'Lịch sử thanh toán', icon: faFileInvoice },
    ],
  },
  {
    title: 'TUỲ CHỌN',
    items: [{ id: 'notifications', label: 'Thông báo', icon: faBell }],
  },
]

function emptyLabel(value: string) {
  return value.trim() ? value : 'Chưa cập nhật'
}

function SettingsRow({
  label,
  value,
  avatar,
}: {
  label: string
  value?: string
  avatar?: string
}) {
  return (
    <button type="button" className="settings-row">
      <span className="settings-row__label">{label}</span>
      <span className="settings-row__value">
        {avatar && <img src={avatar} alt="" className="settings-row__avatar" />}
        {value && <span>{value}</span>}
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </button>
  )
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="settings-toggle">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
      <span className="settings-toggle__track" aria-hidden="true" />
    </label>
  )
}

function PersonalTab() {
  return (
    <div className="settings-tab">
      <h1>Thông tin cá nhân</h1>

      <section className="settings-card">
        <h2>Thông tin cơ bản</h2>
        <SettingsRow label="Ảnh đại diện" avatar={CURRENT_USER.avatar} />
        <SettingsRow label="Họ và tên" value={CURRENT_USER.name} />
        <SettingsRow label="Bio" value={emptyLabel(CURRENT_USER.bio)} />
        <SettingsRow label="Email" value={CURRENT_USER.email} />
        <SettingsRow label="Số điện thoại" value={emptyLabel(CURRENT_USER.phone)} />
      </section>

      <section className="settings-card">
        <h2>Thông tin mạng xã hội</h2>
        <SettingsRow label="Facebook" value={emptyLabel(CURRENT_USER.facebook)} />
        <SettingsRow label="YouTube" value={emptyLabel(CURRENT_USER.youtube)} />
      </section>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="settings-tab">
      <h1>Mật khẩu và bảo mật</h1>

      <section className="settings-card">
        <h2>Đăng nhập &amp; khôi phục</h2>
        <SettingsRow label="Tạo mật khẩu" value="Chưa đổi mật khẩu" />
        <SettingsRow label="Xác minh 2 bước" value="Đang tắt" />
      </section>

      <section className="settings-card">
        <h2>Tài khoản liên kết</h2>
        <div className="settings-linked">
          <div className="settings-linked__row">
            <div>
              <strong>Google</strong>
              <span>{CURRENT_USER.email}</span>
            </div>
            <span className="settings-linked__badge">Mặc định</span>
          </div>
          <div className="settings-linked__row">
            <strong>Facebook</strong>
            <button type="button" className="settings-linked__connect">
              Kết nối
            </button>
          </div>
          <div className="settings-linked__row">
            <strong>Github</strong>
            <button type="button" className="settings-linked__connect">
              Kết nối
            </button>
          </div>
        </div>
      </section>

      <section className="settings-card">
        <h2>Kiểm tra bảo mật</h2>
        <SettingsRow label="Nơi bạn đã đăng nhập" value="1 / 2 phiên" />
        <SettingsRow label="Nhật ký hoạt động" />
      </section>
    </div>
  )
}

function PrivacyTab() {
  const [visibility, setVisibility] = useState<'public' | 'followers' | 'private'>('public')
  const [googleIndex, setGoogleIndex] = useState(true)

  return (
    <div className="settings-tab">
      <h1>Quyền riêng tư</h1>

      <section className="settings-card">
        <h2>Ai có thể xem hồ sơ</h2>
        <div className="settings-radio-group" role="radiogroup" aria-label="Ai có thể xem hồ sơ">
          {(
            [
              { id: 'public', label: 'Công khai' },
              { id: 'followers', label: 'Người theo dõi' },
              { id: 'private', label: 'Chỉ mình tôi' },
            ] as const
          ).map((opt) => (
            <label key={opt.id} className="settings-radio">
              <input
                type="radio"
                name="profile-visibility"
                checked={visibility === opt.id}
                onChange={() => setVisibility(opt.id)}
              />
              <span className="settings-radio__dot" aria-hidden="true" />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="settings-card">
        <ToggleSwitch
          label="Cho phép Google index profile"
          checked={googleIndex}
          onChange={setGoogleIndex}
        />
      </section>
    </div>
  )
}

function OrdersTab() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'done' | 'cancelled'>('all')

  return (
    <div className="settings-tab">
      <h1>Đơn hàng của tôi</h1>

      <section className="settings-card settings-card--flat">
        <p className="settings-card__meta">Đang hiển thị 1 đơn hàng</p>

        <div className="settings-orders-toolbar">
          <input type="search" placeholder="Tìm theo mã đơn..." aria-label="Tìm theo mã đơn" />
          <div className="settings-pills" role="tablist" aria-label="Lọc đơn hàng">
            {(
              [
                { id: 'all', label: 'Tất cả' },
                { id: 'pending', label: 'Chờ thanh toán' },
                { id: 'done', label: 'Hoàn tất' },
                { id: 'cancelled', label: 'Đã hủy' },
              ] as const
            ).map((pill) => (
              <button
                key={pill.id}
                type="button"
                role="tab"
                aria-selected={filter === pill.id}
                className={`settings-pill${filter === pill.id ? ' is-active' : ''}`}
                onClick={() => setFilter(pill.id)}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        <article className="settings-order">
          <div className="settings-order__head">
            <div>
              <strong>Mã đơn: WVPU</strong>
              <span>04:03 07/12/2022</span>
            </div>
            <span className="settings-order__badge">Hoàn tất</span>
          </div>
          <div className="settings-order__foot">
            <span>Tổng đơn 1.299.000đ</span>
            <span>Đã thanh toán 0đ</span>
          </div>
        </article>
      </section>
    </div>
  )
}

function PaymentsTab() {
  return (
    <div className="settings-tab">
      <h1>Lịch sử thanh toán</h1>

      <section className="settings-card settings-card--flat">
        <p className="settings-card__meta">Đang hiển thị 0 giao dịch</p>
        <p className="settings-card__total">Tổng tiền trang này 0đ</p>
        <div className="settings-empty">Chưa có giao dịch</div>
      </section>
    </div>
  )
}

function NotificationsTab() {
  const [toggles, setToggles] = useState({
    assignments: true,
    deadlines: true,
    learning: true,
    comments: true,
    follows: true,
    feedback: true,
  })

  const setToggle = (key: keyof typeof toggles, value: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="settings-tab">
      <h1>Thông báo</h1>
      <p className="settings-tab__desc">
        Quản lý các loại thông báo mà hệ thống gửi đến bạn.
      </p>

      <section className="settings-card">
        <h2>Học tập</h2>
        <ToggleSwitch
          label="Bài tập và chấm điểm"
          checked={toggles.assignments}
          onChange={(v) => setToggle('assignments', v)}
        />
        <ToggleSwitch
          label="Nhắc hạn bài tập"
          checked={toggles.deadlines}
          onChange={(v) => setToggle('deadlines', v)}
        />
        <ToggleSwitch
          label="Nội dung học tập"
          checked={toggles.learning}
          onChange={(v) => setToggle('learning', v)}
        />
      </section>

      <section className="settings-card">
        <h2>Cộng đồng</h2>
        <ToggleSwitch
          label="Bình luận và nhắc tên"
          checked={toggles.comments}
          onChange={(v) => setToggle('comments', v)}
        />
        <ToggleSwitch
          label="Theo dõi và bài viết"
          checked={toggles.follows}
          onChange={(v) => setToggle('follows', v)}
        />
        <ToggleSwitch
          label="Góp ý và báo cáo"
          checked={toggles.feedback}
          onChange={(v) => setToggle('feedback', v)}
        />
      </section>

      <section className="settings-card settings-card--note">
        <h2>Luôn bật</h2>
        <p>
          Các thông báo liên quan đến đăng nhập, bảo mật tài khoản và giao dịch quan trọng sẽ
          luôn được gửi.
        </p>
      </section>
    </div>
  )
}

function TabContent({ tab }: { tab: SettingsTab }) {
  switch (tab) {
    case 'personal':
      return <PersonalTab />
    case 'security':
      return <SecurityTab />
    case 'privacy':
      return <PrivacyTab />
    case 'orders':
      return <OrdersTab />
    case 'payments':
      return <PaymentsTab />
    case 'notifications':
      return <NotificationsTab />
  }
}

export function SettingsPage({ onClose, initialTab = 'personal' }: SettingsPageProps) {
  const [tab, setTab] = useState<SettingsTab>(initialTab)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="settings-page" role="dialog" aria-modal="true" aria-label="Cài đặt tài khoản">
      <header className="settings-page__header">
        <BrandLogo size="sm" />
        <button type="button" className="settings-page__close" aria-label="Đóng" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </header>

      <div className="settings-page__body">
        <aside className="settings-page__sidebar">
          <h1>Cài đặt tài khoản</h1>
          <p>Quản lý hồ sơ, bảo mật, đơn hàng và tuỳ chọn thông báo.</p>

          <nav className="settings-nav">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="settings-nav__group">
                <span className="settings-nav__title">{group.title}</span>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`settings-nav__item${tab === item.id ? ' is-active' : ''}`}
                        onClick={() => setTab(item.id)}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="settings-page__main">
          <TabContent tab={tab} />
        </main>
      </div>
    </div>
  )
}
