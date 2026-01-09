# Palette Colori Lashesmood - Valori Esadecimali

Questo documento contiene tutti i colori utilizzati nel progetto Lashesmood convertiti dal formato OKLCH al formato esadecimale.

## Background Colors

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--background` | `oklch(0.995 0.002 90)` | `#FEFEFE` | Near white (quasi bianco) |
| `--card` | `oklch(1 0 0)` | `#FFFFFF` | Pure white (bianco puro) |
| `--popover` | `oklch(1 0 0)` | `#FFFFFF` | Pure white (bianco puro) |

## Foreground Colors

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--foreground` | `oklch(0.25 0.01 270)` | `#333333` | Soft dark (grigio scuro morbido) |
| `--card-foreground` | `oklch(0.25 0.01 270)` | `#333333` | Soft dark |
| `--popover-foreground` | `oklch(0.25 0.01 270)` | `#333333` | Soft dark |
| `--secondary-foreground` | `oklch(0.25 0.01 270)` | `#333333` | Soft dark |
| `--accent-foreground` | `oklch(0.25 0.01 270)` | `#333333` | Soft dark |
| `--primary-foreground` | `oklch(1 0 0)` | `#FFFFFF` | White (bianco per testo su rosa) |

## Primary Colors (Brand Primary)

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--primary` | `oklch(0.75 0.10 340)` | `#E891A8` | Softer pink (rosa più morbido) |
| `--brand-primary` | `oklch(0.75 0.10 340)` | `#E891A8` | Softer pink |
| `--ring` | `oklch(0.75 0.10 340)` | `#E891A8` | Pink focus ring (anello di focus rosa) |

## Secondary Colors (Brand Secondary)

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--secondary` | `oklch(0.95 0.03 340)` | `#F5E1E8` | Very light pink (rosa molto chiaro) |
| `--brand-secondary` | `oklch(0.95 0.03 340)` | `#F5E1E8` | Very light pink |
| `--accent` | `oklch(0.95 0.03 340)` | `#F5E1E8` | Very light pink |

## Muted Colors

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--muted` | `oklch(0.98 0.002 90)` | `#FAFAFA` | Very light gray (grigio molto chiaro) |
| `--muted-foreground` | `oklch(0.55 0.01 270)` | `#888888` | Medium gray (grigio medio) |

## Border & Input Colors

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--border` | `oklch(0.92 0.002 90)` | `#EBEBEB` | Subtle border (bordo sottile) |
| `--input` | `oklch(0.98 0.002 90)` | `#FAFAFA` | Light input (input chiaro) |

## Destructive Color

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--destructive` | `oklch(0.577 0.245 27.325)` | `#DC2626` | Red (rosso per errori) |

## Custom Lashesmood Brand Colors

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `--brand-accent` | `oklch(0.25 0.01 270)` | `#333333` | Soft dark for accents |
| `--brand-light` | `oklch(0.98 0.002 90)` | `#FAFAFA` | Ultra light (ultra chiaro) |
| `--brand-muted` | `oklch(0.96 0.002 90)` | `#F5F5F5` | Muted (smorzato) |
| `--brand-rose` | `oklch(0.95 0.03 340)` | `#F5E1E8` | Light pink (rosa chiaro) |
| `--brand-cream` | `oklch(0.995 0.002 90)` | `#FEFEFE` | Near white (quasi bianco/crema) |

## Hover States

| Variabile CSS | OKLCH | Esadecimale | Descrizione |
|---------------|-------|-------------|-------------|
| `.btn-primary:hover` | `oklch(0.70 0.10 340)` | `#D97393` | Hover leggermente più scuro del primary |
| `.btn-secondary:hover` | `oklch(0.92 0.03 340)` | `#EDD5DC` | Hover leggermente più scuro del secondary |

## Riepilogo Colori Principali

### Colori Brand
- **Brand Primary**: `#E891A8` (Rosa principale)
- **Brand Secondary**: `#F5E1E8` (Rosa chiaro secondario)
- **Brand Accent**: `#333333` (Grigio scuro per accenti)
- **Brand Light**: `#FAFAFA` (Ultra chiaro)
- **Brand Muted**: `#F5F5F5` (Smorzato)
- **Brand Rose**: `#F5E1E8` (Rosa chiaro)
- **Brand Cream**: `#FEFEFE` (Quasi bianco/crema)

### Colori di Base
- **Background**: `#FEFEFE` (Quasi bianco)
- **Foreground**: `#333333` (Grigio scuro)
- **Border**: `#EBEBEB` (Grigio molto chiaro)
- **Muted**: `#FAFAFA` (Grigio chiarissimo)
- **Destructive**: `#DC2626` (Rosso per errori)

## Note

Tutti i colori sono definiti in formato OKLCH nel file `src/app/globals.css`. I valori esadecimali sono approssimazioni della conversione OKLCH → RGB → HEX.

Per una conversione precisa, è possibile utilizzare tool online come:
- [OKLCH Color Picker](https://oklch.com/)
- [Color.js Color Space Converter](https://colorjs.io/apps/convert/)

## Utilizzo nei Componenti

Questi colori sono accessibili tramite:
- Variabili CSS: `var(--brand-primary)`, `var(--brand-secondary)`, ecc.
- Utility Tailwind: `bg-brand-primary`, `text-brand-primary`, `border-brand-primary`, ecc.
- Classi custom: `.btn-primary`, `.btn-secondary`, `.text-lashesmood-primary`, ecc.

