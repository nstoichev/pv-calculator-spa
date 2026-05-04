import { useMemo } from 'react';
import { useI18n } from '../i18n/I18nContext';

const decimalFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

interface RecommendedSystemHeroProps {
  systemSizeKwp: number;
  /** Extra class on the root tile (e.g. desktop-only vs mobile sticky shell). */
  className?: string;
}

export default function RecommendedSystemHero({
  systemSizeKwp,
  className = '',
}: RecommendedSystemHeroProps) {
  const { t } = useI18n();

  const value = useMemo(
    () =>
      t('result_value_system_size', {
        n: decimalFmt.format(systemSizeKwp),
      }),
    [t, systemSizeKwp],
  );

  return (
    <div
      className={`result-stat result-stat--hero ${className}`.trim()}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="result-stat-label">{t('result_system_size')}</span>
      <span className="result-stat-value">{value}</span>
    </div>
  );
}
