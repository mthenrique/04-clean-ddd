import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-question-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-time'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'tests/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let sut: ChooseQuestionBestAnswerUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe('ChooseQuestionBestTimeUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    )
  })

  it('should be able to choose the best time for a question', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionRepository.create(question)

    const answer = makeAnswer(
      {
        questionId: question.id,
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose the best time for a question from another user', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionRepository.create(question)

    const answer = makeAnswer(
      {
        questionId: question.id,
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: answer.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
