import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: { page: number },
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
