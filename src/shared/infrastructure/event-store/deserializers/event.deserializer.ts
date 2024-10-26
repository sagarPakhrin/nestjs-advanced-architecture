import { AlarmCreatedEvent } from '@/alarms/domain/events/alarm-created.event';
import { Injectable, Type } from '@nestjs/common';
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
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
    }
  }

  instantiateSerializableEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ): T {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
