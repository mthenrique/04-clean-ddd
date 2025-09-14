import { InMemoryAnswerCommentRepository } from 'tests/repositories/in-memory-answer-comment-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { makeAnswer } from 'tests/factories/make-answer'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryAnswerAttachmentsRepository } from 'tests/repositories/in-memory-answer-attachments-repository'

describe('CommentOnAnswerUseCase', () => {
  let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
  let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
  let inMemoryAnswerRepository: InMemoryAnswerRepository
  let sut: CommentOnAnswerUseCase

  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Example Comment',
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Example Comment',
    )
  })

  it('should not be able to comment on a non-existing answer', async () => {
    const result = await sut.execute({
      authorId: 'author-1',
      answerId: 'non-existing-answer-id',
      content: 'Example Comment',
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
