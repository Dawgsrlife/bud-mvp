// ProfileStorageDataSource - the only place AsyncStorage is touched for profiles.
// SOLID: Single Responsibility. Reads/writes JSON to one key. No business logic.

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AllergenProfile } from '../../../scanner/domain/entities/allergen-profile';

const KEY_PROFILE = '@bud/v1/allergen-profile';

export class ProfileStorageDataSource {
  async read(): Promise<AllergenProfile | null> {
    const raw = await AsyncStorage.getItem(KEY_PROFILE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AllergenProfile;
    return parsed;
  }

  async write(profile: AllergenProfile): Promise<void> {
    await AsyncStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY_PROFILE);
  }
}
