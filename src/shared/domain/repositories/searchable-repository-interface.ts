import { type Entity } from '../entities/entity'
import { type RepositoryInterface } from './repository-interface'

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput
> extends RepositoryInterface<E> {
  search: (props: SearchInput) => Promise<SearchOutput>
}
