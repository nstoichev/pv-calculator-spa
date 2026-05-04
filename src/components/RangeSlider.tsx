import { useId } from 'react';
import type { CSSProperties } from 'react';

interface RangeSliderProps {
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
  /** When set, replaces the default "min – max" bounds row. */
  boundsFormat?: (min: number, max: number) => string;
  ariaLabel?: string;
  id?: string;
}

export default function RangeSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue,
  boundsFormat,
  ariaLabel,
  id,
}: RangeSliderProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const display = formatValue ? formatValue(value) : value.toString();
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="range-slider">
      <div className="range-slider-header">
        <span className="range-slider-value">{display}</span>
        <span className="range-slider-bounds" aria-hidden="true">
          {boundsFormat
            ? boundsFormat(min, max)
            : `${formatValue ? formatValue(min) : min} – ${formatValue ? formatValue(max) : max}`}
        </span>
      </div>
      <input
        id={inputId}
        type="range"
        className="range-slider-input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        style={{ '--range-progress': `${percentage}%` } as CSSProperties}
      />
    </div>
  );
}
