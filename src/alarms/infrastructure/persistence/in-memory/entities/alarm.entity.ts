import { Column, PrimaryColumn } from 'typeorm';

export class AlarmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;
}
