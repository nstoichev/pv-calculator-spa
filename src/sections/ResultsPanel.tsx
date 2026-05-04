import type { CalculatorResults } from '../calculator/types';
import MonthlyChart from './MonthlyChart';

interface ResultsPanelProps {
  results: CalculatorResults;
}

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

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const stats: { label: string; value: string; sub?: string }[] = [
    {
      label: 'Recommended system size',
      value: `${decimalFmt.format(results.systemSizeKwp)} kWp`,
    },
    {
      label: 'Number of panels',
      value: numberFmt.format(results.panelCount),
    },
    {
      label: 'Required space',
      value: `${numberFmt.format(results.spaceM2)} m²`,
    },
    {
      label: 'Annual production',
      value: `${numberFmt.format(results.annualProductionKwh)} kWh / yr`,
    },
    {
      label: 'Monthly production',
      value: `${numberFmt.format(results.monthlyAvgProductionKwh)} kWh / mo`,
      sub: 'average',
    },
    {
      label: 'Annual savings',
      value: moneyFmt.format(results.annualSavings),
    },
  ];

  return (
    <aside className="results">
      <header className="results-header">
        <h2>Estimated results</h2>
        <p>Updates as you change inputs.</p>
      </header>

      <div className="results-grid">
        {stats.map((s) => (
          <div className="result-stat" key={s.label}>
            <span className="result-stat-label">{s.label}</span>
            <span className="result-stat-value">{s.value}</span>
            {s.sub ? <span className="result-stat-sub">{s.sub}</span> : null}
          </div>
        ))}
      </div>

      <MonthlyChart monthlyProductionKwh={results.monthlyProductionKwh} />
    </aside>
  );
}
