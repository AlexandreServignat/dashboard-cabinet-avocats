import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

/**
 * Error Boundary avec interface utilisateur et retry automatique
 * Capture les erreurs React et propose des actions de récupération
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log l'erreur pour le monitoring
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Ici on pourrait envoyer l'erreur à un service de monitoring externe
    // Exemple: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // sendErrorToMonitoring(error, errorInfo)
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleRetry = () => {
    this.resetError()
    // Optionnel: recharger la page après un délai
    this.retryTimeoutId = setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props
      
      if (Fallback) {
        return <Fallback error={this.state.error} resetError={this.resetError} />
      }

      return (
        <DefaultErrorFallback 
          error={this.state.error} 
          resetError={this.resetError}
          onRetry={this.handleRetry}
        />
      )
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error?: Error
  resetError: () => void
  onRetry: () => void
}

/**
 * Interface par défaut pour les erreurs avec design glassmorphism
 */
function DefaultErrorFallback({ error, resetError, onRetry }: DefaultErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="glass-card p-8 text-center">
          {/* Icône d'erreur */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </motion.div>

          {/* Titre */}
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Une erreur s'est produite
          </h1>

          {/* Description */}
          <p className="text-slate-600 mb-6 leading-relaxed">
            Désolé, quelque chose s'est mal passé. Nos équipes ont été notifiées 
            et travaillent sur une solution.
          </p>

          {/* Détails de l'erreur en développement */}
          {isDevelopment && error && (
            <motion.details
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-left"
            >
              <summary className="cursor-pointer font-medium text-red-800 mb-2">
                Détails de l'erreur (développement)
              </summary>
              <div className="space-y-2">
                <div>
                  <strong className="text-red-700">Message:</strong>
                  <pre className="text-xs text-red-600 whitespace-pre-wrap mt-1">
                    {error.message}
                  </pre>
                </div>
                <div>
                  <strong className="text-red-700">Stack trace:</strong>
                  <pre className="text-xs text-red-600 whitespace-pre-wrap mt-1 max-h-32 overflow-auto">
                    {error.stack}
                  </pre>
                </div>
              </div>
            </motion.details>
          )}

          {/* Actions */}
          <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetError}
              className="btn-secondary w-full sm:w-auto"
            >
              Réessayer
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRetry}
              className="btn-primary w-full sm:w-auto inline-flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Recharger la page
            </motion.button>
          </div>

          {/* Informations de contact */}
          <div className="mt-8 pt-6 border-t border-slate-200/50">
            <p className="text-sm text-slate-500">
              Si le problème persiste, contactez l'équipe technique avec le code d'erreur : 
              <code className="ml-1 px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-xs">
                ERR_{Date.now()}
              </code>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ErrorBoundary