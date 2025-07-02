import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repositories'

interface ListQuestionAnswersRequest {
  questionId: string
  page: number
}

interface ListQuestionAnswersResponse {
  answers: Answer[]
}

export class ListQuestionAnswersUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: ListQuestionAnswersRequest): Promise<ListQuestionAnswersResponse> {
    const answers = await this.answerRepository.findAllByQuestionId(
      questionId,
      {
        page,
      },
    )

    return {
      answers,
    }
  }
}
