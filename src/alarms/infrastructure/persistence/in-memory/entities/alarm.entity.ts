import { AlarmItemEntity } from './alarm-item.entity';

export class AlarmEntity {
  id: string;
  name: string;
  severity: string;
  triggedAt: Date;
  isAcknowledged: boolean;
  items: AlarmItemEntity[];
}
