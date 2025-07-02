import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, ICommentProps } from './comment'
import { Optional } from '@/core/types/optional'

export interface IQuestionCommentProps extends ICommentProps {
  answerId: UniqueEntityId
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<IQuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
