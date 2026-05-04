import Field from '../components/Field';
import RangeSlider from '../components/RangeSlider';
import { PEAK_SUN_HOURS_RANGE } from '../calculator/constants';

interface AdvancedSectionProps {
  peakSunHours: number;
  onPeakSunHoursChange: (next: number) => void;
}

export default function AdvancedSection({
  peakSunHours,
  onPeakSunHoursChange,
}: AdvancedSectionProps) {
  return (
    <section className="card">
      <header className="card-header">
        <h2>Advanced</h2>
      </header>

      <div className="card-body">
        <Field
          label="Peak sun hours"
          hint="Average daily equivalent hours of full sun for your location (year-round)."
        >
          <RangeSlider
            value={peakSunHours}
            onChange={onPeakSunHoursChange}
            min={PEAK_SUN_HOURS_RANGE.min}
            max={PEAK_SUN_HOURS_RANGE.max}
            step={PEAK_SUN_HOURS_RANGE.step}
            formatValue={(v) => `${v.toFixed(1)} h / day`}
            ariaLabel="Peak sun hours per day"
          />
        </Field>
      </div>
    </section>
  );
}
