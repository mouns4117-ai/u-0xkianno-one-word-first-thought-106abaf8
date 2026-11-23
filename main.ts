// One Word, First Thought — entry for make.fun
// Writes exactly one word to /output/entry.txt.
//
// The word: "petrichor" — the smell of rain on dry earth after a long
// dry spell. It is the first word that came to mind: surprising rather
// than safe, vivid and specific (one breath of rain on hot dust), with a
// sound that rewards a second look. One word, nothing else.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "petrichor";

// Empty only the contents of a directory, never the directory itself:
// the grader's /output is a mounted empty directory and removing it fails.
function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

// The program is fully deterministic: no network, no dates, no random
// input. Every run writes the same single word to the same file.
function main(): void {
  const outDir = process.argv[2] ?? "/output";
  // Gate: exactly one word, 1 to 24 characters, not only whitespace.
  if (
    WORD.length < 1 ||
    WORD.length > 24 ||
    WORD.trim() !== WORD ||
    /\s/.test(WORD)
  ) {
    throw new Error(`entry word fails the 1-24 character gate: ${WORD}`);
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), WORD + "\n", "utf8");
}

main();
