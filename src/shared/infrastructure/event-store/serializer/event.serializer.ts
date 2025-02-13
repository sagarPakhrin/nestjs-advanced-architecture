import { VersionedAggregateRoot } from '@/shared/domain/aggregate-root';
import { SerializableEvent } from '@/shared/domain/interfaces/serializable-event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventSerializer {
  toJSON<T>(data: T) {
    if (typeof data !== 'object' || data == null) {
      return data;
    }

    if ('toJSON' in data && typeof data.toJSON === 'function') {
      return data.toJSON();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.toJSON(item));
    }

    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = this.toJSON(value);
      return acc;
    }, {});
  }

  serialize<T>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): SerializableEvent<T> {
    const eventType = event.constructor?.name;
    if (!eventType) {
      throw new Error('Incompatable event type');
    }

    const aggregateId = dispatcher.id;
    return {
      streamId: aggregateId,
      position: dispatcher.version.value + 1,
      type: eventType,
      data: this.toJSON(event),
    };
  }
}
