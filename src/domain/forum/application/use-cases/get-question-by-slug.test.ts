import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'tests/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('GetQuestionBySlugUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('sample-question'),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({ slug: newQuestion.slug.value })

    expect(result.question.id).toEqual(newQuestion.id)
    expect(result.question.title).toBe(newQuestion.title)
  })
})
