import type {
  ConsensusRepository,
  ConsensusSubscription,
} from '../../domain/repositories/consensus-repository';
import type { ConsensusEvent } from '../../domain/entities/consensus-event';
import { RealtimeDataSource } from '../datasources/realtime-datasource';

export class ConsensusRepositoryImpl implements ConsensusRepository {
  constructor(private readonly realtime: RealtimeDataSource) {}

  subscribeToProducts(
    productIds: ReadonlyArray<string>,
    onEvent: (e: ConsensusEvent) => void,
  ): ConsensusSubscription {
    return this.realtime.subscribe(productIds, onEvent);
  }
}
