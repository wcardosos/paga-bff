export class Entity<Props> {
  protected props: Props;

  protected constructor(props: Props) {
    this.props = props;
  }

  public map(): Props {
    return this.props;
  }
}
