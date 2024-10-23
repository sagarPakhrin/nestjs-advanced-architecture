import { Alarm } from '@/alarms/domain/alarm';
import { AlarmItem } from '@/alarms/domain/alarm-item';
import { AlarmSeverity } from '@/alarms/domain/value-objects/alarm-severity';
import { AlarmItemEntity } from '../entities/alarm-item.entity';
import { AlarmEntity } from '../entities/alarm.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as AlarmSeverity['value'],
    );

    const newAlarm = new Alarm(alarmEntity.id);
    newAlarm.name = alarmEntity.name;
    newAlarm.isAcknowledged = alarmEntity.isAcknowledged;
    newAlarm.severity = alarmSeverity;
    newAlarm.triggeredAt = alarmEntity.triggedAt;

    newAlarm.items = alarmEntity.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );
    return newAlarm;
  }

  static toPersistence(alarm: Alarm): AlarmEntity {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.triggedAt = alarm.triggeredAt;
    entity.items = alarm.items.map((item) => {
      const entity = new AlarmItemEntity();
      entity.id = item.id;
      entity.name = item.name;
      entity.type = item.type;
      return entity;
    });
    return entity;
  }
}
