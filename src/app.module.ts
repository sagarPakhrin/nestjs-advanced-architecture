import { Module } from '@nestjs/common';
import { AlarmsInfrastructureModule } from './alarms/infrastructure/alarms-infrastructure.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationBootstrapOptions } from './common/application-bootstrap.options';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsInfrastructureModule.use(options.driver),
      ],
    };
  }
}
