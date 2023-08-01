import { type Entity } from '../entities/entity'
import { InMemoryRepository } from './in-memory-repository'
import { type SearchableRepositoryInterface } from './searchable-repository-interface'

export abstract class InMemorySearchableRepository<E extends Entity> extends InMemoryRepository<E> implements SearchableRepositoryInterface<E, any, any> {
  async search (props: any): Promise<any> {

  }
}
