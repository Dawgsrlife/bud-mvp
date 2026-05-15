// ProductReport - a user-submitted flag that something about a verdict is wrong.
// Feeds the consensus engine's quarantine logic.

export type ReportReason =
  | 'wrong-ingredients'
  | 'wrong-verdict'
  | 'outdated'
  | 'spam-or-irrelevant';

export interface ProductReportInput {
  readonly productId: string;
  readonly reason: ReportReason;
  readonly note?: string;
}

export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  'wrong-ingredients': 'Wrong ingredients',
  'wrong-verdict': 'Wrong verdict',
  outdated: 'Outdated info',
  'spam-or-irrelevant': 'Spam or irrelevant',
};
