import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, FileText, Target } from 'lucide-react'

/**
 * Page Performance Globale avec KPIs et métriques principales
 * Visualisation des données de performance du cabinet
 */
function PerformancePage() {
  // Données mockées pour la démonstration
  const kpis = [
    {
      title: 'Chiffre d\'affaires total',
      value: '3,17 Md€',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'CA total depuis 2005',
    },
    {
      title: 'Nombre de factures',
      value: '3,6M',
      change: '+8.2%',
      trend: 'up', 
      icon: FileText,
      description: 'Total des factures émises',
    },
    {
      title: 'Ticket moyen',
      value: '938€',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      description: 'Montant moyen par facture',
    },
    {
      title: 'Croissance 2024',
      value: '363M€',
      change: '+5.8%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Performance année en cours',
    },
  ]

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
            Performance Globale
          </h1>
          <p className="text-lg text-slate-600">
            Vue d'ensemble des métriques et indicateurs clés de performance
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <select className="input-primary">
            <option>Année en cours</option>
            <option>12 derniers mois</option>
            <option>Comparaison N/N-1</option>
          </select>
          
          <button className="btn-primary">
            Exporter
          </button>
        </div>
      </div>

      {/* Grille des KPIs */}
      <div className="grid-dashboard">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 hover-lift"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    ${kpi.trend === 'up' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                    }
                  `}>
                    <kpi.icon className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-600">
                      {kpi.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {kpi.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-slate-900">
                    {kpi.value}
                  </div>
                  
                  <div className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${kpi.trend === 'up' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }
                  `}>
                    <TrendingUp 
                      className={`w-3 h-3 mr-1 ${
                        kpi.trend === 'down' ? 'transform rotate-180' : ''
                      }`} 
                    />
                    {kpi.change}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section graphiques */}
      <div className="grid-dashboard-wide">
        {/* Graphique principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Évolution du Chiffre d'Affaires
            </h3>
            
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs rounded-lg bg-primary-100 text-primary-700">
                Mensuel
              </button>
              <button className="px-3 py-1 text-xs rounded-lg text-slate-600 hover:bg-slate-100">
                Trimestriel
              </button>
              <button className="px-3 py-1 text-xs rounded-lg text-slate-600 hover:bg-slate-100">
                Annuel
              </button>
            </div>
          </div>
          
          {/* Placeholder pour le graphique */}
          <div className="aspect-chart bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600">
                Graphique d'évolution temporelle
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Intégration Recharts en cours
              </p>
            </div>
          </div>
        </motion.div>

        {/* Top matières */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Top 5 Matières par CA
          </h3>
          
          <div className="space-y-4">
            {[
              { name: 'Droit des sociétés', value: '1,35 Md€', percent: 42.6 },
              { name: 'Approbations', value: '557 M€', percent: 17.6 },
              { name: 'Droit social', value: '548 M€', percent: 17.3 },
              { name: 'Droit commercial', value: '296 M€', percent: 9.4 },
              { name: 'Droit fiscal', value: '171 M€', percent: 5.4 },
            ].map((matiere, index) => (
              <div key={matiere.name} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">
                      {matiere.name}
                    </span>
                    <span className="text-sm text-slate-600">
                      {matiere.value}
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matiere.percent}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      className="bg-gradient-to-r from-primary-500 to-blue-600 h-2 rounded-full"
                    />
                  </div>
                  
                  <div className="text-xs text-slate-500 mt-1">
                    {matiere.percent}% du CA total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Insights Clés
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-blue-900 mb-2">
              📈 Croissance forte
            </h4>
            <p className="text-sm text-blue-800">
              Le droit des sociétés représente 42,6% du CA total avec 1,35 Md€
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-medium text-green-900 mb-2">
              💡 Opportunité
            </h4>
            <p className="text-sm text-green-800">
              Le droit informatique a un ticket moyen élevé (3 581€)
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-xl">
            <h4 className="font-medium text-orange-900 mb-2">
              ⚠️ Attention
            </h4>
            <p className="text-sm text-orange-800">
              Légère baisse du ticket moyen (-2,1%) à surveiller
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PerformancePage