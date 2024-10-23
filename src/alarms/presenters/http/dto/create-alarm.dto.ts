export class CreateAlarmDto {
  name: string;
  severity: string;
  trigeredAt: Date;
  items: Array<{ name: string; type: string }>;
}
