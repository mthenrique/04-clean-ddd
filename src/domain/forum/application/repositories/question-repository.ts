import { IPaginationParams } from '@/core/repositories/i-pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: IPaginationParams): Promise<Question[]>
  create(question: Question): Promise<void>
  update(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
