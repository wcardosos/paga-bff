import { Entity } from './entity';

interface WelcomeProps {
  message: string;
}

export class Welcome extends Entity<WelcomeProps> {
  static create(props: WelcomeProps) {
    return new Welcome(props);
  }

  get message() {
    return this.props.message;
  }
}
