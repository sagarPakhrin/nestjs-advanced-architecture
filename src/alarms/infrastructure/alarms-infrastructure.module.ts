import { SharedModule } from '@/shared/shared.module';
import { Module } from '@nestjs/common';
import { InMemoryAlarmPersistenceModule } from './persistence/in-memory/im-memory-persistence.module';
import { OrmAlarmPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistanceModule =
      driver === 'orm'
        ? OrmAlarmPersistenceModule
        : InMemoryAlarmPersistenceModule;
    return {
      module: AlarmsInfrastructureModule,
      imports: [persistanceModule],
      exports: [persistanceModule],
    };
  }
}
