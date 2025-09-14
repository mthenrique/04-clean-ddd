import { InMemoryQuestionCommentRepository } from 'tests/repositories/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryQuestionAttachmentsRepository } from 'tests/repositories/in-memory-question-attachments-repository'

describe('CommentOnQuestionUseCase', () => {
  let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
  let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
  let inMemoryQuestionRepository: InMemoryQuestionRepository
  let sut: CommentOnQuestionUseCase

  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionRepository.create(question)

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'Example Comment',
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Example Comment',
    )
  })

  it('should not be able to comment on a non-existing question', async () => {
    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'non-existing-question-id',
      content: 'Example Comment',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
