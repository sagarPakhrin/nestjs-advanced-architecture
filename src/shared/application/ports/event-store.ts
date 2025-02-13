import { SerializableEvent } from '@/shared/domain/interfaces/serializable-event';

export abstract class EventStore {
  abstract persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void>;

  abstract getEventsByStreamId(streamId: string): Promise<SerializableEvent[]>;
}
