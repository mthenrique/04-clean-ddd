import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('EditAnswerUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'This is the updated content of the answer.',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'This is the updated content of the answer.',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(answer)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
        content: 'This is the updated content of the answer.',
      }),
    ).rejects.toThrow('Not allowed to edit this answer')
  })
})
