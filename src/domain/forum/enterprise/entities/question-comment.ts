import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, ICommentProps } from './comment'
import { Optional } from '@/core/types/optional'

export interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  get questionId() {
    return this.props.questionId
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
