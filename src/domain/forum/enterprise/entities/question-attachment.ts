import { BaseEntity } from '@/core/entities/base-entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface IQuestionAttachmentProps {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuestionAttachment extends BaseEntity<IQuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(
    props: IQuestionAttachmentProps,
    id?: UniqueEntityId,
  ): QuestionAttachment {
    return new QuestionAttachment(props, id)
  }
}
