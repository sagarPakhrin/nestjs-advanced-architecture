import { AlarmEntity } from './alarm.entity';

export class AlarmItemEntity {
  id: string;
  name: string;
  type: string;
  alarm: AlarmEntity;
}
