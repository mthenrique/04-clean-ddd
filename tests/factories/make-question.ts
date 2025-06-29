import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  IQuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityId,
): Question {
  const question = Question.create(
    {
      authorId: new UniqueEntityId('1'),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
