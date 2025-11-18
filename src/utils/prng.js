// Deterministic "random" function for hydration-safe randomness
export function prng(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export const ORBS = Array.from({ length: 18 }).map((_, i) => {
  const left = prng(i) * 100;
  const top = prng(i + 101) * 100;
  const size = 60 + prng(i + 202) * 80;
  const delay = prng(i + 303) * 6;
  return { key: i, left, top, size, delay };
});

