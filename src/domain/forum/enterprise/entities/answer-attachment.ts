import { BaseEntity } from '@/core/entities/base-entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface IAnswerAttachmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachment extends BaseEntity<IAnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(
    props: IAnswerAttachmentProps,
    id?: UniqueEntityId,
  ): AnswerAttachment {
    return new AnswerAttachment(props, id)
  }
}
