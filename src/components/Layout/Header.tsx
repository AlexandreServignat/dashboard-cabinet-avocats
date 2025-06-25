import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Settings, Bell, User, Search } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * Composant Header avec branding, recherche et actions utilisateur
 * Design glassmorphism avec notifications et profil utilisateur
 */
function Header() {
  const currentDate = new Date()
  const formattedDate = format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })

  return (
    <header 
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/20"
      role="banner"
    >
      <div className="container-dashboard">
        <div className="flex items-center justify-between py-4">
          {/* Section gauche - Titre et date */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold gradient-text">
                Dashboard Analytics
              </h1>
              <div className="flex items-center mt-1 text-sm text-slate-600">
                <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                <time dateTime={currentDate.toISOString()}>
                  {formattedDate}
                </time>
              </div>
            </div>
          </div>

          {/* Section centre - Barre de recherche */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" 
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Rechercher une matière, un client..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/60 border border-white/20 rounded-xl
                         placeholder-slate-400 text-slate-900 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                         transition-all duration-200"
                aria-label="Recherche globale"
              />
            </div>
          </div>

          {/* Section droite - Actions utilisateur */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl bg-white/60 border border-white/20 
                       hover:bg-white/80 transition-all duration-200 group"
              aria-label="Notifications"
              aria-describedby="notifications-tooltip"
            >
              <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
              
              {/* Badge de notification */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full
                             border-2 border-white" 
                    aria-hidden="true" />
              
              {/* Tooltip */}
              <div 
                id="notifications-tooltip"
                className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs 
                         rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         pointer-events-none whitespace-nowrap"
                role="tooltip"
              >
                3 nouvelles notifications
              </div>
            </motion.button>

            {/* Paramètres */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-white/60 border border-white/20 
                       hover:bg-white/80 transition-all duration-200 group"
              aria-label="Paramètres"
            >
              <Settings className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
            </motion.button>

            {/* Profil utilisateur */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 p-2 rounded-xl bg-white/60 border border-white/20 
                       hover:bg-white/80 transition-all duration-200 group"
              aria-label="Profil utilisateur"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg 
                            flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-slate-900 group-hover:text-slate-800">
                  Analyste
                </div>
                <div className="text-xs text-slate-500 group-hover:text-slate-600">
                  Cabinet Principal
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Barre de recherche mobile */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" 
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/60 border border-white/20 rounded-xl
                     placeholder-slate-400 text-slate-900 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                     transition-all duration-200"
            aria-label="Recherche globale mobile"
          />
        </div>
      </div>
    </header>
  )
}

export default Header