#!/bin/bash
set -euo pipefail

ROOT_DIR="${1:-$(pwd)}"
OUT_DIR="${2:-/tmp/poulin-condition-pages}"
FAILED_FILE="${OUT_DIR}/failed.txt"

mkdir -p "$OUT_DIR"
: > "$FAILED_FILE"

node "$ROOT_DIR/scripts/build-condition-articles.mjs" print-sources | \
node -e '
let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  const sources = JSON.parse(input);
  for (const source of sources) {
    process.stdout.write(`${source.slug}\t${source.url}\n`);
  }
});
' | while IFS=$'\t' read -r slug url; do
  if [[ -s "$OUT_DIR/$slug.html" ]]; then
    continue
  fi

  TMP_FILE="$OUT_DIR/$slug.tmp"
  rm -f "$TMP_FILE"

  if perl -e 'alarm shift; exec @ARGV' 40 \
    curl --fail --max-time 25 --retry 2 --retry-delay 1 -L -s -A "Mozilla/5.0" "$url" > "$TMP_FILE"; then
    mv "$TMP_FILE" "$OUT_DIR/$slug.html"
  else
    rm -f "$TMP_FILE"
    printf "%s\t%s\n" "$slug" "$url" >> "$FAILED_FILE"
  fi
done

printf "%s\n" "$OUT_DIR"
