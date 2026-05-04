import Field from '../components/Field';
import RadioCardGroup from '../components/RadioCardGroup';
import {
  BATTERY_OPTIONS,
  PANELS,
  SYSTEM_PHASE_OPTIONS,
  isHybrid,
} from '../calculator/constants';
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
  const showBattery = isHybrid(systemPhase);

  const panelOptions = PANELS.map((p) => ({
    value: String(p.wattage) as `${PanelWattage}`,
    label: p.label,
  }));

  return (
    <section className="card">
      <header className="card-header">
        <h2>System &amp; equipment</h2>
      </header>

      <div className="card-body">
        <Field label="Inverter / system type">
          <RadioCardGroup
            name="system-phase"
            value={systemPhase}
            onChange={onSystemPhaseChange}
            options={SYSTEM_PHASE_OPTIONS}
          />
        </Field>

        {showBattery ? (
          <Field label="Battery type">
            <RadioCardGroup
              name="battery-type"
              value={batteryType}
              onChange={onBatteryTypeChange}
              options={BATTERY_OPTIONS}
            />
          </Field>
        ) : null}

        <Field label="Panel power">
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
