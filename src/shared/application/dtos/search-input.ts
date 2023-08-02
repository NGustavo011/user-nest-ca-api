import { type SortDirection } from '@/shared/domain/repositories/searchable-repository-interface'

export interface SearchInput<Filter=string> {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}
