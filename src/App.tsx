import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_MONTHLY_BILL,
  DEFAULT_PRICE_PER_KWH,
  PEAK_SUN_HOURS_RANGE,
} from './calculator/constants';
import { calculate } from './calculator/calculate';
import type {
  BatteryType,
  CalculatorInputs,
  ConsumptionMode,
  Mounting,
  Orientation,
  PanelWattage,
  RoofType,
  SystemPhase,
} from './calculator/types';
import ConsumptionSection from './sections/ConsumptionSection';
import InstallationSection from './sections/InstallationSection';
import EquipmentSection from './sections/EquipmentSection';
import AdvancedSection from './sections/AdvancedSection';
import ResultsPanel from './sections/ResultsPanel';

export default function App() {
  const [pricePerKwh, setPricePerKwh] = useState<number>(DEFAULT_PRICE_PER_KWH);
  // Source of truth tracks whichever side the user is currently editing.
  // When they toggle modes we sync the "other" side from current values, so
  // changing €/kWh keeps the bill (or kWh) the user typed locked, while the
  // derived side updates.
  const [consumptionMode, setConsumptionMode] = useState<ConsumptionMode>('bill');
  const [billValue, setBillValue] = useState<number>(DEFAULT_MONTHLY_BILL);
  const [kwhValue, setKwhValue] = useState<number>(
    DEFAULT_MONTHLY_BILL / DEFAULT_PRICE_PER_KWH,
  );

  const monthlyKwh =
    consumptionMode === 'bill'
      ? pricePerKwh > 0
        ? billValue / pricePerKwh
        : 0
      : kwhValue;

  const handleConsumptionModeChange = useCallback(
    (next: ConsumptionMode) => {
      setConsumptionMode((current) => {
        if (current === next) return current;
        if (next === 'kwh') {
          setKwhValue(pricePerKwh > 0 ? billValue / pricePerKwh : 0);
        } else {
          setBillValue(kwhValue * pricePerKwh);
        }
        return next;
      });
    },
    [billValue, kwhValue, pricePerKwh],
  );

  const [mounting, setMounting] = useState<Mounting>('ground');
  const [roofType, setRoofType] = useState<RoofType>('tiles');
  const [orientation, setOrientation] = useState<Orientation>('south');

  const [systemPhase, setSystemPhase] = useState<SystemPhase>('single_phase');
  const [batteryType, setBatteryType] = useState<BatteryType>('low_voltage');
  const [panelWattage, setPanelWattage] = useState<PanelWattage>(460);

  const [peakSunHours, setPeakSunHours] = useState<number>(
    PEAK_SUN_HOURS_RANGE.default,
  );

  const inputs: CalculatorInputs = {
    monthlyKwh,
    pricePerKwh,
    mounting,
    roofType,
    orientation,
    systemPhase,
    batteryType,
    panelWattage,
    peakSunHours,
  };

  const results = useMemo(
    () => calculate(inputs),
    // We re-derive when any input changes; `inputs` is rebuilt every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      monthlyKwh,
      pricePerKwh,
      mounting,
      roofType,
      orientation,
      systemPhase,
      batteryType,
      panelWattage,
      peakSunHours,
    ],
  );

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>PV solar calculator</h1>
          <p>Estimate the size, output and savings of your solar installation.</p>
        </div>
      </header>

      <div className="app-layout">
        <div className="inputs-column">
          <ConsumptionSection
            mode={consumptionMode}
            billValue={billValue}
            kwhValue={kwhValue}
            pricePerKwh={pricePerKwh}
            onModeChange={handleConsumptionModeChange}
            onBillValueChange={setBillValue}
            onKwhValueChange={setKwhValue}
            onPricePerKwhChange={setPricePerKwh}
          />

          <InstallationSection
            mounting={mounting}
            roofType={roofType}
            orientation={orientation}
            onMountingChange={setMounting}
            onRoofTypeChange={setRoofType}
            onOrientationChange={setOrientation}
          />

          <EquipmentSection
            systemPhase={systemPhase}
            batteryType={batteryType}
            panelWattage={panelWattage}
            onSystemPhaseChange={setSystemPhase}
            onBatteryTypeChange={setBatteryType}
            onPanelWattageChange={setPanelWattage}
          />

          <AdvancedSection
            peakSunHours={peakSunHours}
            onPeakSunHoursChange={setPeakSunHours}
          />
        </div>

        <ResultsPanel results={results} />
      </div>

      <footer className="app-footer">
        <p>
          Estimates use a performance ratio of 0.80 with orientation and
          mounting derate factors. Actual production depends on local climate,
          shading, and equipment.
        </p>
      </footer>
    </div>
  );
}
