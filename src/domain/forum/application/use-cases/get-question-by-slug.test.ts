import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('GetQuestionBySlugUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId('1'),
      title: 'Sample Question',
      slug: Slug.create('sample-question'),
      content: 'This is a sample question content.',
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({ slug: newQuestion.slug.value })

    expect(result.question.id).toEqual(newQuestion.id)
    expect(result.question.title).toBe(newQuestion.title)
  })
})
