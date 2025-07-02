import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { ListRecentQuestionsUseCase } from './list-recent-questions'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: ListRecentQuestionsUseCase

describe('ListRecentQuestionsUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new ListRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to list recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 20) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toHaveLength(3)
    expect(questions[0].createdAt).toEqual(new Date(2023, 0, 20))
  })

  it('should be able to list recent questions with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
