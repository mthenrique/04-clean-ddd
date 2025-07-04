import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { CreateQuestionUseCase } from './create-question'

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
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(
      result.value?.question.id,
    )
  })
})
