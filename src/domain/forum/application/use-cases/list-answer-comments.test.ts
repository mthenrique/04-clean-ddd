import { ListAnswerCommentsUseCase } from './list-answer-comments'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'tests/repositories/in-memory-answer-comment-repository'
import { makeAnswerComment } from 'tests/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let sut: ListAnswerCommentsUseCase

describe('ListAnswerCommentsUseCaseUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to list all answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to list all answer comments with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
