import { BaseEntity } from '@/core/entities/base-entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface IInstructorProps {
  name: string
}

export class Instructor extends BaseEntity<IInstructorProps> {
  get name() {
    return this.props.name
  }

  static create(props: IInstructorProps, id?: UniqueEntityId) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
