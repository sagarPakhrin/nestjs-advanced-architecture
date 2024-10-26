import { Alarm } from '@/alarms/domain/alarm';
import { AggregateRehydrator } from '@/shared/application/aggregate.rehydrator';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcknowledgeAlarmCommand } from './acknowledge-alarm.command';

@CommandHandler(AcknowledgeAlarmCommand)
export class AcknowledgeAlarmCommandHanlder
  implements ICommandHandler<AcknowledgeAlarmCommand>
{
  private readonly logger = new Logger(AcknowledgeAlarmCommandHanlder.name);

  constructor(public readonly aggragateHydrator: AggregateRehydrator) {}

  async execute(command: AcknowledgeAlarmCommand) {
    this.logger.debug(`Acknowledging alarm ${command.alarmId}`);

    const alarm = await this.aggragateHydrator.rehydrate(
      command.alarmId,
      Alarm,
    );
    alarm.acknowledge();
    alarm.commit();
    return alarm;
  }
}
