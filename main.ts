import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single absurd terms-of-service clause this entry submits.
// Revised wording: heavier legal boilerplate ("hereby grant", "perpetual,
// royalty-free license", "waives all claims") so the register stays flat and
// formal right up until the licensed asset turns out to be your shadow.
const CLAUSE =
  "By accessing this service, you hereby grant the provider a perpetual, royalty-free license to photograph your shadow for advertising, and your shadow waives all claims to payment.";

function validateClause(text: string): void {
  if (typeof text !== "string") {
    throw new Error("Clause must be a string.");
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Clause must be 1-200 characters, got ${text.length}.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Clause must not be only whitespace.");
  }
  if (text !== text.trim()) {
    throw new Error("Clause must not have leading or trailing whitespace.");
  }
  // Exactly one sentence: a single terminal period and no other
  // sentence-ending punctuation anywhere in the line.
  const terminators = text.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !text.endsWith(".")) {
    throw new Error("Clause must be exactly one sentence ending in a period.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Clause must be a single line.");
  }
  if (!/^[A-Z]/.test(text)) {
    throw new Error("Clause must start with a capital letter.");
  }
  if (text.includes("  ")) {
    throw new Error("Clause must not contain double spaces.");
  }
}

function main(): void {
  validateClause(CLAUSE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), CLAUSE, "utf8");
}

main();
