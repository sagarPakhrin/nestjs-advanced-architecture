import { AlarmFactory } from '@/alarms/domain/factories/alarm.factory';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.log(
      `Processing "CreateAlarmCommand" : ${JSON.stringify(command)}`,
    );
    const alarm = this.alarmFactory.create(command.name, command.severity);
    return this.alarmRepository.save(alarm);
  }
}
