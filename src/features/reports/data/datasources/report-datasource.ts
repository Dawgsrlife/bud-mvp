// ReportDataSource - inserts into product_reports table.
// RLS policy (already in migration): authenticated users can insert their own report.
// We submit anon for now; once Slice 10 (Auth) is wired, user_id will be filled by Supabase.

import { getSupabase } from '../../../../core/network/supabase-client';
import type { ProductReportInput } from '../../domain/entities/report';

export class ReportDataSource {
  async insert(input: ProductReportInput): Promise<{ id: string }> {
    const client = getSupabase();
    const { data, error } = await client
      .from('product_reports')
      .insert({
        product_id: input.productId,
        reason: input.reason,
        note: input.note ?? null,
      })
      .select('id')
      .single();
    if (error) throw error;
    return { id: data.id };
  }
}
