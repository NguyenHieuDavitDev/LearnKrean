import { useCallback, useEffect, useState } from 'react'
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
import { applyRouteSeo } from './seo/meta'
import {
  buildPath,
  parsePath,
  routeFromAppState,
  type AppRoute,
  type Page,
} from './seo/routes'
import './App.css'

type AppState = {
  page: Page
  aboutScrollTo: 'top' | 'contact'
  articleId: number | null
  roadmapId: string | null
  qaId: number | null
}

function routeToState(route: AppRoute): AppState {
  return {
    page: route.page,
    aboutScrollTo: route.aboutScrollTo ?? 'top',
    articleId: route.articleId ?? null,
    roadmapId: route.roadmapId ?? null,
    qaId: route.qaId ?? null,
  }
}

function stateToRoute(state: AppState): AppRoute {
  return routeFromAppState(state.page, {
    aboutScrollTo: state.aboutScrollTo,
    articleId: state.articleId,
    roadmapId: state.roadmapId,
    qaId: state.qaId,
  })
}

function readRouteFromWindow(): AppRoute {
  return parsePath(window.location.pathname, window.location.hash)
}

function App() {
  const [state, setState] = useState<AppState>(() => routeToState(readRouteFromWindow()))

  const { page, aboutScrollTo, articleId, roadmapId, qaId } = state

  const syncBrowserUrl = useCallback((next: AppState, replace = false) => {
    const route = stateToRoute(next)
    const path = buildPath(route)
    const current = `${window.location.pathname}${window.location.hash}`
    if (current !== path) {
      window.history[replace ? 'replaceState' : 'pushState'](null, '', path)
    }
    applyRouteSeo(route)
  }, [])

  const navigate = useCallback(
    (next: AppState) => {
      setState(next)
      syncBrowserUrl(next)
    },
    [syncBrowserUrl],
  )

  useEffect(() => {
    applyRouteSeo(stateToRoute(state))
  }, [])

  useEffect(() => {
    const onPopState = () => {
      const next = routeToState(readRouteFromWindow())
      setState(next)
      applyRouteSeo(stateToRoute(next))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const clearContent = () => ({
    articleId: null as number | null,
    roadmapId: null as string | null,
    qaId: null as number | null,
  })

  const goHome = () => {
    navigate({ page: 'home', aboutScrollTo: 'top', ...clearContent() })
  }

  const goAbout = (focus: 'top' | 'contact' = 'top') => {
    navigate({ page: 'about', aboutScrollTo: focus, ...clearContent() })
  }

  const goArticles = () => {
    navigate({ page: 'articles', aboutScrollTo: 'top', ...clearContent() })
  }

  const goRoadmap = () => {
    navigate({ page: 'roadmap', aboutScrollTo: 'top', ...clearContent() })
  }

  const goQa = () => {
    navigate({ page: 'qa', aboutScrollTo: 'top', ...clearContent() })
  }

  const selectArticle = (id: number) => {
    navigate({
      page: 'articles',
      aboutScrollTo: 'top',
      articleId: id,
      roadmapId: null,
      qaId: null,
    })
  }

  const selectRoadmap = (id: string) => {
    navigate({
      page: 'roadmap',
      aboutScrollTo: 'top',
      articleId: null,
      roadmapId: id,
      qaId: null,
    })
  }

  const selectQa = (id: number) => {
    navigate({
      page: 'qa',
      aboutScrollTo: 'top',
      articleId: null,
      roadmapId: null,
      qaId: id,
    })
  }

  const handleSearchResult = (result: SearchResult) => {
    if (result.kind === 'article') {
      selectArticle(Number(result.targetId))
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
      goArticles()
      return
    }
    if (roadmapId !== null) {
      goRoadmap()
      return
    }
    if (qaId !== null) {
      goQa()
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
      <main className="app__main" id="main-content">
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
