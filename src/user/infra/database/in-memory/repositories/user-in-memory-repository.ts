import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory-repository'
import { type UserEntity } from '@/user/domain/entities/user.entity'
import { type UserRepositoryInterface } from '@/user/domain/repositories/user-repository-interface'

export class UserInMemoryRepository extends InMemoryRepository<UserEntity> implements UserRepositoryInterface {
  async findByEmail (email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`Entity not found using email ${email}`)
    }
    return entity
  }

  async emailExists (email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError('Email address already in use')
    }
  }
}
