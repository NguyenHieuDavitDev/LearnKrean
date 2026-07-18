import { useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faCheck,
  faCheckCircle,
  faClock,
  faEllipsis,
  faPlay,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import {
  getCategoryLabel,
  getQaById,
  QA_CATEGORIES,
  type QaComment,
} from '../../data/qa'
import './QaDetail.css'

type QaDetailProps = {
  questionId: number
  onBack: () => void
}

type CommentRowProps = {
  comment: QaComment
  nested?: boolean
}

function CommentRow({ comment, nested = false }: CommentRowProps) {
  const [liked, setLiked] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const likeCount = comment.likes + (liked ? 1 : 0)
  const replyCount = comment.replies?.length ?? 0

  return (
    <li className={`qa-comment${nested ? ' qa-comment--nested' : ''}`}>
      <img className="qa-comment__avatar" src={comment.avatar} alt="" />
      <div className="qa-comment__body">
        <div className="qa-comment__head">
          <div className="qa-comment__author">
            <strong>{comment.author}</strong>
            {comment.verified && (
              <FontAwesomeIcon icon={faCheckCircle} className="qa-comment__verified" />
            )}
            <span>{comment.time}</span>
          </div>
          <button type="button" className="qa-comment__more" aria-label="Tùy chọn">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
        <p className="qa-comment__text">{comment.content}</p>
        <div className="qa-comment__actions">
          <button type="button" onClick={() => setLiked((v) => !v)}>
            Thích
          </button>
          <button type="button">Phản hồi</button>
          {likeCount > 0 && (
            <span className="qa-comment__likes">
              <FontAwesomeIcon icon={faThumbsUp} />
              {likeCount}
            </span>
          )}
        </div>
        {replyCount > 0 && (
          <button
            type="button"
            className="qa-comment__toggle"
            onClick={() => setShowReplies((v) => !v)}
          >
            <FontAwesomeIcon icon={faPlay} />
            {showReplies ? 'Ẩn câu trả lời' : `Xem ${replyCount} câu trả lời`}
          </button>
        )}
        {showReplies && comment.replies && (
          <ul className="qa-comment__replies">
            {comment.replies.map((reply) => (
              <CommentRow key={reply.id} comment={reply} nested />
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export function QaDetail({ questionId, onBack }: QaDetailProps) {
  const question = getQaById(questionId)
  const [draft, setDraft] = useState('')
  const [localComments, setLocalComments] = useState<QaComment[]>(
    () => getQaById(questionId)?.comments ?? [],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [questionId])

  const cat = useMemo(
    () => (question ? QA_CATEGORIES.find((c) => c.id === question.category) : undefined),
    [question],
  )

  if (!question) {
    return (
      <div className="qa-detail qa-detail--empty">
        <p>Không tìm thấy câu hỏi.</p>
        <button type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    )
  }

  const commentCount = localComments.reduce(
    (sum, c) => sum + 1 + (c.replies?.length ?? 0),
    0,
  )

  const submitComment = () => {
    const text = draft.trim()
    if (!text) return
    setLocalComments((prev) => [
      {
        id: Date.now(),
        author: 'Bạn',
        avatar: 'https://i.pravatar.cc/40?img=8',
        time: 'Vừa xong',
        content: text,
        likes: 0,
      },
      ...prev,
    ])
    setDraft('')
  }

  return (
    <div className="qa-detail">
      <div className="qa-detail__layout">
        <div className="qa-detail__main">
          <nav className="qa-detail__crumb" aria-label="Breadcrumb">
            <button type="button" onClick={onBack}>
              Hỏi và đáp
            </button>
            <span>/</span>
            <span>{question.title}</span>
          </nav>

          <h1 className="qa-detail__title">{question.title}</h1>

          <div className="qa-detail__tags">
            <span className="qa-detail__course">CHỦ ĐỀ {question.courseTag}</span>
            <span className={`qa-detail__status qa-detail__status--${question.status}`}>
              {question.status === 'resolved' ? (
                <>
                  <FontAwesomeIcon icon={faCheck} /> Đã giải quyết
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faClock} /> Chờ trả lời
                </>
              )}
            </span>
          </div>

          <p className="qa-detail__meta">
            <strong>{question.author}</strong> đã đăng trong{' '}
            <strong>{getCategoryLabel(question.category)}</strong>
          </p>

          <article className="qa-detail__card">
            <header className="qa-detail__card-head">
              <img src={question.avatar} alt="" />
              <div>
                <strong>{question.author}</strong>
                <span>{question.timeAgo}</span>
              </div>
              <button type="button" className="qa-detail__more" aria-label="Tùy chọn">
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </header>
            <p className="qa-detail__content">{question.content}</p>
            {question.attachments?.map((src) => (
              <img key={src} className="qa-detail__attach" src={src} alt="Đính kèm" />
            ))}
          </article>

          <section className="qa-detail__comments" aria-label="Bình luận">
            <div className="qa-detail__composer">
              <img src="https://i.pravatar.cc/40?img=8" alt="" />
              <input
                type="text"
                placeholder="Nhập bình luận mới của bạn"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitComment()
                }}
                aria-label="Nhập bình luận"
              />
              <button type="button" onClick={submitComment} disabled={!draft.trim()}>
                Gửi
              </button>
            </div>

            <div className="qa-detail__comments-head">
              <strong>{commentCount} bình luận</strong>
              <span>Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé</span>
            </div>

            <ul className="qa-detail__comment-list">
              {localComments.map((comment) => (
                <CommentRow key={comment.id} comment={comment} />
              ))}
            </ul>

            {localComments.length === 0 && (
              <p className="qa-detail__empty-comments">Chưa có bình luận. Hãy là người đầu tiên!</p>
            )}
          </section>
        </div>

        <aside className="qa-detail__aside">
          <div className="qa-detail__aside-block">
            <h2>Danh mục</h2>
            <p>
              <FontAwesomeIcon icon={cat?.icon ?? faBookOpen} />
              {getCategoryLabel(question.category)}
            </p>
          </div>
          <div className="qa-detail__aside-block">
            <h2>Bài học</h2>
            <p>{question.lesson}</p>
          </div>
          <div className="qa-detail__aside-block">
            <h2>{question.participants.length} người tham gia</h2>
            <div className="qa-detail__participants">
              {question.participants.map((src) => (
                <img key={src} src={src} alt="" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
