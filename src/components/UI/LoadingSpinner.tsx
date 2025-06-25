import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  label?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

const variantClasses = {
  primary: 'text-primary-500',
  secondary: 'text-slate-500',
  white: 'text-white',
}

/**
 * Composant LoadingSpinner avec animation fluide
 * Support des différentes tailles et variantes de couleur
 */
function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary',
  label = 'Chargement en cours',
  className = '',
  testId = 'loading-spinner'
}: LoadingSpinnerProps) {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label={label}
      data-testid={testId}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex items-center justify-center"
      >
        <Loader2 
          className={`${sizeClasses[size]} ${variantClasses[variant]}`}
          aria-hidden="true"
        />
      </motion.div>
      
      {/* Texte accessible pour les lecteurs d'écran */}
      <span className="sr-only">
        {label}
      </span>
    </div>
  )
}

export default LoadingSpinner