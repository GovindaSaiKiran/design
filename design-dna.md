# Swaram AI Telephony Operations Console — Design DNA (High-Contrast Monochrome)

## 1. Subject & Brief
- **Subject**: Enterprise AI Voice Telephony & Autonomous Dispatch Console for institutional and enterprise operations.
- **Audience**: University registrars, operations directors, and telephony supervisors demanding an electrifying, ultra-clear, high-contrast Black & White command interface.
- **Primary Job**: At-a-glance monitoring of live SIP telephony streams, instant voice agent dispatch, verbatim audio transcript inspection, and carrier telemetry.
- **Three Feeling Words**: Stark, Architectural, Master-Control.
- **The Memorable Thing**: High-contrast black & white instrument deck (Leica M-Monochrom / Teenage Engineering aesthetic) with tactile stepped meters, inverted stark white brick buttons, crisp 1px division rules, and zero blurry gradients or generic cards.

## 2. Palette (Stark High-Contrast Monochrome)
- `ground`: `#000000` (deep pitch black canvas)
- `surface`: `#09090B` (machined console faceplate)
- `surface-raised`: `#121215` (elevated instrument card)
- `surface-sunken`: `#040405` (recessed bay / terminal channel)
- `ink`: `#FFFFFF` (pure stark white text)
- `ink-muted`: `#A1A1AA` (zinc-400 technical annotation)
- `ink-dim`: `#71717A` (zinc-500 metadata)
- `accent`: `#FFFFFF` (inverted crisp white control)
- `on-accent`: `#000000` (pure black typography on white)
- `line`: `#27272A` (zinc-800 razor border)
- `line-strong`: `#3F3F46` (zinc-700 structural border)
- `signal-active`: `#FFFFFF` (pulsing high-intensity phosphor LED)

## 3. Typography
- **Display Font**: `Bricolage Grotesque` (`var(--font-bricolage)`), weight 800, tight tracking `-0.03em`, crisp balance wrap.
- **Body Font**: `Plus Jakarta Sans` / system geometric, sentence case, 13–15px, line-height 1.55.
- **Data / Telemetry Font**: `JetBrains Mono` (`var(--font-mono)`), `font-variant-numeric: tabular-nums`, weights 500/700 for phone numbers, latencies, carrier codes.

## 4. Shape & Corner Philosophy
- **Sharp-Machined**:
  - Containers / Panels: `rounded-[2px]` with `border border-[#27272A]`.
  - Controls / Action buttons: `rounded-[2px]` with `border border-white` or `border-[#3F3F46]`.
  - Table rows & Meter cells: `rounded-none`.
  - Zero `rounded-2xl`, zero pill buttons.

## 5. Depth Model
- **Flat + Razor Contrast Borders**:
  - Zero blurry box shadows, zero glassmorphism, zero purple/neon gradients.
  - Depth created purely through stark tonal stepping (`#000000` -> `#09090B` -> `#121215`) and 1px crisp borders.
  - Tactile physical press feedback: `active:translate-x-[1px] active:translate-y-[1px]`.
