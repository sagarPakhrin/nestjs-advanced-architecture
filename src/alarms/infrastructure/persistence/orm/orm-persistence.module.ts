import { CreateAlarmRepository } from '@/alarms/application/ports/create-alarm.repository';
import { FindAlarmsRepository } from '@/alarms/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from '@/alarms/application/ports/upsert-materialized-alarm.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmItemEntity } from './entities/alarm-items.entity';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { OrmUpsertMaterializedAlarmsRepository } from './repositories/upsert-materialized-alarms.repository';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarms.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      {
        name: MaterializedAlarmView.name,
        schema: MaterializedAlarmViewSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmsRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistenceModule {}
