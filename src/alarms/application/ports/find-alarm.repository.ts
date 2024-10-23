import { AlarmReadModel } from '@/alarms/domain/read-models/alarm.read-models';

export abstract class FindAlarmsRepository {
  abstract findAll(): Promise<AlarmReadModel[]>;
}
