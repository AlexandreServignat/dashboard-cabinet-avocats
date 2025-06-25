import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Configuration du QueryClient pour la gestion des données
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Durée de cache par défaut : 5 minutes
      staleTime: 5 * 60 * 1000,
      // Durée de conservation en mémoire : 10 minutes  
      gcTime: 10 * 60 * 1000,
      // Retry automatique en cas d'erreur
      retry: (failureCount, error) => {
        // Ne pas retry les erreurs 4xx (client errors)
        if (error && typeof error === 'object' && 'status' in error) {
          const status = error.status as number
          if (status >= 400 && status < 500) return false
        }
        return failureCount < 3
      },
      // Refetch automatique
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry automatique pour les mutations critiques
      retry: 1,
    },
  },
})

// Vérification de la compatibilité du navigateur
function checkBrowserSupport(): boolean {
  // Vérifier le support du backdrop-filter pour glassmorphism
  const testElement = document.createElement('div')
  testElement.style.backdropFilter = 'blur(10px)'
  const supportsBackdropFilter = testElement.style.backdropFilter !== ''
  
  // Vérifier le support des CSS custom properties
  const supportsCustomProperties = window.CSS && CSS.supports('color', 'var(--test)')
  
  // Vérifier le support des CSS Grid
  const supportsGrid = CSS.supports('display', 'grid')
  
  return supportsBackdropFilter && supportsCustomProperties && supportsGrid
}

// Fallback pour navigateurs non supportés
function UnsupportedBrowserFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Navigateur non compatible
        </h1>
        <p className="text-slate-600 mb-4">
          Cette application nécessite un navigateur moderne pour fonctionner correctement.
        </p>
        <p className="text-sm text-slate-500">
          Veuillez utiliser une version récente de Chrome, Firefox, Safari ou Edge.
        </p>
      </div>
    </div>
  )
}

// Configuration de l'observateur de performance
function setupPerformanceObserver(): void {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log des Core Web Vitals pour monitoring
        if (entry.entryType === 'largest-contentful-paint') {
          console.debug('LCP:', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          console.debug('FID:', entry.processingStart - entry.startTime)
        }
      }
    })
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
    } catch (error) {
      console.warn('Performance observer not fully supported:', error)
    }
  }
}

// Gestionnaire d'erreurs global
function setupGlobalErrorHandling(): void {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    // Ici on pourrait envoyer l'erreur à un service de monitoring
  })
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    // Ici on pourrait envoyer l'erreur à un service de monitoring
  })
}

// Fonction principale de rendu
function renderApp(): void {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Root element not found')
  }
  
  // Vérifier la compatibilité du navigateur
  if (!checkBrowserSupport()) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<UnsupportedBrowserFallback />)
    return
  }
  
  // Configuration des observateurs et gestionnaires
  setupPerformanceObserver()
  setupGlobalErrorHandling()
  
  // Rendu de l'application
  const root = ReactDOM.createRoot(rootElement)
  
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

// Démarrage de l'application
renderApp()

// Hot Module Replacement pour le développement
if (import.meta.hot) {
  import.meta.hot.accept()
}