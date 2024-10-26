import { EVENT_STORE_CONNECTION } from '@/core/constants';
import { EventStore } from '@/shared/application/ports/event-store';
import { SerializableEvent } from '@/shared/domain/interfaces/serializable-event';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDeserializer } from './deserializers/event.deserializer';
import { Event } from './schema/event.schema';

@Injectable()
export class MongoEventStore implements EventStore {
  private readonly logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private readonly eventSerializer: EventDeserializer,
  ) {}

  async persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void> {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const session = await this.eventStore.startSession();

    try {
      session.startTransaction();
      await this.eventStore.insertMany(events, { session, ordered: true });
      await session.commitTransaction();
      this.logger.debug(`Event inserted successfully to the event store`);
    } catch (error) {
      await session.abortTransaction();

      const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
      if (error.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        this.logger.error(`Event could not be persisted. Aggregate is stale.`);
        console.log(error.writeErrors?.[0]?.err?.errmsg);
      } else {
        console.log('AAA');
        throw error;
      }
    } finally {
      await session.endSession();
    }
  }

  async getEventsByStreamId(streamId: string): Promise<SerializableEvent[]> {
    const events = await this.eventStore
      .find({ streamId })
      .sort({ position: 1 });

    if (events.length === 0) {
      throw new Error(`No events found for stream id ${streamId}`);
    }

    return events.map((event) =>
      this.eventSerializer.deserialize(event.toJSON()),
    );
  }
}
