import { Module } from '@nestjs/common';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AlarmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
