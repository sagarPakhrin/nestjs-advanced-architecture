import { AlarmCreatedEvent } from '@/alarms/domain/events/alarm-created.event';
import { AlarmFactory } from '@/alarms/domain/factories/alarm.factory';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AlarmRepository } from '../ports/alarm.repository';
import { CreateAlarmCommand } from './create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.log(
      `Processing "CreateAlarmCommand" : ${JSON.stringify(command)}`,
    );
    const alarm = this.alarmFactory.create(command.name, command.severity);
    const newAlarm = await this.alarmRepository.save(alarm);
    this.eventBus.publish(new AlarmCreatedEvent(newAlarm));
    return newAlarm;
  }
}
