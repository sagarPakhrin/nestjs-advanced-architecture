import { VersionedAggregateRoot } from '@/shared/domain/aggregate-root';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { MongoEventStore } from '../mongo-event-store';
import { EventSerializer } from '../serializer/event.serializer';

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  constructor(
    private readonly eventStore: MongoEventStore,
    private readonly eventBus: EventBus,
    private readonly eventSerializer: EventSerializer,
  ) {}

  onApplicationBootstrap() {
    this.eventBus.publisher = this;
  }

  publish<TEvent extends IEvent = IEvent>(
    event: TEvent,
    dispatcher: VersionedAggregateRoot,
  ) {
    const serializableEvent = this.eventSerializer.serialize(event, dispatcher);
    console.log('CA', serializableEvent);
    return this.eventStore.persist(serializableEvent);
  }

  publishAll<TEvent extends IEvent = IEvent>(
    events: TEvent[],
    dispatcher: VersionedAggregateRoot,
  ) {
    const serializableEvents = events
      .map((event) => this.eventSerializer.serialize(event, dispatcher))
      .map((serializableEvent, index) => ({
        ...serializableEvent,
        position: dispatcher.version.value + index + 1,
      }));
    return this.eventStore.persist(serializableEvents);
  }
}
