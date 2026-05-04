import Field from '../components/Field';
import NumberField from '../components/NumberField';
import SegmentedToggle from '../components/SegmentedToggle';
import type { ConsumptionMode } from '../calculator/types';

interface ConsumptionSectionProps {
  mode: ConsumptionMode;
  billValue: number;
  kwhValue: number;
  pricePerKwh: number;
  onModeChange: (mode: ConsumptionMode) => void;
  onBillValueChange: (next: number) => void;
  onKwhValueChange: (next: number) => void;
  onPricePerKwhChange: (next: number) => void;
}

export default function ConsumptionSection({
  mode,
  billValue,
  kwhValue,
  pricePerKwh,
  onModeChange,
  onBillValueChange,
  onKwhValueChange,
  onPricePerKwhChange,
}: ConsumptionSectionProps) {
  // Derived "other side" of whichever input the user is currently editing.
  const derivedKwh = pricePerKwh > 0 ? billValue / pricePerKwh : 0;
  const derivedBill = kwhValue * pricePerKwh;

  return (
    <section className="card">
      <header className="card-header">
        <h2>Consumption</h2>
        <SegmentedToggle
          value={mode}
          onChange={onModeChange}
          options={[
            { value: 'bill', label: 'Monthly bill' },
            { value: 'kwh', label: 'kWh' },
          ]}
          ariaLabel="Consumption input mode"
        />
      </header>

      <div className="card-body">
        {mode === 'bill' ? (
          <Field
            label="Monthly bill"
            hint={`≈ ${formatKwh(derivedKwh)} kWh / month`}
          >
            <NumberField
              value={round2(billValue)}
              onChange={onBillValueChange}
              min={0}
              step={1}
              prefix="€"
              ariaLabel="Monthly bill in euros"
            />
          </Field>
        ) : (
          <Field
            label="Monthly consumption"
            hint={`≈ €${formatMoney(derivedBill)} / month`}
          >
            <NumberField
              value={round1(kwhValue)}
              onChange={onKwhValueChange}
              min={0}
              step={1}
              suffix="kWh"
              ariaLabel="Monthly consumption in kWh"
            />
          </Field>
        )}

        <Field label="Price of electricity" hint="What you pay per kWh on your bill">
          <NumberField
            value={pricePerKwh}
            onChange={onPricePerKwhChange}
            min={0}
            step={0.01}
            prefix="€"
            suffix="/ kWh"
            ariaLabel="Price per kWh in euros"
          />
        </Field>
      </div>
    </section>
  );
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatKwh(n: number): string {
  return round1(n).toLocaleString('en-US');
}

function formatMoney(n: number): string {
  return round2(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
