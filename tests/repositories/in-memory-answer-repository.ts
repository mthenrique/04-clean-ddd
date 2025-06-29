import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repositories'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async update(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    if (index !== -1) {
      this.items[index] = answer
    }
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
