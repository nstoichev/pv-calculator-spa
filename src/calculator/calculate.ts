import {
  EXPORT_PRICE_RATIO,
  GROUND_DERATE,
  ORIENTATION_FACTORS,
  PANELS,
  PERFORMANCE_RATIO,
  ROOF_DERATES,
  SELF_CONSUMPTION_GRID,
  SELF_CONSUMPTION_HYBRID,
  SPACING_FACTOR_FLAT,
  SPACING_FACTOR_PITCHED,
  isHybrid,
  isPitchedRoof,
  monthlyDistribution,
} from './constants';
import type { CalculatorInputs, CalculatorResults } from './types';

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const annualConsumptionKwh = Math.max(0, inputs.monthlyKwh) * 12;

  const orientationFactor = ORIENTATION_FACTORS[inputs.orientation];
  const mountingDerate =
    inputs.mounting === 'roof' ? ROOF_DERATES[inputs.roofType] : GROUND_DERATE;

  const effectivePR = PERFORMANCE_RATIO * orientationFactor * mountingDerate;

  const panel = PANELS.find((p) => p.wattage === inputs.panelWattage) ?? PANELS[0];
  const panelKwp = panel.wattage / 1000;

  // Required system size (kWp) to cover the user's annual consumption,
  // given their site's effective performance ratio and sun hours.
  const requiredKwp =
    inputs.peakSunHours > 0
      ? annualConsumptionKwh / (inputs.peakSunHours * 365 * effectivePR)
      : 0;

  const panelCount = Math.max(1, Math.ceil(requiredKwp / panelKwp));
  const installedKwp = panelCount * panelKwp;

  const annualProductionKwh =
    installedKwp * inputs.peakSunHours * 365 * effectivePR;

  const spacingFactor = isPitchedRoof(inputs.mounting, inputs.roofType)
    ? SPACING_FACTOR_PITCHED
    : SPACING_FACTOR_FLAT;
  const spaceM2 = panelCount * panel.areaM2 * spacingFactor;

  const distribution = monthlyDistribution(inputs.orientation);
  const monthlyProductionKwh = distribution.map((p) => annualProductionKwh * p);

  // Savings model with self-consumption ratio:
  //   directly_consumed = min(production * ratio, consumption)
  //   exported          = production - directly_consumed
  //   savings           = directly_consumed * price + exported * price * exportRatio
  const ratio = isHybrid(inputs.systemPhase)
    ? SELF_CONSUMPTION_HYBRID
    : SELF_CONSUMPTION_GRID;
  const directlyConsumed = Math.min(
    annualProductionKwh * ratio,
    annualConsumptionKwh,
  );
  const exported = Math.max(0, annualProductionKwh - directlyConsumed);
  const annualSavings =
    directlyConsumed * inputs.pricePerKwh +
    exported * inputs.pricePerKwh * EXPORT_PRICE_RATIO;

  return {
    systemSizeKwp: installedKwp,
    panelCount,
    spaceM2,
    annualProductionKwh,
    monthlyAvgProductionKwh: annualProductionKwh / 12,
    annualSavings,
    monthlyProductionKwh,
  };
}
