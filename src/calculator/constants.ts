import type {
  BatteryType,
  Mounting,
  Orientation,
  PanelWattage,
  RoofType,
  SystemPhase,
} from './types';

export const PERFORMANCE_RATIO = 0.8;

export const ORIENTATION_FACTORS: Record<Orientation, number> = {
  south: 1.0,
  south_east_west: 0.95,
  east_west: 0.85,
};

export const ROOF_DERATES: Record<RoofType, number> = {
  flat: 0.98,
  tiles: 0.97,
  sandwich: 0.96,
  bitumen: 0.95,
};

export const GROUND_DERATE = 1.0;

// Used to calculate physical footprint. Pitched surfaces have no inter-row
// shading gap, while ground / flat-roof installs use tilted racking and
// require spacing to avoid self-shading.
export const SPACING_FACTOR_PITCHED = 1.0;
export const SPACING_FACTOR_FLAT = 1.4;

export interface PanelSpec {
  wattage: PanelWattage;
  areaM2: number;
  label: string;
}

export const PANELS: readonly PanelSpec[] = [
  { wattage: 400, areaM2: 1.95, label: '400 W' },
  { wattage: 460, areaM2: 2.2, label: '460 W' },
  { wattage: 550, areaM2: 2.58, label: '550 W' },
  { wattage: 700, areaM2: 3.12, label: '700 W' },
] as const;

// Northern Hemisphere monthly distribution of annual PV production.
// Values are percentages and sum to 100.
const MONTHLY_DISTRIBUTION_SOUTH = [
  3.5, 4.5, 7.5, 10, 12, 13, 13.5, 12.5, 9.5, 7, 4, 3,
];

export const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export function monthlyDistribution(orientation: Orientation): number[] {
  const base = MONTHLY_DISTRIBUTION_SOUTH.map((p) => p / 100);
  if (orientation === 'east_west') {
    // E/W orientations have a flatter seasonal curve: less peak in summer,
    // slightly more in winter. Pull each month toward the annual mean.
    const mean = 1 / 12;
    return base.map((v) => v * 0.85 + mean * 0.15);
  }
  return base;
}

// Self-consumption ratios for the savings model.
// Hybrid systems can shift surplus to the battery and use it after sundown,
// while grid-tied systems can only consume what is produced during the day.
export const SELF_CONSUMPTION_HYBRID = 0.85;
export const SELF_CONSUMPTION_GRID = 0.35;
export const EXPORT_PRICE_RATIO = 0.3;

export function isHybrid(phase: SystemPhase): boolean {
  return phase === 'single_phase_hybrid' || phase === 'three_phase_hybrid';
}

export function isPitchedRoof(mounting: Mounting, roofType: RoofType): boolean {
  if (mounting !== 'roof') return false;
  return roofType === 'tiles' || roofType === 'sandwich' || roofType === 'bitumen';
}

export const ROOF_TYPE_OPTIONS: { value: RoofType; label: string }[] = [
  { value: 'tiles', label: 'Tiles' },
  { value: 'sandwich', label: 'Sandwich panel' },
  { value: 'flat', label: 'Flat' },
  { value: 'bitumen', label: 'Bitumen' },
];

export const MOUNTING_OPTIONS: { value: Mounting; label: string }[] = [
  { value: 'ground', label: 'Ground' },
  { value: 'roof', label: 'Roof' },
];

export const ORIENTATION_OPTIONS: { value: Orientation; label: string }[] = [
  { value: 'south', label: 'South' },
  { value: 'south_east_west', label: 'SE / SW' },
  { value: 'east_west', label: 'E / W' },
];

export const SYSTEM_PHASE_OPTIONS: { value: SystemPhase; label: string }[] = [
  { value: 'single_phase', label: 'Single-phase' },
  { value: 'three_phase', label: 'Three-phase' },
  { value: 'single_phase_hybrid', label: 'Single-phase hybrid' },
  { value: 'three_phase_hybrid', label: 'Three-phase hybrid' },
];

export const BATTERY_OPTIONS: { value: BatteryType; label: string }[] = [
  { value: 'low_voltage', label: 'Low-voltage' },
  { value: 'high_voltage', label: 'High-voltage' },
];

export const PEAK_SUN_HOURS_RANGE = {
  min: 2.0,
  max: 6.0,
  step: 0.1,
  default: 4.5,
} as const;

export const DEFAULT_PRICE_PER_KWH = 0.15;
export const DEFAULT_MONTHLY_BILL = 45;
