import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repositories'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed to edit this answer')
    }

    answer.content = content

    await this.answerRepository.update(answer)

    return { answer }
  }
}
