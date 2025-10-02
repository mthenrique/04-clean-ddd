import { describe, it, expect, beforeEach } from 'vitest'
import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from 'tests/repositories/in-memory-notification-repository'

let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: 'recipient-1',
      title: 'New notification',
      content: 'You have a new notification',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items).toHaveLength(1)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
