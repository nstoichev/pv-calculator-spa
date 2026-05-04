export type ConsumptionMode = 'bill' | 'kwh';

export type Mounting = 'ground' | 'roof';

export type RoofType = 'sandwich' | 'tiles' | 'flat' | 'bitumen';

export type Orientation = 'south' | 'south_east_west' | 'east_west';

export type SystemPhase =
  | 'single_phase'
  | 'three_phase'
  | 'single_phase_hybrid'
  | 'three_phase_hybrid';

export type BatteryType = 'low_voltage' | 'high_voltage';

export type PanelWattage = 400 | 460 | 550 | 700;

export interface CalculatorInputs {
  monthlyKwh: number;
  pricePerKwh: number;
  mounting: Mounting;
  roofType: RoofType;
  orientation: Orientation;
  systemPhase: SystemPhase;
  batteryType: BatteryType;
  panelWattage: PanelWattage;
  peakSunHours: number;
}

export interface CalculatorResults {
  systemSizeKwp: number;
  panelCount: number;
  spaceM2: number;
  annualProductionKwh: number;
  monthlyAvgProductionKwh: number;
  annualSavings: number;
  monthlyProductionKwh: number[];
}
