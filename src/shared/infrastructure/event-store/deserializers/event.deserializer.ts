import { Injectable, Type } from '@nestjs/common';
import { EventClsRegistry } from '../event-cls.registry';
import { Event } from '../schema/event.schema';

@Injectable()
export class EventDeserializer {
  // deserialize<T>(event: Event): SerializableEvent<T> {
  deserialize<T>(event: Event) {
    const evntCls = this.getEventClassByClassType(event.type);
    return {
      ...event,
      data: this.instantiateSerializableEvent(evntCls, event.data),
    };
  }

  getEventClassByClassType(type: string) {
    return EventClsRegistry.get(type);
  }

  instantiateSerializableEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ): T {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
