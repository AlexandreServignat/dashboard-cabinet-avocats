import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

// Lazy loading des pages pour optimisation des performances
const PerformancePage = React.lazy(() => import('./pages/Performance/PerformancePage'))
const AnalysePage = React.lazy(() => import('./pages/Analyse/AnalysePage'))
const PredictionsPage = React.lazy(() => import('./pages/Predictions/PredictionsPage'))

// Configuration des animations de transition entre pages
const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

// Composant de fallback pour le chargement des pages
function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Chargement de la page">
      <LoadingSpinner size="lg" />
      <span className="sr-only">Chargement de la page en cours...</span>
    </div>
  )
}

// Wrapper pour les animations de page
interface AnimatedPageProps {
  children: React.ReactNode
}

function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

// Composant principal de l'application
function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Layout>
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                {/* Redirection par défaut vers la page Performance */}
                <Route path="/" element={<Navigate to="/performance" replace />} />
                
                {/* Page Performance Globale */}
                <Route 
                  path="/performance" 
                  element={
                    <AnimatedPage>
                      <PerformancePage />
                    </AnimatedPage>
                  } 
                />
                
                {/* Page Analyse Approfondie */}
                <Route 
                  path="/analyse" 
                  element={
                    <AnimatedPage>
                      <AnalysePage />
                    </AnimatedPage>
                  } 
                />
                
                {/* Page Prédictions & IA */}
                <Route 
                  path="/predictions" 
                  element={
                    <AnimatedPage>
                      <PredictionsPage />
                    </AnimatedPage>
                  } 
                />
                
                {/* Route 404 - Page non trouvée */}
                <Route 
                  path="*" 
                  element={
                    <AnimatedPage>
                      <NotFoundPage />
                    </AnimatedPage>
                  } 
                />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </Layout>
      </div>
    </ErrorBoundary>
  )
}

// Composant pour la page 404
function NotFoundPage() {
  return (
    <div className="container-dashboard py-16">
      <div className="text-center">
        <div className="mb-8">
          <svg 
            className="w-24 h-24 mx-auto text-slate-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.832-6.127 2.209A7.962 7.962 0 014.5 15c0-4.418 3.582-8 8-8s8 3.582 8 8a7.962 7.962 0 01-1.373 2.209z" 
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Page non trouvée
        </h1>
        
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={() => window.history.back()}
            className="btn-secondary w-full sm:w-auto"
            aria-label="Retourner à la page précédente"
          >
            ← Retour
          </button>
          
          <a
            href="/performance"
            className="btn-primary w-full sm:w-auto inline-block text-center"
            aria-label="Aller au tableau de bord principal"
          >
            🏠 Tableau de bord
          </a>
        </div>
        
        {/* Liens de navigation rapide */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-sm font-medium text-slate-900 mb-4">
            Navigation rapide
          </h2>
          
          <nav className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-md mx-auto">
            <a
              href="/performance"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors text-center group"
            >
              <div className="text-primary-500 mb-2">
                📊
              </div>
              <div className="text-sm font-medium text-slate-900 group-hover:text-primary-600">
                Performance
              </div>
            </a>
            
            <a
              href="/analyse"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors text-center group"
            >
              <div className="text-primary-500 mb-2">
                🔍
              </div>
              <div className="text-sm font-medium text-slate-900 group-hover:text-primary-600">
                Analyse
              </div>
            </a>
            
            <a
              href="/predictions"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors text-center group"
            >
              <div className="text-primary-500 mb-2">
                🤖
              </div>
              <div className="text-sm font-medium text-slate-900 group-hover:text-primary-600">
                Prédictions
              </div>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default App