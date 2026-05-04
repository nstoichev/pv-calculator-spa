# PV Solar Calculator

A single-page web app that helps users estimate the size, output, space, and savings of a photovoltaic (PV) solar installation. Built with **Vite**, **React**, **TypeScript** and **Recharts**.

Inputs update results live: change any field and the recommended system size, panel count, required space, monthly bar chart, and annual savings recalculate immediately.

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

## Getting started

```bash
npm install
npm run dev
```

The app opens at [http://localhost:5173](http://localhost:5173).

## Available scripts

| Script               | Description                               |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Vite dev server with HMR                  |
| `npm run build`      | Type-check + production build             |
| `npm run preview`    | Preview the production build              |
| `npm run type-check` | TypeScript without emitting               |

## Project structure

```
src/
├── main.tsx                       # Bootstraps the React app
├── App.tsx                        # Top-level state + layout
├── index.css                      # All app styles
├── calculator/                    # Pure domain logic
│   ├── types.ts
│   ├── constants.ts               # Catalogues, derate factors, defaults
│   └── calculate.ts               # Inputs → Results
├── components/                    # Reusable UI primitives
│   ├── Field.tsx
│   ├── NumberField.tsx
│   ├── RadioCardGroup.tsx         # Button-styled radios
│   ├── RangeSlider.tsx
│   └── SegmentedToggle.tsx        # Bill ↔ kWh switch
└── sections/                      # Calculator-specific sections
    ├── ConsumptionSection.tsx
    ├── InstallationSection.tsx
    ├── EquipmentSection.tsx
    ├── AdvancedSection.tsx
    ├── ResultsPanel.tsx
    └── MonthlyChart.tsx           # Recharts bar chart
```

## How it calculates

All formulas live in [`src/calculator/calculate.ts`](src/calculator/calculate.ts) and are driven by constants in [`src/calculator/constants.ts`](src/calculator/constants.ts).

**Inputs**

- Monthly consumption (entered as bill € or kWh — the two stay in sync via `bill = kWh × price/kWh`)
- Price of electricity (default **€0.15 / kWh**)
- Mounting (Ground / Roof) and Roof type (Tiles / Sandwich / Flat / Bitumen)
- Orientation (South / SE-SW / E-W)
- Inverter type (single-phase, three-phase, ± hybrid)
- Battery type (only when system is **hybrid**)
- Panel power (400 / 460 / 550 / 700 W)
- Peak sun hours per day (slider, 2.0–6.0, default 4.5)

**Effective performance ratio**

```
PR_effective = 0.80 × orientation_factor × mounting_derate
```

| Orientation | Factor |
| ----------- | -----: |
| South       | 1.00   |
| SE / SW     | 0.95   |
| E / W       | 0.85   |

| Mounting       | Derate |
| -------------- | -----: |
| Ground         | 1.00   |
| Roof / Flat    | 0.98   |
| Roof / Tiles   | 0.97   |
| Roof / Sandwich| 0.96   |
| Roof / Bitumen | 0.95   |

**Sizing**

```
required_kWp     = annual_consumption / (PSH × 365 × PR_effective)
panel_count      = ceil(required_kWp / panel_kWp)
installed_kWp    = panel_count × panel_kWp
annual_kWh       = installed_kWp × PSH × 365 × PR_effective
required_space   = panel_count × panel_area × spacing_factor
                   (spacing 1.0 for pitched roofs, 1.4 for ground / flat)
```

**Monthly distribution**

A fixed Northern-Hemisphere profile (peaks Jun–Aug, troughs Dec–Feb). E/W orientations have a slightly flatter curve.

**Savings**

Self-consumption model:

```
ratio            = 0.85 (hybrid + battery) | 0.35 (grid-tied)
directly_used    = min(annual_kWh × ratio, annual_consumption)
exported         = annual_kWh − directly_used
annual_savings   = directly_used × price + exported × price × 0.30
```

The 0.30 export factor reflects that surplus kWh fed back to the grid typically earns a fraction of the retail import price.

> These are first-order estimates intended for ballpark sizing. Real production depends on local climate, shading, soiling, equipment specs, and grid regulations.

## Tweaking the model

Want to change the panel catalogue, derates, default sun hours, or savings ratios? Edit [`src/calculator/constants.ts`](src/calculator/constants.ts). The calculator function will pick up the changes — no other files need to change.
