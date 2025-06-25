/**
 * Types de données pour les factures et analytics du cabinet d'avocats
 */

// Types de base pour les données ClickHouse
export interface FactureData {
  readonly row_id: number | null;
  readonly cabinet_id: string;
  readonly produit: string | null;
  readonly localisation: string | null;
  readonly numero: string | null;
  readonly date: Date | null;
  readonly is_multi_dossier: boolean | null;
  readonly montant_ht: number;
  readonly montant_ttc: number;
  readonly matieres: string | null;
  readonly sous_matieres: string | null;
}

// Types pour les métriques et KPIs
export interface KPIMetrics {
  readonly ca_total_ht: number;
  readonly ca_total_ttc: number;
  readonly nb_factures: number;
  readonly ticket_moyen: number;
  readonly evolution_vs_n1: {
    readonly absolute: number;
    readonly percentage: number;
  };
}

// Types pour les analyses par matière
export interface MatiereAnalysis {
  readonly matiere: string;
  readonly ca_ht: number;
  readonly ca_ttc: number;
  readonly nb_factures: number;
  readonly ticket_moyen: number;
  readonly part_ca_total: number;
  readonly evolution_vs_n1: number;
  readonly sous_matieres?: SousMatiereAnalysis[];
}

export interface SousMatiereAnalysis {
  readonly sous_matiere: string;
  readonly ca_ht: number;
  readonly nb_factures: number;
  readonly ticket_moyen: number;
}

// Types pour les séries temporelles
export interface TemporalData {
  readonly periode: Date;
  readonly ca_ht: number;
  readonly nb_factures: number;
  readonly ticket_moyen: number;
  readonly matiere?: string;
}

// Types pour les filtres du dashboard
export interface DashboardFilters {
  readonly periode: {
    readonly debut: Date;
    readonly fin: Date;
  };
  readonly cabinet_ids: string[];
  readonly matieres: string[];
  readonly sous_matieres: string[];
  readonly localisations: string[];
  readonly multi_dossier_only: boolean;
  readonly montant_min: number | null;
  readonly montant_max: number | null;
}

// Types pour les périodes de comparaison
export type PeriodeComparaison = 
  | 'mtd' // Month to Date
  | 'qtd' // Quarter to Date  
  | 'ytd' // Year to Date
  | 'n1'  // Année N-1
  | 'custom'; // Période personnalisée

export interface ComparaisonTemporelle {
  readonly type: PeriodeComparaison;
  readonly periode_actuelle: {
    readonly debut: Date;
    readonly fin: Date;
  };
  readonly periode_precedente: {
    readonly debut: Date;
    readonly fin: Date;
  };
}

// Types pour les prédictions IA
export interface PredictionData {
  readonly matiere: string;
  readonly periode_predite: Date;
  readonly ca_predit: number;
  readonly confidence_interval: {
    readonly min: number;
    readonly max: number;
  };
  readonly niveau_confiance: number; // 0-1
}

export interface RecommandationIA {
  readonly id: string;
  readonly type: 'opportunite' | 'risque' | 'optimisation';
  readonly titre: string;
  readonly description: string;
  readonly matiere?: string;
  readonly impact_estime: {
    readonly ca_potentiel: number;
    readonly probabilite: number;
  };
  readonly actions_recommandees: string[];
  readonly priorite: 'basse' | 'moyenne' | 'haute' | 'critique';
}

// Types pour les widgets de performance
export interface PerformanceWidget {
  readonly id: string;
  readonly titre: string;
  readonly type: 'kpi' | 'chart' | 'table' | 'heatmap';
  readonly data: unknown; // Sera typé plus spécifiquement par widget
  readonly loading: boolean;
  readonly error: string | null;
  readonly last_updated: Date;
}

// Types pour les graphiques
export interface ChartDataPoint {
  readonly label: string;
  readonly value: number;
  readonly date?: Date;
  readonly metadata?: Record<string, unknown>;
}

export interface ChartConfiguration {
  readonly type: 'line' | 'bar' | 'pie' | 'area' | 'heatmap';
  readonly title: string;
  readonly subtitle?: string;
  readonly xAxis: {
    readonly label: string;
    readonly type: 'datetime' | 'category' | 'numeric';
  };
  readonly yAxis: {
    readonly label: string;
    readonly format: 'currency' | 'number' | 'percentage';
  };
  readonly series: ChartSeries[];
}

export interface ChartSeries {
  readonly name: string;
  readonly data: ChartDataPoint[];
  readonly color?: string;
  readonly type?: 'line' | 'bar' | 'area';
}

// Types pour l'état global de l'application
export interface AppState {
  readonly user: {
    readonly id: string;
    readonly nom: string;
    readonly role: 'admin' | 'analyste' | 'utilisateur';
    readonly cabinet_access: string[];
  };
  readonly dashboard: {
    readonly filters: DashboardFilters;
    readonly active_page: 'performance' | 'analyse' | 'predictions';
    readonly loading_states: Record<string, boolean>;
  };
  readonly theme: 'light' | 'dark' | 'auto';
}

// Types pour les requêtes API
export interface APIResponse<T> {
  readonly success: boolean;
  readonly data: T;
  readonly error?: string;
  readonly metadata?: {
    readonly total_count: number;
    readonly page: number;
    readonly per_page: number;
    readonly execution_time_ms: number;
  };
}

export interface ClickHouseQueryParams {
  readonly query: string;
  readonly params?: Record<string, unknown>;
  readonly format?: 'JSON' | 'JSONCompact' | 'CSV';
}

// Types pour les événements et analytics
export interface AnalyticsEvent {
  readonly event_type: 'page_view' | 'filter_applied' | 'export_data' | 'widget_interaction';
  readonly properties: Record<string, unknown>;
  readonly timestamp: Date;
  readonly user_id: string;
}

// Types utilitaires
export type NonNullable<T> = T extends null | undefined ? never : T;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Types pour l'accessibilité
export interface AccessibilityProps {
  readonly 'aria-label'?: string;
  readonly 'aria-labelledby'?: string;
  readonly 'aria-describedby'?: string;
  readonly role?: string;
  readonly tabIndex?: number;
}

// Types pour les composants React
export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly testId?: string;
}

export interface InteractiveComponentProps extends BaseComponentProps, AccessibilityProps {
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly loading?: boolean;
}