import { Alarm } from '@/alarms/domain/alarm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmRepository } from '../ports/alarm.repository';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler {
  constructor(private readonly alarmRepository: AlarmRepository) {}

  execute(query: GetAlarmsQuery): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}
