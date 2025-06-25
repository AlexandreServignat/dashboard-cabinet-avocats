import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import Header from './Header'
import type { BaseComponentProps } from '@/types'

interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode
}

/**
 * Composant Layout principal avec navigation et header
 * Gère la structure globale de l'application avec glassmorphism
 */
function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Header principal */}
      <Header />
      
      {/* Container principal avec navigation et contenu */}
      <div className="flex flex-1">
        {/* Navigation latérale */}
        <Navigation />
        
        {/* Zone de contenu principal */}
        <main 
          className="flex-1 overflow-auto"
          role="main"
          aria-label="Contenu principal du dashboard"
        >
          <motion.div
            className="container-dashboard py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout