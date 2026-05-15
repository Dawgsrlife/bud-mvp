// HistoryStorageDataSource - the only place AsyncStorage is touched for scan history.
//
// MVP scope: local-only history. Slice 7 adds a Supabase Realtime subscription
// to product_scans (RLS owner-only) so history persists across devices.

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ScanRecord } from '../../domain/entities/scan-record';

const KEY_HISTORY = '@bud/v1/scan-history';
const MAX_LOCAL_RECORDS = 200;

export class HistoryStorageDataSource {
  async readAll(): Promise<ScanRecord[]> {
    const raw = await AsyncStorage.getItem(KEY_HISTORY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as ScanRecord[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async prepend(record: ScanRecord): Promise<void> {
    const existing = await this.readAll();
    const next = [record, ...existing].slice(0, MAX_LOCAL_RECORDS);
    await AsyncStorage.setItem(KEY_HISTORY, JSON.stringify(next));
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY_HISTORY);
  }
}
