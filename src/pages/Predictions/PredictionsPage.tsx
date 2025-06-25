import React from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, Target, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react'

/**
 * Page Prédictions & Conseils IA
 * Modèles prédictifs et recommandations stratégiques générées par IA
 */
function PredictionsPage() {
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
            Prédictions & Conseils IA
          </h1>
          <p className="text-lg text-slate-600">
            Modèles prédictifs et recommandations stratégiques pour optimiser la performance
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <select className="input-primary">
            <option>Horizon 3 mois</option>
            <option>Horizon 6 mois</option>
            <option>Horizon 12 mois</option>
          </select>
          
          <button className="btn-primary inline-flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            Actualiser l'IA
          </button>
        </div>
      </div>

      {/* Prédictions de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prédictions CA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Prédictions de Chiffre d'Affaires
              </h3>
              <p className="text-sm text-slate-600">
                Modèle ARIMA + Machine Learning
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Q3 2024 (Juillet-Septembre)</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">95% confiance</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                92-98 M€
              </div>
              <div className="text-sm text-green-600 font-medium">
                +8.5% vs Q3 2023
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { matiere: 'Droit des sociétés', predicted: '41 M€', confidence: 92 },
                { matiere: 'Droit social', predicted: '18 M€', confidence: 88 },
                { matiere: 'Droit commercial', predicted: '12 M€', confidence: 85 },
              ].map((pred) => (
                <div key={pred.matiere} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">{pred.matiere}</div>
                    <div className="text-sm text-slate-600">{pred.predicted} prédit</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Confiance</div>
                    <div className="font-medium text-slate-700">{pred.confidence}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Détection d'anomalies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Détection d'Anomalies
              </h3>
              <p className="text-sm text-slate-600">
                Alertes automatiques et patterns atypiques
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-orange-900 mb-1">
                    Baisse inhabituelle - Droit fiscal
                  </h4>
                  <p className="text-sm text-orange-800">
                    Volume de factures en baisse de 25% ce mois vs moyenne 6 mois
                  </p>
                  <div className="mt-2 text-xs text-orange-700">
                    Détectée le 20 juin 2024
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-900 mb-1">
                    Pattern inhabituel - Lyon
                  </h4>
                  <p className="text-sm text-yellow-800">
                    Pic d'activité anormal en droit commercial (+45%)
                  </p>
                  <div className="mt-2 text-xs text-yellow-700">
                    Détectée le 18 juin 2024
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-900 mb-1">
                    Performance normale
                  </h4>
                  <p className="text-sm text-green-800">
                    Droit des sociétés dans la fourchette attendue
                  </p>
                  <div className="mt-2 text-xs text-green-700">
                    Vérifiée le 24 juin 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommandations stratégiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Recommandations Stratégiques IA
            </h3>
            <p className="text-sm text-slate-600">
              Actions prioritaires pour optimiser les performances
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Opportunités de croissance */}
          <div>
            <h4 className="font-medium text-slate-900 mb-4 flex items-center">
              <Target className="w-4 h-4 mr-2 text-green-600" />
              Opportunités de Croissance
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-green-900">
                    Développer le Droit Informatique
                  </h5>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Haute priorité
                  </span>
                </div>
                <p className="text-sm text-green-800 mb-3">
                  Ticket moyen élevé (3 581€) mais volume faible. Potentiel de +15M€ de CA.
                </p>
                <div className="text-xs text-green-700">
                  <strong>Actions:</strong> Formation équipe, marketing ciblé, partenariats tech
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-blue-900">
                    Expansion géographique Marseille
                  </h5>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Moyenne priorité
                  </span>
                </div>
                <p className="text-sm text-blue-800 mb-3">
                  Sous-représentation (15% vs potentiel de 25%). Opportunité +60M€.
                </p>
                <div className="text-xs text-blue-700">
                  <strong>Actions:</strong> Recrutement local, ouverture bureaux, communication
                </div>
              </div>
            </div>
          </div>

          {/* Optimisations */}
          <div>
            <h4 className="font-medium text-slate-900 mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
              Optimisations Recommandées
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-orange-900">
                    Améliorer ticket moyen Approbations
                  </h5>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                    Impact élevé
                  </span>
                </div>
                <p className="text-sm text-orange-800 mb-3">
                  Ticket moyen faible (525€) sur gros volume. +10% = +55M€ de CA.
                </p>
                <div className="text-xs text-orange-700">
                  <strong>Actions:</strong> Révision tarifs, bundling services, upselling
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-purple-900">
                    Fidélisation clients Droit fiscal
                  </h5>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    Urgence
                  </span>
                </div>
                <p className="text-sm text-purple-800 mb-3">
                  Baisse de 25% détectée. Risque de perte de 43M€ annuels.
                </p>
                <div className="text-xs text-purple-700">
                  <strong>Actions:</strong> Audit client, amélioration service, négociation
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tableau de bord IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Score de Performance IA
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Score Global', value: 8.2, max: 10, color: 'green' },
            { label: 'Diversification', value: 6.5, max: 10, color: 'orange' },
            { label: 'Croissance', value: 7.8, max: 10, color: 'blue' },
            { label: 'Rentabilité', value: 9.1, max: 10, color: 'purple' },
          ].map((score) => (
            <div key={score.label} className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {score.value}/{score.max}
              </div>
              <div className="text-sm text-slate-600 mb-3">
                {score.label}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(score.value / score.max) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-2 rounded-full ${
                    score.color === 'green' ? 'bg-green-500' :
                    score.color === 'orange' ? 'bg-orange-500' :
                    score.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PredictionsPage