import { Alarm } from '@/alarms/domain/alarm';

export abstract class CreateAlarmRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
}
