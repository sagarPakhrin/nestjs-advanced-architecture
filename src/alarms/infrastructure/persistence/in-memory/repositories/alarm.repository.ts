import { CreateAlarmRepository } from '@/alarms/application/ports/create-alarm.repository';
import { FindAlarmsRepository } from '@/alarms/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from '@/alarms/application/ports/upsert-materialized-alarm.repository';
import { Alarm } from '@/alarms/domain/alarm';
import { AlarmReadModel } from '@/alarms/domain/read-models/alarm.read-models';
import { Injectable } from '@nestjs/common';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const alarmEntity = AlarmMapper.toPersistence(alarm);
    this.alarms.set(alarmEntity.id, alarmEntity);

    const newEntity = this.alarms.get(alarmEntity.id);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
    this.materializedAlarmViews.set(
      alarm.id,
      alarm as unknown as AlarmReadModel,
    );
  }
}
