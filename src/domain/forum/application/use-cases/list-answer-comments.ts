import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface ListAnswerCommentsRequest {
  answerId: string
  page: number
}

interface ListAnswerCommentsResponse {
  answerComments: AnswerComment[]
}

export class ListAnswerCommentsUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    answerId,
    page,
  }: ListAnswerCommentsRequest): Promise<ListAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return {
      answerComments,
    }
  }
}
