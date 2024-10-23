import { AlarmReadModel } from '@/alarms/domain/read-models/alarm.read-models';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAlarmsRepository } from '../ports/find-alarm.repository';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindAlarmsRepository) {}

  execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
