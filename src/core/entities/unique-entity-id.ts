import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private readonly id: string

  constructor(id?: string) {
    this.id = id ?? this.generateUniqueId()
  }

  private generateUniqueId(): string {
    return randomUUID()
  }

  public toString(): string {
    return this.id
  }

  public toValue(): string {
    return this.id
  }
}
