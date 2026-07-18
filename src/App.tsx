import { useState } from 'react'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './components/home/HomePage'
import { LearningPage, ProPage } from './components/course'
import { ArticlesPage, ArticleDetail } from './components/articles'
import { VideosPage, VideoDetail } from './components/videos'
import { RoadmapPage, RoadmapDetail } from './components/roadmap'
import { QaPage, QaDetail } from './components/qa'
import { FlashcardsPage, FlashcardStudy } from './components/flashcards'
import {
  MyCoursesPage,
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
  | 'pro'
  | 'articles'
  | 'videos'
  | 'roadmap'
  | 'qa'
  | 'flashcards'
  | 'profile'
  | 'write-blog'
  | 'my-posts'
  | 'saved-posts'
  | 'my-courses'

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
  const [khoaHocId, setKhoaHocId] = useState<number | null>(null)
  const [articleId, setArticleId] = useState<number | null>(null)
  const [videoId, setVideoId] = useState<number | null>(null)
  const [roadmapId, setRoadmapId] = useState<string | null>(null)
  const [qaId, setQaId] = useState<number | null>(null)
  const [deckId, setDeckId] = useState<string | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('personal')

  const clearContent = () => {
    setKhoaHocId(null)
    setArticleId(null)
    setVideoId(null)
    setRoadmapId(null)
    setQaId(null)
    setDeckId(null)
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

  const goPro = () => {
    clearContent()
    setPage('pro')
  }

  const goArticles = () => {
    clearContent()
    setPage('articles')
  }

  const goVideos = () => {
    clearContent()
    setPage('videos')
  }

  const goRoadmap = () => {
    clearContent()
    setPage('roadmap')
  }

  const goQa = () => {
    clearContent()
    setPage('qa')
  }

  const goFlashcards = () => {
    clearContent()
    setPage('flashcards')
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

  const goMyCourses = () => {
    clearContent()
    setPage('my-courses')
  }

  const openSettings = (tab: SettingsTab = 'personal') => {
    setSettingsTab(tab)
    setSettingsOpen(true)
  }

  const selectKhoaHoc = (id: number) => {
    setArticleId(null)
    setVideoId(null)
    setRoadmapId(null)
    setQaId(null)
    setDeckId(null)
    setKhoaHocId(id)
  }

  const selectArticle = (id: number) => {
    setKhoaHocId(null)
    setVideoId(null)
    setRoadmapId(null)
    setQaId(null)
    setDeckId(null)
    setArticleId(id)
  }

  const selectVideo = (id: number) => {
    setKhoaHocId(null)
    setArticleId(null)
    setRoadmapId(null)
    setQaId(null)
    setDeckId(null)
    setVideoId(id)
  }

  const selectRoadmap = (id: string) => {
    setKhoaHocId(null)
    setArticleId(null)
    setVideoId(null)
    setQaId(null)
    setDeckId(null)
    setRoadmapId(id)
    setPage('roadmap')
  }

  const selectQa = (id: number) => {
    setKhoaHocId(null)
    setArticleId(null)
    setVideoId(null)
    setRoadmapId(null)
    setDeckId(null)
    setQaId(id)
    setPage('qa')
  }

  const selectDeck = (id: string) => {
    setKhoaHocId(null)
    setArticleId(null)
    setVideoId(null)
    setRoadmapId(null)
    setQaId(null)
    setDeckId(id)
    setPage('flashcards')
  }

  const handleSearchResult = (result: SearchResult) => {
    clearContent()
    if (result.kind === 'course') {
      selectKhoaHoc(Number(result.targetId))
      return
    }
    if (result.kind === 'article') {
      selectArticle(Number(result.targetId))
      setPage('articles')
      return
    }
    if (result.kind === 'video') {
      selectVideo(Number(result.targetId))
      setPage('videos')
      return
    }
    if (result.kind === 'qa') {
      selectQa(Number(result.targetId))
      return
    }
    if (result.kind === 'flashcard') {
      selectDeck(String(result.targetId))
    }
  }

  const handleNotificationAction = (action: NotificationAction) => {
    clearContent()
    if (action.type === 'course') {
      selectKhoaHoc(action.id)
      return
    }
    if (action.type === 'article') {
      selectArticle(action.id)
      setPage('articles')
      return
    }
    if (action.type === 'qa') {
      selectQa(action.id)
      return
    }
    if (action.type === 'flashcard') {
      selectDeck(action.id)
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

  const hasDetail =
    khoaHocId !== null ||
    articleId !== null ||
    videoId !== null ||
    roadmapId !== null ||
    qaId !== null ||
    deckId !== null

  const accountPages = new Set<Page>([
    'profile',
    'write-blog',
    'my-posts',
    'saved-posts',
    'my-courses',
  ])

  const activeNav =
    deckId !== null
      ? 'flashcards'
      : qaId !== null
        ? 'qa'
        : hasDetail &&
            khoaHocId === null &&
            articleId === null &&
            videoId === null &&
            qaId === null
          ? 'roadmap'
          : hasDetail
            ? null
            : accountPages.has(page)
              ? page === 'my-posts' || page === 'saved-posts' || page === 'write-blog'
                ? 'articles'
                : page === 'my-courses'
                  ? 'pro'
                  : 'home'
              : page

  const showBack = hasDetail || page !== 'home'

  const onBack = () => {
    if (khoaHocId !== null) {
      setKhoaHocId(null)
      if (page === 'roadmap' || page === 'my-courses' || page === 'profile') return
      return
    }
    if (articleId !== null) {
      setArticleId(null)
      setPage('articles')
      return
    }
    if (videoId !== null) {
      setVideoId(null)
      setPage('videos')
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
    if (deckId !== null) {
      setDeckId(null)
      setPage('flashcards')
      return
    }
    if (accountPages.has(page)) {
      goHome()
      return
    }
    goHome()
  }

  if (khoaHocId !== null) {
    return (
      <LearningPage
        key={khoaHocId}
        khoaHocId={khoaHocId}
        onBack={
          page === 'pro'
            ? goPro
            : page === 'roadmap'
              ? goRoadmap
              : page === 'my-courses'
                ? goMyCourses
                : page === 'profile'
                  ? goProfile
                  : goHome
        }
      />
    )
  }

  return (
    <div className="app">
      <Header
        showBack={showBack}
        onBack={onBack}
        onHome={goHome}
        onSelectKhoaHoc={selectKhoaHoc}
        onViewMyCourses={goMyCourses}
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
        onNavigatePro={goPro}
        onNavigateArticles={goArticles}
        onNavigateVideos={goVideos}
        onNavigateRoadmap={goRoadmap}
        onNavigateQa={goQa}
        onNavigateFlashcards={goFlashcards}
      />
      <main className="app__main">
        {articleId !== null ? (
          <ArticleDetail
            key={articleId}
            articleId={articleId}
            onBack={goArticles}
            onSelectArticle={selectArticle}
          />
        ) : videoId !== null ? (
          <VideoDetail
            key={videoId}
            videoId={videoId}
            onBack={goVideos}
            onSelectVideo={selectVideo}
          />
        ) : roadmapId !== null ? (
          <RoadmapDetail
            key={roadmapId}
            roadmapId={roadmapId}
            onBack={goRoadmap}
            onSelectKhoaHoc={selectKhoaHoc}
            onSelectRoadmap={selectRoadmap}
          />
        ) : qaId !== null ? (
          <QaDetail key={qaId} questionId={qaId} onBack={goQa} />
        ) : deckId !== null ? (
          <FlashcardStudy key={deckId} deckId={deckId} onBack={goFlashcards} />
        ) : page === 'pro' ? (
          <ProPage onSelectKhoaHoc={selectKhoaHoc} onBackHome={goHome} />
        ) : page === 'articles' ? (
          <ArticlesPage onSelectArticle={selectArticle} />
        ) : page === 'videos' ? (
          <VideosPage onSelectVideo={selectVideo} />
        ) : page === 'roadmap' ? (
          <RoadmapPage onSelectRoadmap={selectRoadmap} />
        ) : page === 'qa' ? (
          <QaPage onSelectQuestion={selectQa} />
        ) : page === 'flashcards' ? (
          <FlashcardsPage onSelectDeck={selectDeck} />
        ) : page === 'profile' ? (
          <ProfilePage onSelectKhoaHoc={selectKhoaHoc} />
        ) : page === 'write-blog' ? (
          <WriteBlogPage onPublish={() => goMyPosts()} />
        ) : page === 'my-posts' ? (
          <MyPostsPage onWriteBlog={goWriteBlog} onGoArticles={goArticles} />
        ) : page === 'saved-posts' ? (
          <SavedPostsPage onGoArticles={goArticles} />
        ) : page === 'my-courses' ? (
          <MyCoursesPage onSelectKhoaHoc={selectKhoaHoc} />
        ) : (
          <HomePage
            onSelectKhoaHoc={selectKhoaHoc}
            onGoPro={goPro}
            onGoArticles={goArticles}
            onSelectArticle={selectArticle}
            onGoVideos={goVideos}
            onSelectVideo={selectVideo}
            onGoFlashcards={goFlashcards}
            onGoRoadmap={goRoadmap}
          />
        )}
        <Footer onNavigateFlashcards={goFlashcards} />
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
