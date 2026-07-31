# Adding a Client Logo

## Steps

1. Save the raw logo to `scripts/logo-sources/<slug>.png`

   - Any size, any background, any color.
   - `<slug>` is lowercase-with-dashes. Example: `rcdc`, `richmond-square`.

2. Add an entry to `scripts/logos.json`

   ```json
   { "slug": "rcdc", "name": "RCDC Property Management" }
   ```

   - `name` is the alt text shown to screen readers.
   - Array order = display order in the strip.

3. Run:

   ```bash
   npm run logos
   ```

4. Check the output line for your slug:

   ```
   rcdc    352x200  mode=gradient (auto), re-inked rgb(21,67,114), h=133 (auto)
   ```

5. View the strip at `http://localhost:3000` (homepage, below the hero).

6. Commit `scripts/logo-sources/<slug>.png`, `scripts/logos.json`, `public/assets/trusted-by/<slug>.png`, `content/clients.generated.ts`.

## Removing a Logo

1. Delete its entry from `scripts/logos.json`
2. `npm run logos`
3. Delete `scripts/logo-sources/<slug>.png` and `public/assets/trusted-by/<slug>.png`

## Reordering

1. Reorder the entries in `scripts/logos.json`
2. `npm run logos`

## Do Not Edit

- `content/clients.generated.ts` — overwritten on every run
- `public/assets/trusted-by/*.png` — overwritten on every run
- The `clients` export in `content/site.ts` — it re-exports the generated file

## Fixes

Add the override to that logo's entry in `scripts/logos.json`, then re-run `npm run logos`.

| Problem | Override | Example |
| --- | --- | --- |
| Too big / too small in the row | `opticalH` (px, 120–172) | `"opticalH": 140` |
| Background left behind | `"mode": "flood"` + `bg` + `tol` | `"bg": [255,255,255], "tol": 40` |
| Background is a gradient | `"mode": "gradient"` | |
| Already transparent, leave alone | `"mode": "none"` | |
| Parts of the logo eaten away | lower `tol` | `"tol": 20` |
| Halo / fringe left around edges | raise `tol` | `"tol": 60` |
| Logo invisible (white on light bg) | `ink` | `"ink": [21,67,114]` |
| Logo re-inked but wrong color | `ink` | `"ink": [189,8,10]` |

Full entry with every field:

```json
{
  "slug": "example",
  "name": "Example Corp",
  "mode": "flood",
  "bg": [255, 255, 255],
  "tol": 40,
  "opticalH": 150,
  "ink": [21, 67, 114]
}
```

## Field Reference

| Field | Required | Default | Meaning |
| --- | --- | --- | --- |
| `slug` | yes | — | Filename in `logo-sources/` and `public/assets/trusted-by/` |
| `name` | yes | — | Alt text |
| `mode` | no | auto-detected | `flood` \| `gradient` \| `none` |
| `bg` | no | sampled from border | `[r,g,b]` background color to key out (`flood` only) |
| `tol` | no | `40` | Color tolerance for `flood`. Higher = removes more |
| `opticalH` | no | auto | Content height in px before padding to the 200px canvas |
| `ink` | no | darkest background color | `[r,g,b]` to repaint a white-on-dark logo |

## Mode Auto-Detection

| Source border | Mode picked |
| --- | --- |
| >5% transparent | `none` |
| Flat color (spread ≤ 24) | `flood`, seeded from border color |
| Color varies across the image | `gradient` |

## Notes

- Logos render grayscale at 55% opacity at rest, full color on hover. Keep source color intact — do not pre-grayscale.
- Every output is 200px tall with 26px transparent side padding. Width varies by aspect ratio.
- Wide horizontal lockups get a shorter `opticalH` automatically so they do not dominate the row.
- `sharp` is not a declared dependency; it resolves through Next.js. If `npm run logos` fails with a module-not-found, run `npm i -D sharp`.
