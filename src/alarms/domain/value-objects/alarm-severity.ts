export class AlarmSeverity {
  constructor(public readonly value: 'critical' | 'high' | 'medium' | 'low') {}

  equals(other: AlarmSeverity): boolean {
    return this.value === other.value;
  }
}
