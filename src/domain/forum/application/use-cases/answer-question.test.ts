import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('AnswerQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer for a question', async () => {
    const result = await sut.execute({
      instructorId: 'instructor-1',
      questionId: 'question-1',
      content: 'This is an answer to the question.',
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
  })
})
