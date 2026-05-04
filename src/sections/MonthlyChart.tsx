import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useI18n } from '../i18n/I18nContext';

interface MonthlyChartProps {
  monthlyProductionKwh: number[];
}

export default function MonthlyChart({ monthlyProductionKwh }: MonthlyChartProps) {
  const { t, monthLabels } = useI18n();

  const data = monthLabels.map((month, i) => ({
    month,
    kwh: Math.round(monthlyProductionKwh[i] ?? 0),
  }));

  return (
    <div className="chart">
      <h3 className="chart-title">{t('chart_title')}</h3>
      <p className="chart-subtitle">{t('chart_subtitle')}</p>
      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
          >
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}`}
            />
            <Tooltip
              cursor={{ fill: 'var(--chart-cursor)' }}
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--text)',
                fontSize: 13,
              }}
              formatter={(value) => {
                const num = typeof value === 'number' ? value : Number(value);
                return [`${num.toLocaleString()} kWh`, t('chart_tooltip_series')];
              }}
              labelStyle={{ color: 'var(--text-muted)', marginBottom: 4 }}
            />
            <Bar
              dataKey="kwh"
              fill="var(--accent)"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
