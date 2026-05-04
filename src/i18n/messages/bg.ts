import type { Messages } from './en';

export const bg: Messages = {
  doc_title: 'PV калкулатор',

  app_title: 'PV слънчев калкулатор',
  app_subtitle:
    'Оценете размера, производството и спестяванията от вашата фотоволтаична инсталация.',

  lang_label: 'Език',
  lang_en: 'Английски',
  lang_bg: 'Български',

  section_consumption: 'Потребление',
  section_installation: 'Монтаж',
  section_equipment: 'Система и оборудване',
  section_advanced: 'Разширени',
  section_results: 'Оценка на резултатите',
  section_results_hint: 'Актуализира се при промяна на входовете.',

  consumption_mode_bill: 'Месечна сметка',
  consumption_mode_kwh: 'kWh',
  consumption_mode_aria: 'Режим на въвеждане на потребление',

  consumption_bill_label: 'Месечна сметка',
  consumption_bill_hint: '≈ {{kwh}} kWh / мес.',
  consumption_kwh_label: 'Месечно потребление',
  consumption_kwh_hint: '≈ €{{bill}} / мес.',
  consumption_price_label: 'Цена на електроенергията',
  consumption_price_hint: 'Колко плащате за kWh по сметката',

  aria_monthly_bill: 'Месечна сметка в евро',
  aria_monthly_kwh: 'Месечно потребление в kWh',
  aria_price_per_kwh: 'Цена за kWh в евро',

  installation_mounting: 'Тип монтаж',
  installation_roof_type: 'Тип покрив',
  installation_orientation: 'Ориентация',

  mounting_ground: 'Земя',
  mounting_roof: 'Покрив',

  roof_tiles: 'Керемиди',
  roof_sandwich: 'Сандвич панел',
  roof_flat: 'Плосък',
  roof_bitumen: 'Битум',

  orientation_south: 'Юг',
  orientation_se_sw: 'ЮИ / ЮЗ',
  orientation_ew: 'И / З',

  equipment_inverter: 'Тип инвертор / система',
  equipment_battery: 'Тип батерия',
  equipment_panel: 'Мощност на панелите',

  phase_single_phase: 'Еднофазен',
  phase_three_phase: 'Трифазен',
  phase_single_hybrid: 'Еднофазен хибрид',
  phase_three_hybrid: 'Трифазен хибрид',

  battery_low_voltage: 'Ниско напрежение',
  battery_high_voltage: 'Високо напрежение',

  advanced_peak_sun: 'Пикови слънчеви часове',
  advanced_peak_sun_hint:
    'Среден дневен еквивалент на пълно слънце за вашата локация (за цялата година).',
  aria_peak_sun: 'Пикови слънчеви часове на ден',
  peak_sun_format: '{{v}} ч / ден',
  peak_sun_bounds: '{{min}} – {{max}}',

  result_system_size: 'Препоръчана мощност на системата',
  result_panel_count: 'Брой панели',
  result_space: 'Необходима площ',
  result_annual_prod: 'Годишно производство',
  result_monthly_prod: 'Месечно производство',
  result_monthly_avg: 'средно',
  result_annual_savings: 'Годишни спестявания',

  result_value_system_size: '{{n}} kWp',
  result_value_space: '{{n}} m²',
  result_value_annual_kwh: '{{n}} kWh / г.',
  result_value_monthly_kwh: '{{n}} kWh / мес.',

  chart_title: 'Месечно енергийно производство',
  chart_subtitle: 'Оценени генерирани kWh по месеци',
  chart_tooltip_series: 'Производство',

  footer_disclaimer:
    'Оценките използват коефициент на представяне 0.80 с фактори за ориентация и монтаж. Реалното производство зависи от климата, засеняването и оборудването.',
};
