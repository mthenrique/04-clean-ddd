import { BaseEntity } from '@/core/entities/base-entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface IAttachmentProps {
  title: string
  link: string
}

export class Attachment extends BaseEntity<IAttachmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: IAttachmentProps, id?: UniqueEntityId) {
    return new Attachment(props, id)
  }
}
