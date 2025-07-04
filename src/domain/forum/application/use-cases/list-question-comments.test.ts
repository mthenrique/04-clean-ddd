import { ListQuestionCommentsUseCase } from './list-question-comments'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentRepository } from 'tests/repositories/in-memory-question-comment-repository'
import { makeQuestionComment } from 'tests/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository
let sut: ListQuestionCommentsUseCase

describe('ListQuestionCommentsUseCaseUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository()
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to list all question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to list all question comments with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
