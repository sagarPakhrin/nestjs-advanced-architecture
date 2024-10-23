import { UpsertMaterializedAlarmRepository } from '@/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from '@/alarms/domain/read-models/alarm.read-models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaterializedAlarmView } from '../schemas/materialized-alarms.schema';

@Injectable()
export class OrmUpsertMaterializedAlarmsRepository
  implements UpsertMaterializedAlarmRepository
{
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate(
      {
        id: alarm.id,
      },
      alarm,
      {
        upsert: true,
      },
    );
  }
}
