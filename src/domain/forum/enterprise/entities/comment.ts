import { BaseEntity } from '@/core/entities/base-entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ICommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<
  Props extends ICommentProps,
> extends BaseEntity<Props> {
  get authorId() {
    return this.props.authorId
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

  private setUpdatedAt() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.setUpdatedAt()
  }
}
