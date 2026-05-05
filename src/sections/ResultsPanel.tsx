import { useMemo } from 'react';
import type { CalculatorResults } from '../calculator/types';
import type { MessageKey } from '../i18n/messages';
import { useI18n } from '../i18n/I18nContext';
import MonthlyChart from './MonthlyChart';

const numberFmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const decimalFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const moneyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

interface StatRow {
  labelKey: MessageKey;
  value: string;
  subKey?: MessageKey;
}

interface ResultsPanelProps {
  results: CalculatorResults;
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const { t } = useI18n();

  const stats: StatRow[] = useMemo(
    () => [
      {
        labelKey: 'result_system_size',
        value: t('result_value_system_size', {
          n: decimalFmt.format(results.systemSizeKwp),
        }),
      },
      {
        labelKey: 'result_panel_count',
        value: numberFmt.format(results.panelCount),
      },
      {
        labelKey: 'result_space',
        value: t('result_value_space', {
          n: numberFmt.format(results.spaceM2),
        }),
      },
      {
        labelKey: 'result_annual_prod',
        value: t('result_value_annual_kwh', {
          n: numberFmt.format(results.annualProductionKwh),
        }),
      },
      {
        labelKey: 'result_monthly_prod',
        value: t('result_value_monthly_kwh', {
          n: numberFmt.format(results.monthlyAvgProductionKwh),
        }),
        subKey: 'result_monthly_avg',
      },
      {
        labelKey: 'result_annual_savings',
        value: moneyFmt.format(results.annualSavings),
      },
    ],
    [t, results],
  );

  const [heroStat, ...otherStats] = stats;

  return (
    <aside className="results" id="results-panel">
      <header className="results-header">
        <h2>{t('section_results')}</h2>
        <p>{t('section_results_hint')}</p>
      </header>

      <div className="results-stats">
        <div className="result-stat result-stat--hero result-stat--hero-desktop-only">
          <span className="result-stat-label">{t(heroStat.labelKey)}</span>
          <span className="result-stat-value">{heroStat.value}</span>
          {heroStat.subKey ? (
            <span className="result-stat-sub">{t(heroStat.subKey)}</span>
          ) : null}
        </div>

        <div className="results-grid">
          {otherStats.map((s) => (
            <div className="result-stat" key={s.labelKey}>
              <span className="result-stat-label">{t(s.labelKey)}</span>
              <span className="result-stat-value">{s.value}</span>
              {s.subKey ? (
                <span className="result-stat-sub">{t(s.subKey)}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <MonthlyChart monthlyProductionKwh={results.monthlyProductionKwh} />
    </aside>
  );
}
