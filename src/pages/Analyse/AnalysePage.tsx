import React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, BarChart3, PieChart } from 'lucide-react'

/**
 * Page Analyse Approfondie avec exploration des données détaillées
 * Drill-down par matière, sous-matière et analyses avancées
 */
function AnalysePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* En-tête de page */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Analyse Approfondie
          </h1>
          <p className="text-lg text-slate-600">
            Exploration détaillée des données par matière et segmentation avancée
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <button className="btn-secondary inline-flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres avancés
          </button>
          
          <button className="btn-primary">
            Créer un rapport
          </button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Rechercher par matière, sous-matière, localisation..."
                className="input-primary pl-10"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <select className="input-primary">
              <option>Toutes les matières</option>
              <option>Droit des sociétés</option>
              <option>Droit social</option>
              <option>Droit commercial</option>
            </select>
            
            <select className="input-primary">
              <option>Toutes les localisations</option>
              <option>Paris</option>
              <option>Lyon</option>
              <option>Marseille</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grille d'analyse */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Matrice de performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="xl:col-span-2 glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Matrice de Performance par Matière
          </h3>
          
          <div className="aspect-chart bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600">
                Matrice CA vs Volume par matière
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Graphique scatter plot interactif
              </p>
            </div>
          </div>
        </motion.div>

        {/* Répartition par localisation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Répartition Géographique
          </h3>
          
          <div className="aspect-square-chart bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600">
                Donut chart
              </p>
              <p className="text-xs text-slate-500">
                CA par localisation
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { ville: 'Paris', percent: 65, value: '2,06 Md€' },
              { ville: 'Lyon', percent: 20, value: '634 M€' },
              { ville: 'Marseille', percent: 15, value: '475 M€' },
            ].map((loc) => (
              <div key={loc.ville} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">{loc.ville}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-slate-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${loc.percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600 w-12 text-right">{loc.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Analyse détaillée par matière */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Analyse Détaillée par Matière
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Matière</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">CA (M€)</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">Factures</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">Ticket moyen</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">Évolution</th>
                <th className="text-center py-3 px-4 font-medium text-slate-600">Tendance</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  matiere: 'Droit des sociétés', 
                  ca: 1350, 
                  factures: 1337616, 
                  ticket: 1010, 
                  evolution: '+12.5%',
                  trend: 'up'
                },
                { 
                  matiere: 'Approbations', 
                  ca: 557, 
                  factures: 1062080, 
                  ticket: 525, 
                  evolution: '+8.2%',
                  trend: 'up'
                },
                { 
                  matiere: 'Droit social', 
                  ca: 548, 
                  factures: 593168, 
                  ticket: 924, 
                  evolution: '+15.3%',
                  trend: 'up'
                },
                { 
                  matiere: 'Droit commercial', 
                  ca: 296, 
                  factures: 259072, 
                  ticket: 1143, 
                  evolution: '+5.7%',
                  trend: 'up'
                },
                { 
                  matiere: 'Droit fiscal', 
                  ca: 171, 
                  factures: 129104, 
                  ticket: 1326, 
                  evolution: '-2.1%',
                  trend: 'down'
                },
              ].map((row) => (
                <tr key={row.matiere} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{row.matiere}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-900">
                    {row.ca.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-600">
                    {row.factures.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-600">
                    {row.ticket}€
                  </td>
                  <td className={`py-3 px-4 text-right font-medium ${
                    row.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {row.evolution}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                      row.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {row.trend === 'up' ? '↗' : '↘'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insights et recommandations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Insights d'Analyse
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-blue-900 mb-2">
              🎯 Concentration géographique
            </h4>
            <p className="text-sm text-blue-800">
              Paris concentre 65% du CA total, opportunité de diversification géographique
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-xl">
            <h4 className="font-medium text-amber-900 mb-2">
              ⚖️ Optimisation du ticket moyen
            </h4>
            <p className="text-sm text-amber-800">
              Le droit fiscal a le ticket moyen le plus élevé (1 326€) mais volume faible
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnalysePage