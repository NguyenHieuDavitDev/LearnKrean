import { useState } from 'react'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { MobileNav } from './components/layout/MobileNav'
import { Footer } from './components/layout/Footer'
import { HomePage } from './components/home/HomePage'
import { AboutPage } from './components/about'
import { ArticlesPage, ArticleDetail } from './components/articles'
import { RoadmapPage, RoadmapDetail } from './components/roadmap'
import { QaPage, QaDetail } from './components/qa'
import type { SearchResult } from './data/search'
import './App.css'

type Page = 'home' | 'about' | 'articles' | 'roadmap' | 'qa'

function App() {
  const [page, setPage] = useState<Page>('home')
  const [aboutScrollTo, setAboutScrollTo] = useState<'top' | 'contact'>('top')
  const [articleId, setArticleId] = useState<number | null>(null)
  const [roadmapId, setRoadmapId] = useState<string | null>(null)
  const [qaId, setQaId] = useState<number | null>(null)

  const clearContent = () => {
    setArticleId(null)
    setRoadmapId(null)
    setQaId(null)
  }

  const goHome = () => {
    clearContent()
    setPage('home')
  }

  const goAbout = (focus: 'top' | 'contact' = 'top') => {
    clearContent()
    setAboutScrollTo(focus)
    setPage('about')
  }

  const goArticles = () => {
    clearContent()
    setPage('articles')
  }

  const goRoadmap = () => {
    clearContent()
    setPage('roadmap')
  }

  const goQa = () => {
    clearContent()
    setPage('qa')
  }

  const selectArticle = (id: number) => {
    setRoadmapId(null)
    setQaId(null)
    setArticleId(id)
  }

  const selectRoadmap = (id: string) => {
    setArticleId(null)
    setQaId(null)
    setRoadmapId(id)
    setPage('roadmap')
  }

  const selectQa = (id: number) => {
    setArticleId(null)
    setRoadmapId(null)
    setQaId(id)
    setPage('qa')
  }

  const handleSearchResult = (result: SearchResult) => {
    clearContent()
    if (result.kind === 'article') {
      selectArticle(Number(result.targetId))
      setPage('articles')
      return
    }
    if (result.kind === 'qa') {
      selectQa(Number(result.targetId))
      return
    }
    if (result.kind === 'roadmap') {
      selectRoadmap(String(result.targetId))
    }
  }

  const hasDetail = articleId !== null || roadmapId !== null || qaId !== null

  const activeNav =
    qaId !== null
      ? 'qa'
      : roadmapId !== null
        ? 'roadmap'
        : hasDetail
          ? null
          : page

  const showBack = hasDetail || page !== 'home'

  const onBack = () => {
    if (articleId !== null) {
      setArticleId(null)
      setPage('articles')
      return
    }
    if (roadmapId !== null) {
      setRoadmapId(null)
      setPage('roadmap')
      return
    }
    if (qaId !== null) {
      setQaId(null)
      setPage('qa')
      return
    }
    goHome()
  }

  return (
    <div className="app">
      <Header
        showBack={showBack}
        onBack={onBack}
        onHome={goHome}
        onSearchResult={handleSearchResult}
      />
      <Sidebar
        active={activeNav ?? 'home'}
        onNavigateHome={goHome}
        onNavigateArticles={goArticles}
        onNavigateRoadmap={goRoadmap}
        onNavigateQa={goQa}
        onNavigateAbout={() => goAbout('top')}
      />
      <MobileNav
        active={activeNav ?? 'home'}
        onNavigateHome={goHome}
        onNavigateArticles={goArticles}
        onNavigateRoadmap={goRoadmap}
        onNavigateQa={goQa}
        onNavigateAbout={() => goAbout('top')}
      />
      <main className="app__main">
        {articleId !== null ? (
          <ArticleDetail
            key={articleId}
            articleId={articleId}
            onBack={goArticles}
            onSelectArticle={selectArticle}
          />
        ) : roadmapId !== null ? (
          <RoadmapDetail
            key={roadmapId}
            roadmapId={roadmapId}
            onBack={goRoadmap}
            onSelectRoadmap={selectRoadmap}
          />
        ) : qaId !== null ? (
          <QaDetail key={qaId} questionId={qaId} onBack={goQa} />
        ) : page === 'about' ? (
          <AboutPage key={aboutScrollTo} onGoRoadmap={goRoadmap} scrollTo={aboutScrollTo} />
        ) : page === 'articles' ? (
          <ArticlesPage onSelectArticle={selectArticle} />
        ) : page === 'roadmap' ? (
          <RoadmapPage onSelectRoadmap={selectRoadmap} />
        ) : page === 'qa' ? (
          <QaPage onSelectQuestion={selectQa} />
        ) : (
          <HomePage
            onGoArticles={goArticles}
            onSelectArticle={selectArticle}
            onGoRoadmap={goRoadmap}
            onGoAbout={() => goAbout('top')}
          />
        )}
        <Footer
          onNavigateHome={goHome}
          onNavigateAbout={() => goAbout('top')}
          onNavigateContact={() => goAbout('contact')}
          onNavigateArticles={goArticles}
          onNavigateRoadmap={goRoadmap}
          onNavigateQa={goQa}
        />
      </main>
    </div>
  )
}

export default App
