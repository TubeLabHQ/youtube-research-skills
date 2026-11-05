#!/usr/bin/env bash
# thumb-board.sh: download thumbnail images and tile them into a labelled
# contact sheet for visual review.
#
# Usage:
#   scripts/thumb-board.sh urls.txt            # one image URL per line (blank lines and # comments ignored)
#   scripts/thumb-board.sh URL [URL ...]       # URLs as arguments
#   OUT_DIR=./board scripts/thumb-board.sh urls.txt
#
# Output:
#   <OUT_DIR>/01.jpg ... NN.jpg               the downloaded images, numbered in input order
#   <OUT_DIR>/contact-sheet.jpg               4-column tiled sheet with labels 1..N (needs ImageMagick `montage`)
#
# Without ImageMagick the script still downloads everything and prints the paths,
# so the agent can open them one by one. Requires curl.
set -euo pipefail

if [[ $# -eq 0 ]]; then
  sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi

command -v curl >/dev/null 2>&1 || { echo "error: curl is required" >&2; exit 1; }

OUT_DIR="${OUT_DIR:-$(mktemp -d "${TMPDIR:-/tmp}/thumb-board.XXXXXX")}"
mkdir -p "$OUT_DIR"

urls=()
if [[ $# -eq 1 && -f "$1" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%%#*}"
    line="$(echo "$line" | xargs 2>/dev/null || true)"
    [[ -n "$line" ]] && urls+=("$line")
  done < "$1"
else
  urls=("$@")
fi

if [[ ${#urls[@]} -eq 0 ]]; then
  echo "error: no URLs found" >&2
  exit 1
fi

files=()
i=0
for url in "${urls[@]}"; do
  i=$((i + 1))
  n=$(printf '%02d' "$i")
  out="$OUT_DIR/$n.jpg"
  if curl -fsSL --max-time 20 -o "$out" "$url"; then
    files+=("$out")
  else
    # maxres is not always rendered; fall back to hqdefault for YouTube URLs
    alt="${url/maxresdefault/hqdefault}"
    if [[ "$alt" != "$url" ]] && curl -fsSL --max-time 20 -o "$out" "$alt"; then
      files+=("$out")
    else
      echo "warn: failed to download #$i: $url" >&2
    fi
  fi
done

if [[ ${#files[@]} -eq 0 ]]; then
  echo "error: nothing downloaded" >&2
  exit 1
fi

echo "downloaded ${#files[@]} of ${#urls[@]} images to $OUT_DIR"

if command -v montage >/dev/null 2>&1; then
  labelled=()
  for f in "${files[@]}"; do
    labelled+=("-label" "$(basename "${f%.jpg}" | sed 's/^0//')" "$f")
  done
  montage "${labelled[@]}" -tile 4x -geometry 320x180+6+6 -background '#111111' -fill white -pointsize 18 "$OUT_DIR/contact-sheet.jpg"
  echo "contact sheet: $OUT_DIR/contact-sheet.jpg"
else
  echo "note: ImageMagick 'montage' not found; open the images individually:"
  printf '  %s\n' "${files[@]}"
  echo "install ImageMagick (brew install imagemagick / apt install imagemagick) to get a tiled sheet."
fi
