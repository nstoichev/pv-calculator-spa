export const en = {
  doc_title: 'PV Calculator',

  app_title: 'PV solar calculator',
  app_subtitle:
    'Estimate the size, output and savings of your solar installation.',

  lang_label: 'Language',
  lang_en: 'English',
  lang_bg: 'Bulgarian',

  section_consumption: 'Consumption',
  section_installation: 'Installation',
  section_equipment: 'System & equipment',
  section_advanced: 'Advanced',
  section_results: 'Estimated results',
  section_results_hint: 'Updates as you change inputs.',

  consumption_mode_bill: 'Monthly bill',
  consumption_mode_kwh: 'kWh',
  consumption_mode_aria: 'Consumption input mode',

  consumption_bill_label: 'Monthly bill',
  consumption_bill_hint: '≈ {{kwh}} kWh / month',
  consumption_kwh_label: 'Monthly consumption',
  consumption_kwh_hint: '≈ €{{bill}} / month',
  consumption_price_label: 'Price of electricity',
  consumption_price_hint: 'What you pay per kWh on your bill',

  aria_monthly_bill: 'Monthly bill in euros',
  aria_monthly_kwh: 'Monthly consumption in kWh',
  aria_price_per_kwh: 'Price per kWh in euros',

  installation_mounting: 'Mounting type',
  installation_roof_type: 'Roof type',
  installation_orientation: 'Orientation',

  mounting_ground: 'Ground',
  mounting_roof: 'Roof',

  roof_tiles: 'Tiles',
  roof_sandwich: 'Sandwich panel',
  roof_flat: 'Flat',
  roof_bitumen: 'Bitumen',

  orientation_south: 'South',
  orientation_se_sw: 'SE / SW',
  orientation_ew: 'E / W',

  equipment_inverter: 'Inverter / system type',
  equipment_battery: 'Battery type',
  equipment_panel: 'Panel power',

  phase_single_phase: 'Single-phase',
  phase_three_phase: 'Three-phase',
  phase_single_hybrid: 'Single-phase hybrid',
  phase_three_hybrid: 'Three-phase hybrid',

  battery_low_voltage: 'Low-voltage',
  battery_high_voltage: 'High-voltage',

  advanced_peak_sun: 'Peak sun hours',
  advanced_peak_sun_hint:
    'Average daily equivalent hours of full sun for your location (year-round).',
  aria_peak_sun: 'Peak sun hours per day',
  peak_sun_format: '{{v}} h / day',
  peak_sun_bounds: '{{min}} – {{max}}',

  result_system_size: 'Recommended system size',
  result_panel_count: 'Number of panels',
  result_space: 'Required space',
  result_annual_prod: 'Annual production',
  result_monthly_prod: 'Monthly production',
  result_monthly_avg: 'average',
  result_annual_savings: 'Annual savings',

  result_value_system_size: '{{n}} kWp',
  result_value_space: '{{n}} m²',
  result_value_annual_kwh: '{{n}} kWh / yr',
  result_value_monthly_kwh: '{{n}} kWh / mo',

  chart_title: 'Monthly energy production',
  chart_subtitle: 'Estimated kWh generated per month',
  chart_tooltip_series: 'Production',

  footer_disclaimer:
    'Estimates use a performance ratio of 0.80 with orientation and mounting derate factors. Actual production depends on local climate, shading, and equipment.',
} as const;

export type MessageKey = keyof typeof en;

/** All locales share the same keys; values are plain strings for translation. */
export type Messages = { [K in MessageKey]: string };
