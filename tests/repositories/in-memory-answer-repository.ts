import { IPaginationParams } from '@/core/repositories/i-pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repositories'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  constructor(
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findAllByQuestionId(
    questionId: string,
    { page }: IPaginationParams,
  ): Promise<Answer[]> {
    return this.items
      .filter((item) => item.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async update(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    if (index !== -1) {
      this.items[index] = answer
    }
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    if (index !== -1) {
      this.items.splice(index, 1)
    }

    await this.answerAttachmentsRepository.deleteManyByAnswerId(
      answer.id.toString(),
    )
  }
}
