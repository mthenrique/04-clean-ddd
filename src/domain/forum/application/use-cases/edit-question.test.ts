import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('EditQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'Updated question title',
      content: 'This is the updated content of the question.',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Updated question title',
      content: 'This is the updated content of the question.',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(question)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
        title: 'Updated question title',
        content: 'This is the updated content of the question.',
      }),
    ).rejects.toThrow('Not allowed to edit this question')
  })
})
