import { useId } from 'react';

interface NumberFieldProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  ariaLabel?: string;
  id?: string;
}

export default function NumberField({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  ariaLabel,
  id,
}: NumberFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="number-field">
      {prefix ? (
        <span className="number-field-affix" aria-hidden="true">
          {prefix}
        </span>
      ) : null}
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        className="number-field-input"
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '') {
            onChange(0);
            return;
          }
          const parsed = Number(raw);
          if (!Number.isNaN(parsed)) {
            onChange(parsed);
          }
        }}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
      />
      {suffix ? (
        <span className="number-field-affix" aria-hidden="true">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
