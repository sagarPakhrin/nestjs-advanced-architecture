import { Alarm } from '@/alarms/domain/alarm';
import { AlarmSeverity } from '@/alarms/domain/value-objects/alarm-severity';
import { AlarmEntity } from '../entities/alarm.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as AlarmSeverity['value'],
    );

    return new Alarm(alarmEntity.id, alarmEntity.name, alarmSeverity);
  }

  static toPersistence(alarm: Alarm): AlarmEntity {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    return entity;
  }
}
