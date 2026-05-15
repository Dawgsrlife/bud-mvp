// OcrDataSource - reads text from an image.
// Slice 4: mocked. Returns predictable strings keyed by which mock product was "captured".
// Slice 5: swap to Apple Vision OCR on iOS via expo Module, ML Kit on Android via expo plugin.

export interface OcrResult {
  text: string;
  confidence: number;
}

// Mock product catalog for development. Cycles through these on each capture.
const MOCK_TEXTS: ReadonlyArray<OcrResult> = [
  {
    text: 'INGREDIENTS: Wheat flour, sugar, vegetable oil, salt, yeast. Contains: wheat, soy. May contain: milk, egg.',
    confidence: 0.94,
  },
  {
    text: 'INGREDIENTS: Organic oats, raisins, almonds, cinnamon, sea salt. Contains: tree nuts (almond). May contain: peanut.',
    confidence: 0.91,
  },
  {
    text: 'INGREDIENTS: Filtered water, organic kale, lemon, ginger, mint. No common allergens.',
    confidence: 0.97,
  },
  {
    text: 'INGREDIENTS: Cocoa, sugar, milk solids, soy lecithin, vanilla. Contains: milk, soy.',
    confidence: 0.93,
  },
];

let mockIndex = 0;

export class OcrDataSource {
  async readText(_imageUri: string): Promise<OcrResult> {
    // Simulate processing delay so the UI gets to show "Reading..."
    await new Promise((resolve) => setTimeout(resolve, 900));
    const result = MOCK_TEXTS[mockIndex % MOCK_TEXTS.length]!;
    mockIndex += 1;
    return result;
  }
}
