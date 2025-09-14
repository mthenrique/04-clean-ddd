import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  public async findManyByAnswerId(
    answerId: string,
  ): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )
    return Promise.resolve(answerAttachments)
  }

  public async deleteManyByAnswerId(answerId: string): Promise<void> {
    this.items = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )
  }
}
