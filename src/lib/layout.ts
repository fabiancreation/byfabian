import type { CampaignImage, LayoutHint } from "@/data/types";

export type RowKind = "wide" | "trio" | "pair" | "solo";

export type LayoutRow =
  | { kind: RowKind; frames: CampaignImage[] }
  | { kind: "pullquote"; frames?: never };

const HINT_SIZE: Record<Exclude<LayoutHint, "pullquote">, number> = {
  wide: 1,
  trio: 3,
  pair: 2,
  solo: 1,
};

/**
 * Group a run of consecutive portrait frames into 2- or 3-frame rows,
 * preferring pairs over orphan solos. Solos only happen when there's a single
 * portrait or 5+ where one must be left alone.
 *
 *   1 → [1]
 *   2 → [2]
 *   3 → [3]
 *   4 → [2,2]   (avoid 3+1 to dodge orphan solo)
 *   5 → [3,2]
 *   6 → [3,3]
 *   7 → [3,2,2]
 *   8 → [3,3,2]
 *   ...
 */
function groupPortraits(n: number): number[] {
  if (n <= 0) return [];
  if (n <= 3) return [n];
  if (n === 4) return [2, 2];
  // For n >= 5: as many 3s as possible, with the remainder split into 2+2 if 4
  // is left over, otherwise the leftover (2 or 1) tacked on the end.
  const groups: number[] = [];
  let remaining = n;
  while (remaining >= 5) {
    groups.push(3);
    remaining -= 3;
  }
  if (remaining === 4) groups.push(2, 2);
  else if (remaining > 0) groups.push(remaining);
  return groups;
}

/**
 * Walk an ordered list of frames and emit a sequence of layout rows. Each
 * frame is used exactly once; never cropped to fit a slot. Landscapes/squares
 * become full-bleed wide rows, portraits group into pair/trio/solo rows.
 *
 * After 2 rows of imagery, a pullquote divider is inserted (unless the body
 * has fewer than 2 rows, in which case it goes at the end). The hero frame is
 * presented separately above this sequence and should be excluded via
 * `excludeIds` to prevent duplication.
 */
export function planLayout(
  images: CampaignImage[],
  excludeIds: string[] = [],
  hints?: LayoutHint[],
): LayoutRow[] {
  const skip = new Set(excludeIds);
  const body = images.filter((i) => !skip.has(i.id));

  if (hints && hints.length > 0) {
    const rows: LayoutRow[] = [];
    let i = 0;
    for (const hint of hints) {
      if (hint === "pullquote") {
        rows.push({ kind: "pullquote" });
        continue;
      }
      const size = HINT_SIZE[hint];
      const slice = body.slice(i, i + size);
      if (slice.length === 0) break;
      rows.push({ kind: hint, frames: slice });
      i += size;
    }
    return rows;
  }

  const rows: LayoutRow[] = [];
  let i = 0;
  while (i < body.length) {
    const f = body[i];
    if (f.aspect === "portrait") {
      let j = i;
      while (j < body.length && body[j].aspect === "portrait") j++;
      const portraits = body.slice(i, j);
      const groups = groupPortraits(portraits.length);
      let p = 0;
      for (const g of groups) {
        const slice = portraits.slice(p, p + g);
        const kind: RowKind = g === 3 ? "trio" : g === 2 ? "pair" : "solo";
        rows.push({ kind, frames: slice });
        p += g;
      }
      i = j;
    } else {
      // landscape or square — one per row, full-bleed
      rows.push({ kind: "wide", frames: [f] });
      i++;
    }
  }

  // Insert pullquote after row 2 (or at the end if fewer rows exist).
  const insertAt = Math.min(2, rows.length);
  rows.splice(insertAt, 0, { kind: "pullquote" });
  return rows;
}
