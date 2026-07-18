import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold,
  faCode,
  faImage,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faStrikethrough,
} from '@fortawesome/free-solid-svg-icons'
import './WriteBlogPage.css'

type WriteBlogPageProps = {
  onPublish?: (data: { title: string; content: string }) => void
}

export function WriteBlogPage({ onPublish }: WriteBlogPageProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlePublish = () => {
    onPublish?.({ title, content })
  }

  return (
    <div className="write-blog-page">
      <header className="write-blog-page__header">
        <h1>Viết blog</h1>
      </header>

      <form
        className="write-blog-page__form"
        onSubmit={(e) => {
          e.preventDefault()
          handlePublish()
        }}
      >
        <label className="write-blog-page__field">
          <span>
            Tiêu đề <em>*</em>
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề bài viết..."
          />
        </label>

        <label className="write-blog-page__field">
          <span>
            Nội dung <em>*</em>
          </span>
          <div className="write-blog-page__editor">
            <div className="write-blog-page__toolbar" aria-hidden="true">
              <button type="button">Đoạn văn bản</button>
              <span className="write-blog-page__toolbar-divider" />
              <button type="button" aria-label="In đậm">
                <FontAwesomeIcon icon={faBold} />
              </button>
              <button type="button" aria-label="In nghiêng">
                <FontAwesomeIcon icon={faItalic} />
              </button>
              <button type="button" aria-label="Gạch ngang">
                <FontAwesomeIcon icon={faStrikethrough} />
              </button>
              <span className="write-blog-page__toolbar-divider" />
              <button type="button" aria-label="Danh sách">
                <FontAwesomeIcon icon={faListUl} />
              </button>
              <button type="button" aria-label="Danh sách đánh số">
                <FontAwesomeIcon icon={faListOl} />
              </button>
              <button type="button" aria-label="Mã">
                <FontAwesomeIcon icon={faCode} />
              </button>
              <button type="button" aria-label="Hình ảnh">
                <FontAwesomeIcon icon={faImage} />
              </button>
              <button type="button" aria-label="Liên kết">
                <FontAwesomeIcon icon={faLink} />
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài viết..."
              rows={16}
            />
          </div>
        </label>

        <div className="write-blog-page__actions">
          <button type="button" className="write-blog-page__draft">
            LƯU BẢN NHÁP
          </button>
          <button type="submit" className="write-blog-page__publish">
            XUẤT BẢN
          </button>
        </div>
      </form>
    </div>
  )
}
