import { BaseEntity } from '@/core/entities/base-entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface IAnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends BaseEntity<IAnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private setUpdatedAt() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.setUpdatedAt()
  }

  static create(
    props: Optional<IAnswerProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answer
  }
}
