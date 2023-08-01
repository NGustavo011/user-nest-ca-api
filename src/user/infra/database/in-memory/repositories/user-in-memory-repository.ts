import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository'
import { type SortDirection } from '@/shared/domain/repositories/searchable-repository-interface'
import { type UserEntity } from '@/user/domain/entities/user.entity'
import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'

export class UserInMemoryRepository extends InMemorySearchableRepository<UserEntity> implements UserRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt']
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

  protected async applyFilter (items: UserEntity[], filter: UserRepository.Filter): Promise<UserEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort (items: UserEntity[], sort: string | null, sortDir: SortDirection | null): Promise<UserEntity[]> {
    return !sort ? await super.applySort(items, 'createdAt', 'desc') : await super.applySort(items, sort, sortDir)
  }
}
