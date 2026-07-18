import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faPlay } from '@fortawesome/free-solid-svg-icons'
import { BRAND } from '../../brand'
import { FLASHCARD_DECKS } from '../../data/flashcards'
import './FlashcardsPage.css'

type FlashcardsPageProps = {
  onSelectDeck: (deckId: string) => void
}

export function FlashcardsPage({ onSelectDeck }: FlashcardsPageProps) {
  const totalCards = FLASHCARD_DECKS.reduce((sum, d) => sum + d.cards.length, 0)

  return (
    <div className="flashcards-page">
      <header className="flashcards-page__intro">
        <h1>Học từ vựng Flashcard</h1>
        <p>
          Luyện nhớ từ tiếng Hàn bằng thẻ ghi nhớ. Lật thẻ, nghe phát âm và đánh dấu từ đã nhớ hoặc
          cần học lại — phù hợp ôn nhanh mỗi ngày tại {BRAND.name}.
        </p>
        <div className="flashcards-page__stats">
          <span>
            <FontAwesomeIcon icon={faLayerGroup} /> {FLASHCARD_DECKS.length} bộ thẻ
          </span>
          <span>{totalCards} từ vựng</span>
        </div>
      </header>

      <div className="flashcards-page__grid">
        {FLASHCARD_DECKS.map((deck) => (
          <article key={deck.id} className="flash-deck">
            <div className="flash-deck__banner" style={{ background: deck.color }}>
              <span className="flash-deck__icon" aria-hidden="true">
                {deck.icon}
              </span>
              <span className="flash-deck__level">{deck.level}</span>
            </div>
            <div className="flash-deck__body">
              <h2>{deck.title}</h2>
              <p>{deck.description}</p>
              <div className="flash-deck__meta">
                <span>{deck.cards.length} thẻ</span>
              </div>
              <button type="button" className="flash-deck__cta" onClick={() => onSelectDeck(deck.id)}>
                <FontAwesomeIcon icon={faPlay} />
                Bắt đầu học
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
