import { InMemoryQuestionCommentRepository } from 'tests/repositories/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { makeQuestion } from 'tests/factories/make-question'

describe('CommentOnQuestionUseCase', () => {
  let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
  let inMemoryQuestionRepository: InMemoryQuestionRepository
  let sut: CommentOnQuestionUseCase

  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionRepository.create(question)

    const { questionComment } = await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'Example Comment',
    })

    expect(questionComment).toBeTruthy()
    expect(questionComment.content).toEqual('Example Comment')
    expect(questionComment.authorId.toString()).toEqual('author-1')
  })

  it('should not be able to comment on a non-existing question', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        questionId: 'non-existing-question-id',
        content: 'Example Comment',
      }),
    ).rejects.toThrow('Question not found')
  })
})
