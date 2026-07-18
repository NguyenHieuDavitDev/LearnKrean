import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faComments,
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {
  searchCatalog,
  searchKindLabel,
  type SearchResult,
  type SearchResultKind,
} from '../../data/search'
import './SearchBar.css'

type SearchBarProps = {
  onSelectResult: (result: SearchResult) => void
}

const KIND_ICON: Record<SearchResultKind, typeof faBookOpen> = {
  article: faBookOpen,
  qa: faComments,
}

export function SearchBar({ onSelectResult }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const results = useMemo(() => searchCatalog(query), [query])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const choose = (result: SearchResult) => {
    setOpen(false)
    setQuery('')
    onSelectResult(result)
  }

  const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter') && query.trim()) {
      setOpen(true)
      return
    }
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[activeIndex]
      if (item) choose(item)
    }
  }

  const showPanel = open && query.trim().length > 0

  return (
    <div className="search-bar" ref={rootRef}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-bar__icon" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        placeholder="Tìm bài viết, câu hỏi..."
        aria-label="Tìm kiếm"
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={showPanel}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActiveIndex(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDownInput}
      />
      {query && (
        <button
          type="button"
          className="search-bar__clear"
          aria-label="Xóa tìm kiếm"
          onClick={() => {
            setQuery('')
            setActiveIndex(0)
            inputRef.current?.focus()
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}

      {showPanel && (
        <div className="search-bar__panel" id={listId} role="listbox">
          {results.length === 0 ? (
            <p className="search-bar__empty">Không tìm thấy kết quả cho «{query.trim()}»</p>
          ) : (
            <ul className="search-bar__list">
              {results.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`search-bar__item${index === activeIndex ? ' is-active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => choose(item)}
                  >
                    <span className={`search-bar__kind search-bar__kind--${item.kind}`}>
                      <FontAwesomeIcon icon={KIND_ICON[item.kind]} />
                    </span>
                    <span className="search-bar__meta">
                      <strong>{item.title}</strong>
                      <small>
                        {searchKindLabel(item.kind)} · {item.subtitle}
                      </small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
