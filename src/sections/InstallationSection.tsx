import Field from '../components/Field';
import RadioCardGroup from '../components/RadioCardGroup';
import {
  MOUNTING_OPTIONS,
  ORIENTATION_OPTIONS,
  ROOF_TYPE_OPTIONS,
} from '../calculator/constants';
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
  return (
    <section className="card">
      <header className="card-header">
        <h2>Installation</h2>
      </header>

      <div className="card-body">
        <Field label="Mounting type">
          <RadioCardGroup
            name="mounting"
            value={mounting}
            onChange={onMountingChange}
            options={MOUNTING_OPTIONS}
          />
        </Field>

        {mounting === 'roof' ? (
          <Field label="Roof type">
            <RadioCardGroup
              name="roof-type"
              value={roofType}
              onChange={onRoofTypeChange}
              options={ROOF_TYPE_OPTIONS}
            />
          </Field>
        ) : null}

        <Field label="Orientation">
          <RadioCardGroup
            name="orientation"
            value={orientation}
            onChange={onOrientationChange}
            options={ORIENTATION_OPTIONS}
          />
        </Field>
      </div>
    </section>
  );
}
