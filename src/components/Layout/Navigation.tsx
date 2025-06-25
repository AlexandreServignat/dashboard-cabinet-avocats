import React from 'react'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { BarChart3, TrendingUp, Brain, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigationItems = [
  {
    name: 'Performance',
    href: '/performance',
    icon: BarChart3,
    description: 'Vue d\'ensemble des KPIs et métriques',
  },
  {
    name: 'Analyse',
    href: '/analyse',
    icon: TrendingUp,
    description: 'Analyse approfondie par matière',
  },
  {
    name: 'Prédictions',
    href: '/predictions',
    icon: Brain,
    description: 'Prédictions IA et recommandations',
  },
]

/**
 * Composant Navigation avec design glassmorphism
 * Support mobile avec overlay et navigation au clavier
 */
function Navigation() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Bouton burger mobile */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl glass-card lg:hidden"
        aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-slate-700" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700" />
        )}
      </button>

      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Navigation principale */}
      <motion.nav
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : '-100%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className={`
          fixed lg:relative top-0 left-0 h-full w-72 bg-white/80 backdrop-blur-xl 
          border-r border-white/20 z-50 lg:z-auto lg:translate-x-0 lg:w-64
          ${isMobileMenuOpen ? 'shadow-2xl' : ''}
        `}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo et titre */}
          <div className="mb-8 pt-12 lg:pt-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-600">
                  Cabinet d'Avocats
                </p>
              </div>
            </div>
          </div>

          {/* Menu de navigation */}
          <div className="flex-1">
            <ul className="space-y-2" role="list">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={({ isActive }) => `
                        group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl
                        transition-all duration-200 ease-in-out
                        ${isActive 
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                      aria-describedby={`nav-desc-${item.name.toLowerCase()}`}
                    >
                      <Icon 
                        className={`w-5 h-5 mr-3 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                        aria-hidden="true"
                      />
                      
                      <div className="flex-1">
                        <div className="font-medium">
                          {item.name}
                        </div>
                        <div 
                          id={`nav-desc-${item.name.toLowerCase()}`}
                          className={`text-xs mt-0.5 ${
                            isActive ? 'text-primary-100' : 'text-slate-500 group-hover:text-slate-600'
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>

                      {/* Indicateur actif */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary-500 rounded-xl -z-10"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer de navigation */}
          <div className="pt-6 border-t border-slate-200/50">
            <div className="text-xs text-slate-500 text-center">
              <div className="font-medium text-slate-600">
                Analytics Dashboard
              </div>
              <div className="mt-1">
                Version 1.0.0
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation