import { AlarmCreatedEvent } from '@/alarms/domain/events/alarm-created.event';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  handle(event: AlarmCreatedEvent) {
    this.logger.log(`Alarm created: ${JSON.stringify(event)}`);
  }
}
