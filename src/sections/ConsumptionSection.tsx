import Field from '../components/Field';
import NumberField from '../components/NumberField';
import SegmentedToggle from '../components/SegmentedToggle';
import { useI18n } from '../i18n/I18nContext';
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
  const { t } = useI18n();

  const derivedKwh = pricePerKwh > 0 ? billValue / pricePerKwh : 0;
  const derivedBill = kwhValue * pricePerKwh;

  return (
    <section className="card">
      <header className="card-header">
        <h2>{t('section_consumption')}</h2>
        <SegmentedToggle
          value={mode}
          onChange={onModeChange}
          options={[
            { value: 'bill', label: t('consumption_mode_bill') },
            { value: 'kwh', label: t('consumption_mode_kwh') },
          ]}
          ariaLabel={t('consumption_mode_aria')}
        />
      </header>

      <div className="card-body">
        {mode === 'bill' ? (
          <Field
            label={t('consumption_bill_label')}
            hint={t('consumption_bill_hint', { kwh: formatKwh(derivedKwh) })}
          >
            <NumberField
              value={round2(billValue)}
              onChange={onBillValueChange}
              min={0}
              step={1}
              prefix="€"
              ariaLabel={t('aria_monthly_bill')}
            />
          </Field>
        ) : (
          <Field
            label={t('consumption_kwh_label')}
            hint={t('consumption_kwh_hint', { bill: formatMoney(derivedBill) })}
          >
            <NumberField
              value={round1(kwhValue)}
              onChange={onKwhValueChange}
              min={0}
              step={1}
              suffix="kWh"
              ariaLabel={t('aria_monthly_kwh')}
            />
          </Field>
        )}

        <Field
          label={t('consumption_price_label')}
          hint={t('consumption_price_hint')}
        >
          <NumberField
            value={pricePerKwh}
            onChange={onPricePerKwhChange}
            min={0}
            step={0.01}
            prefix="€"
            suffix="/ kWh"
            ariaLabel={t('aria_price_per_kwh')}
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
