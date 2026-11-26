// The Worst Pizza Topping — entry program.
// Writes one line (under 200 chars) pitching the worst pizza topping to
// /output/entry.txt.
// The pitch: a single raisin — not a topping, a warning — staring at you
// from the centre of the pizza.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const CEILING = 200;

class WorstTopping {
  private readonly pitch =
    "A single raisin. Not a topping — a warning. It stares at you from the centre of the pizza.";

  text(): string {
    return this.pitch;
  }

  check(line: string): void {
    const n = [...line].length;
    if (n < 1 || n >= CEILING) {
      throw new Error(`pitch fails the under-${CEILING} character gate (${n})`);
    }
    if (/\n/.test(line)) {
      throw new Error("pitch must be a single line");
    }
    // It must pitch a genuinely terrible topping: one raisin.
    if (!/^A single raisin\./.test(line)) {
      throw new Error("pitch must open on the single raisin");
    }
    // The topping is sold as a warning, not an ingredient.
    if (!/Not a topping — a warning\./.test(line)) {
      throw new Error("pitch must sell the raisin as a warning");
    }
    // The punch: it stares at you from the centre.
    if (!/stares at you from the centre of the pizza\.$/.test(line)) {
      throw new Error("pitch must end on the staring raisin");
    }
    // Exactly three sentences: the topping, the warning, the stare.
    const sentences = line.split(/(?<=\.)\s+/);
    if (sentences.length !== 3 || !/^A single raisin\./.test(sentences[0])) {
      throw new Error("pitch must be topping plus warning plus stare, in that order");
    }
  }
}

const topping = new WorstTopping();
const line = topping.text();
topping.check(line);
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
await mkdir(dir, { recursive: true });
await writeFile(join(dir, "entry.txt"), new TextEncoder().encode(line));
console.log(`wrote ${[...line].length} chars to ${join(dir, "entry.txt")}`);
