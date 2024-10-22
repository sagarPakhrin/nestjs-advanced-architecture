import { AlarmRepository } from '@/alarms/application/ports/alarm.repository';
import { Alarm } from '@/alarms/domain/alarm';
import { Injectable } from '@nestjs/common';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  async findAll(): Promise<Alarm[]> {
    const alarms = Array.from(this.alarms.values());
    return alarms.map((alarm) => AlarmMapper.toDomain(alarm));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const alarmEntity = AlarmMapper.toPersistence(alarm);
    this.alarms.set(alarmEntity.id, alarmEntity);

    const newEntity = this.alarms.get(alarmEntity.id);
    return AlarmMapper.toDomain(newEntity);
  }
}
