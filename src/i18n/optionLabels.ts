import type {
  BatteryType,
  Mounting,
  Orientation,
  RoofType,
  SystemPhase,
} from '../calculator/types';
import type { MessageKey } from './messages';

export const MOUNTING_LABEL_KEYS: Record<Mounting, MessageKey> = {
  ground: 'mounting_ground',
  roof: 'mounting_roof',
};

export const ROOF_LABEL_KEYS: Record<RoofType, MessageKey> = {
  tiles: 'roof_tiles',
  sandwich: 'roof_sandwich',
  flat: 'roof_flat',
  bitumen: 'roof_bitumen',
};

export const ORIENTATION_LABEL_KEYS: Record<Orientation, MessageKey> = {
  south: 'orientation_south',
  south_east_west: 'orientation_se_sw',
  east_west: 'orientation_ew',
};

export const SYSTEM_PHASE_LABEL_KEYS: Record<SystemPhase, MessageKey> = {
  single_phase: 'phase_single_phase',
  three_phase: 'phase_three_phase',
  single_phase_hybrid: 'phase_single_hybrid',
  three_phase_hybrid: 'phase_three_hybrid',
};

export const BATTERY_LABEL_KEYS: Record<BatteryType, MessageKey> = {
  low_voltage: 'battery_low_voltage',
  high_voltage: 'battery_high_voltage',
};
