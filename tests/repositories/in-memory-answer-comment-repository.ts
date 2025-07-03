import { IPaginationParams } from '@/core/repositories/i-pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: IPaginationParams,
  ): Promise<AnswerComment[]> {
    return this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString(),
    )

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
