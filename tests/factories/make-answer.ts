import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { IAnswerProps, Answer } from '@/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityId,
): Answer {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId('1'),
      questionId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
