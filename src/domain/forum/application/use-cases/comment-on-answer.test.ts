import { InMemoryAnswerCommentRepository } from 'tests/repositories/in-memory-answer-comment-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { makeAnswer } from 'tests/factories/make-answer'

describe('CommentOnAnswerUseCase', () => {
  let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
  let inMemoryAnswerRepository: InMemoryAnswerRepository
  let sut: CommentOnAnswerUseCase

  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswerRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Example Comment',
    })

    expect(answerComment).toBeTruthy()
    expect(answerComment.content).toEqual('Example Comment')
    expect(answerComment.authorId.toString()).toEqual('author-1')
  })

  it('should not be able to comment on a non-existing answer', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        answerId: 'non-existing-answer-id',
        content: 'Example Comment',
      }),
    ).rejects.toThrow('Answer not found')
  })
})
