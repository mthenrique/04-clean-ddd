import { InMemoryQuestionCommentRepository } from 'tests/repositories/in-memory-question-comment-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'tests/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('DeleteQuestionCommentUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()
    await inMemoryQuestionCommentRepository.create(questionComment)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionCommentRepository.create(questionComment)

    const result = await sut.execute({
      authorId: 'author-2',
      questionCommentId: questionComment.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
