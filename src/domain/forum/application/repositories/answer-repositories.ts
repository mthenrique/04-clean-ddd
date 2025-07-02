import { IPaginationParams } from '@/core/repositories/i-pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswerRepository {
  findById(id: string): Promise<Answer | null>
  findAllByQuestionId(
    questionId: string,
    { page }: IPaginationParams,
  ): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  update(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
