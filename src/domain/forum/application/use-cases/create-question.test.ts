import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('CreateQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create new question', async () => {
    const result = await sut.execute({
      authorId: 'author-1',
      title: 'new question title',
      content: 'This is a new question content.',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
