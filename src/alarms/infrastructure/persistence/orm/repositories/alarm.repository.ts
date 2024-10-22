import { AlarmRepository } from '@/alarms/application/ports/alarm.repository';
import { Alarm } from '@/alarms/domain/alarm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async findAll(): Promise<Alarm[]> {
    const alarms = await this.alarmRepository.find();
    return alarms.map((alarm) => AlarmMapper.toDomain(alarm));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const alarmEntity = AlarmMapper.toPersistence(alarm);
    await this.alarmRepository.save(alarmEntity);
    return AlarmMapper.toDomain(alarmEntity);
  }
}
