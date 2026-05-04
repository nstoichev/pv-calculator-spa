import { useMemo } from 'react';
import Field from '../components/Field';
import RadioCardGroup from '../components/RadioCardGroup';
import {
  MOUNTING_VALUES,
  ORIENTATION_VALUES,
  ROOF_TYPE_VALUES,
} from '../calculator/constants';
import {
  MOUNTING_LABEL_KEYS,
  ORIENTATION_LABEL_KEYS,
  ROOF_LABEL_KEYS,
} from '../i18n/optionLabels';
import { useI18n } from '../i18n/I18nContext';
import type { Mounting, Orientation, RoofType } from '../calculator/types';

interface InstallationSectionProps {
  mounting: Mounting;
  roofType: RoofType;
  orientation: Orientation;
  onMountingChange: (next: Mounting) => void;
  onRoofTypeChange: (next: RoofType) => void;
  onOrientationChange: (next: Orientation) => void;
}

export default function InstallationSection({
  mounting,
  roofType,
  orientation,
  onMountingChange,
  onRoofTypeChange,
  onOrientationChange,
}: InstallationSectionProps) {
  const { t } = useI18n();

  const mountingOptions = useMemo(
    () =>
      MOUNTING_VALUES.map((value) => ({
        value,
        label: t(MOUNTING_LABEL_KEYS[value]),
      })),
    [t],
  );

  const roofOptions = useMemo(
    () =>
      ROOF_TYPE_VALUES.map((value) => ({
        value,
        label: t(ROOF_LABEL_KEYS[value]),
      })),
    [t],
  );

  const orientationOptions = useMemo(
    () =>
      ORIENTATION_VALUES.map((value) => ({
        value,
        label: t(ORIENTATION_LABEL_KEYS[value]),
      })),
    [t],
  );

  return (
    <section className="card">
      <header className="card-header">
        <h2>{t('section_installation')}</h2>
      </header>

      <div className="card-body">
        <Field label={t('installation_mounting')}>
          <RadioCardGroup
            name="mounting"
            value={mounting}
            onChange={onMountingChange}
            options={mountingOptions}
          />
        </Field>

        {mounting === 'roof' ? (
          <Field label={t('installation_roof_type')}>
            <RadioCardGroup
              name="roof-type"
              value={roofType}
              onChange={onRoofTypeChange}
              options={roofOptions}
            />
          </Field>
        ) : null}

        <Field label={t('installation_orientation')}>
          <RadioCardGroup
            name="orientation"
            value={orientation}
            onChange={onOrientationChange}
            options={orientationOptions}
          />
        </Field>
      </div>
    </section>
  );
}
