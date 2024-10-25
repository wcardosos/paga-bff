import { Entity } from './entity';

interface ReferenceMonthProps {
  value: string;
}

export class ReferenceMonth extends Entity<ReferenceMonthProps> {
  static create(props: ReferenceMonthProps) {
    return new ReferenceMonth(props);
  }

  get value() {
    return this.props.value;
  }
}
