import { useCallback } from 'react';
import Field from '../components/Field';
import RangeSlider from '../components/RangeSlider';
import { PEAK_SUN_HOURS_RANGE } from '../calculator/constants';
import { useI18n } from '../i18n/I18nContext';

interface AdvancedSectionProps {
  peakSunHours: number;
  onPeakSunHoursChange: (next: number) => void;
}

export default function AdvancedSection({
  peakSunHours,
  onPeakSunHoursChange,
}: AdvancedSectionProps) {
  const { t } = useI18n();

  const formatPeak = useCallback(
    (v: number) => t('peak_sun_format', { v: v.toFixed(1) }),
    [t],
  );

  const min = PEAK_SUN_HOURS_RANGE.min;
  const max = PEAK_SUN_HOURS_RANGE.max;

  return (
    <section className="card">
      <header className="card-header">
        <h2>{t('section_advanced')}</h2>
      </header>

      <div className="card-body">
        <Field label={t('advanced_peak_sun')} hint={t('advanced_peak_sun_hint')}>
          <RangeSlider
            value={peakSunHours}
            onChange={onPeakSunHoursChange}
            min={min}
            max={max}
            step={PEAK_SUN_HOURS_RANGE.step}
            formatValue={formatPeak}
            boundsFormat={(a, b) =>
              t('peak_sun_bounds', { min: formatPeak(a), max: formatPeak(b) })
            }
            ariaLabel={t('aria_peak_sun')}
          />
        </Field>
      </div>
    </section>
  );
}
