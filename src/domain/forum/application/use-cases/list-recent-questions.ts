import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface ListRecentQuestionsRequest {
  page: number
}

type ListRecentQuestionsResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsRequest): Promise<ListRecentQuestionsResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
