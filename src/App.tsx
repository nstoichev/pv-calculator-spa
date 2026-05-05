import { useCallback, useMemo, useRef, useState } from 'react';
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
import LanguageSwitcher from './components/LanguageSwitcher';
import { useI18n } from './i18n/I18nContext';
import ConsumptionSection from './sections/ConsumptionSection';
import InstallationSection from './sections/InstallationSection';
import EquipmentSection from './sections/EquipmentSection';
import AdvancedSection from './sections/AdvancedSection';
import RecommendedSystemHero from './sections/RecommendedSystemHero';
import ResultsPanel from './sections/ResultsPanel';

export default function App() {
  const { t } = useI18n();
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

  const recommendedHeroMobileSlotRef = useRef<HTMLDivElement>(null);

  const scrollToResults = useCallback(() => {
    const panel = document.getElementById('results-panel');
    const slot = recommendedHeroMobileSlotRef.current;
    if (!panel) return;

    let coverPx = 0;
    if (slot && getComputedStyle(slot).display !== 'none') {
      const topInset = parseFloat(getComputedStyle(slot).top);
      coverPx =
        (Number.isFinite(topInset) ? topInset : 0) + slot.offsetHeight;
    }

    const gapPx = 10;
    const panelTop =
      panel.getBoundingClientRect().top + window.scrollY;
    const nextScrollY = panelTop - coverPx - gapPx;

    window.scrollTo({
      top: Math.max(0, nextScrollY),
      behavior: 'smooth',
    });
  }, []);

  const results = useMemo(
    () =>
      calculate({
        monthlyKwh,
        pricePerKwh,
        mounting,
        roofType,
        orientation,
        systemPhase,
        batteryType,
        panelWattage,
        peakSunHours,
      } satisfies CalculatorInputs),
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
        <div className="app-header-main">
          <h1>{t('app_title')}</h1>
          <p>{t('app_subtitle')}</p>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="app-layout">
        <div
          className="recommended-hero-mobile-slot"
          ref={recommendedHeroMobileSlotRef}
        >
          <RecommendedSystemHero systemSizeKwp={results.systemSizeKwp} />
          <button
            type="button"
            className="recommended-hero-see-results"
            onClick={scrollToResults}
          >
            {t('mobile_see_results')}
          </button>
        </div>

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
        <p>{t('footer_disclaimer')}</p>
      </footer>
    </div>
  );
}
