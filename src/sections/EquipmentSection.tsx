import { useMemo } from 'react';
import Field from '../components/Field';
import RadioCardGroup from '../components/RadioCardGroup';
import {
  BATTERY_VALUES,
  PANELS,
  SYSTEM_PHASE_VALUES,
  isHybrid,
} from '../calculator/constants';
import {
  BATTERY_LABEL_KEYS,
  SYSTEM_PHASE_LABEL_KEYS,
} from '../i18n/optionLabels';
import { useI18n } from '../i18n/I18nContext';
import type {
  BatteryType,
  PanelWattage,
  SystemPhase,
} from '../calculator/types';

interface EquipmentSectionProps {
  systemPhase: SystemPhase;
  batteryType: BatteryType;
  panelWattage: PanelWattage;
  onSystemPhaseChange: (next: SystemPhase) => void;
  onBatteryTypeChange: (next: BatteryType) => void;
  onPanelWattageChange: (next: PanelWattage) => void;
}

export default function EquipmentSection({
  systemPhase,
  batteryType,
  panelWattage,
  onSystemPhaseChange,
  onBatteryTypeChange,
  onPanelWattageChange,
}: EquipmentSectionProps) {
  const { t } = useI18n();
  const showBattery = isHybrid(systemPhase);

  const phaseOptions = useMemo(
    () =>
      SYSTEM_PHASE_VALUES.map((value) => ({
        value,
        label: t(SYSTEM_PHASE_LABEL_KEYS[value]),
      })),
    [t],
  );

  const batteryOptions = useMemo(
    () =>
      BATTERY_VALUES.map((value) => ({
        value,
        label: t(BATTERY_LABEL_KEYS[value]),
      })),
    [t],
  );

  const panelOptions = useMemo(
    () =>
      PANELS.map((p) => ({
        value: String(p.wattage) as `${PanelWattage}`,
        label: `${p.wattage} W`,
      })),
    [],
  );

  return (
    <section className="card">
      <header className="card-header">
        <h2>{t('section_equipment')}</h2>
      </header>

      <div className="card-body">
        <Field label={t('equipment_inverter')}>
          <RadioCardGroup
            name="system-phase"
            value={systemPhase}
            onChange={onSystemPhaseChange}
            options={phaseOptions}
          />
        </Field>

        {showBattery ? (
          <Field label={t('equipment_battery')}>
            <RadioCardGroup
              name="battery-type"
              value={batteryType}
              onChange={onBatteryTypeChange}
              options={batteryOptions}
            />
          </Field>
        ) : null}

        <Field label={t('equipment_panel')}>
          <RadioCardGroup
            name="panel-wattage"
            value={String(panelWattage) as `${PanelWattage}`}
            onChange={(next) =>
              onPanelWattageChange(Number(next) as PanelWattage)
            }
            options={panelOptions}
          />
        </Field>
      </div>
    </section>
  );
}
