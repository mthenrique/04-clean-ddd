import { UniqueEntityId } from "./unique-entity-id";

export class BaseEntity<IProps> {
  private _id: UniqueEntityId;
  protected props: IProps;
  
  get id() {
    return this._id;
  }

  protected constructor(props: IProps, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }
}