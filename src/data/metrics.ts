export const metrics = {
  gripAverageScore: 41.0,
  gpt4oScore: 41.4,
  gripAverageRetrievals: 1.24,
  r1SearcherRetrievals: 5.12,
  fewerRetrievalsPercent: 75.8,
  budget3Score: 41.0,
  budget10Score: 41.8,
  budget3Retrievals: 1.24,
  budget10Retrievals: 1.62,
};

export const performanceData = [
  { name: "GRIP", score: metrics.gripAverageScore },
  { name: "GPT-4o", score: metrics.gpt4oScore },
];

export const retrievalData = [
  { name: "GRIP", retrievals: metrics.gripAverageRetrievals },
  { name: "R1-Searcher", retrievals: metrics.r1SearcherRetrievals },
];

export function interpolateBudget(value: number, from: number, to: number) {
  const ratio = (value - 3) / (10 - 3);
  return from + ratio * (to - from);
}
