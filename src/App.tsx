import { useState } from 'react'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './components/home/HomePage'
import { AboutPage } from './components/about'
import { ArticlesPage, ArticleDetail } from './components/articles'
import { RoadmapPage, RoadmapDetail } from './components/roadmap'
import { QaPage, QaDetail } from './components/qa'
import {
  MyPostsPage,
  ProfilePage,
  SavedPostsPage,
  SettingsPage,
  WriteBlogPage,
  type SettingsTab,
} from './components/account'
import { ForgotPasswordPage, LoginPage, RegisterPage } from './components/auth'
import type { SearchResult } from './data/search'
import type { NotificationAction } from './data/notifications'
import './App.css'

type Page =
  | 'home'
  | 'about'
  | 'articles'
  | 'roadmap'
  | 'qa'
  | 'profile'
  | 'write-blog'
  | 'my-posts'
  | 'saved-posts'

type AuthScreen = 'login' | 'register' | 'forgot'

function readAuth(): boolean {
  try {
    return localStorage.getItem('chth_auth') !== '0'
  } catch {
    return true
  }
}

function App() {
  const [authenticated, setAuthenticated] = useState(readAuth)
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login')
  const [page, setPage] = useState<Page>('home')
  const [aboutScrollTo, setAboutScrollTo] = useState<'top' | 'contact'>('top')
  const [articleId, setArticleId] = useState<number | null>(null)
  const [roadmapId, setRoadmapId] = useState<string | null>(null)
  const [qaId, setQaId] = useState<number | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('personal')

  const clearContent = () => {
    setArticleId(null)
    setRoadmapId(null)
    setQaId(null)
  }

  const handleLoginSuccess = () => {
    try {
      localStorage.setItem('chth_auth', '1')
    } catch {
      /* ignore */
    }
    setAuthenticated(true)
    setAuthScreen('login')
    clearContent()
    setPage('home')
  }

  const handleLogout = () => {
    try {
      localStorage.setItem('chth_auth', '0')
    } catch {
      /* ignore */
    }
    setAuthenticated(false)
    setAuthScreen('login')
    clearContent()
    setPage('home')
    setSettingsOpen(false)
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

  const goProfile = () => {
    clearContent()
    setPage('profile')
  }

  const goWriteBlog = () => {
    clearContent()
    setPage('write-blog')
  }

  const goMyPosts = () => {
    clearContent()
    setPage('my-posts')
  }

  const goSavedPosts = () => {
    clearContent()
    setPage('saved-posts')
  }

  const openSettings = (tab: SettingsTab = 'personal') => {
    setSettingsTab(tab)
    setSettingsOpen(true)
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
    }
  }

  const handleNotificationAction = (action: NotificationAction) => {
    clearContent()
    if (action.type === 'article') {
      selectArticle(action.id)
      setPage('articles')
      return
    }
    if (action.type === 'qa') {
      selectQa(action.id)
      return
    }
    if (action.type === 'settings') {
      openSettings('notifications')
      return
    }
    goHome()
  }

  if (!authenticated) {
    if (authScreen === 'register') {
      return (
        <RegisterPage onSuccess={handleLoginSuccess} onGoLogin={() => setAuthScreen('login')} />
      )
    }
    if (authScreen === 'forgot') {
      return <ForgotPasswordPage onGoLogin={() => setAuthScreen('login')} />
    }
    return (
      <LoginPage
        onSuccess={handleLoginSuccess}
        onGoRegister={() => setAuthScreen('register')}
        onGoForgot={() => setAuthScreen('forgot')}
      />
    )
  }

  const hasDetail = articleId !== null || roadmapId !== null || qaId !== null

  const accountPages = new Set<Page>(['profile', 'write-blog', 'my-posts', 'saved-posts'])

  const activeNav =
    qaId !== null
      ? 'qa'
      : roadmapId !== null
        ? 'roadmap'
        : hasDetail
          ? null
          : accountPages.has(page)
            ? page === 'my-posts' || page === 'saved-posts' || page === 'write-blog'
              ? 'articles'
              : 'home'
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
    if (accountPages.has(page) || page === 'about') {
      goHome()
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
        onProfile={goProfile}
        onWriteBlog={goWriteBlog}
        onMyPosts={goMyPosts}
        onSavedPosts={goSavedPosts}
        onSettings={() => openSettings('personal')}
        onLogout={handleLogout}
        onSearchResult={handleSearchResult}
        onNotificationAction={handleNotificationAction}
        onViewAllNotifications={() => openSettings('notifications')}
      />
      <Sidebar
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
        ) : page === 'profile' ? (
          <ProfilePage />
        ) : page === 'write-blog' ? (
          <WriteBlogPage onPublish={() => goMyPosts()} />
        ) : page === 'my-posts' ? (
          <MyPostsPage onWriteBlog={goWriteBlog} onGoArticles={goArticles} />
        ) : page === 'saved-posts' ? (
          <SavedPostsPage onGoArticles={goArticles} />
        ) : (
          <HomePage
            onGoArticles={goArticles}
            onSelectArticle={selectArticle}
            onGoRoadmap={goRoadmap}
            onGoAbout={() => goAbout('top')}
          />
        )}
        <Footer
          onNavigateAbout={() => goAbout('top')}
          onNavigateContact={() => goAbout('contact')}
        />
      </main>

      {settingsOpen && (
        <SettingsPage
          key={settingsTab}
          initialTab={settingsTab}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )
}

export default App
