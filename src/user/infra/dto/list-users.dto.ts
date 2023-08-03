import { type SortDirection } from '@/shared/domain/repositories/searchable-repository-interface'
import { type ListUsersUseCase } from '@/user/application/usecases/list-users-usecase'

export class ListUsersDto implements ListUsersUseCase.Input {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: string
}
