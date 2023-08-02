import { UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { UserOutputMapper, type UserOutput } from '../dtos/user-output'
import { type UseCase as DefaultUseCase } from '@/shared/application/usecases/usecase'
import { type SearchInput } from '@/shared/application/dtos/search-input'
import { PaginationOutputMapper, type PaginationOutput } from '@/shared/application/dtos/pagination-output'

export namespace ListUsersUseCase {

  export type Input = SearchInput

  export type Output = PaginationOutput<UserOutput>

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor (
      private readonly userRepository: UserRepository.Repository
    ) {
    }

    async execute (input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input)
      const searchResult = await this.userRepository.search(params)
      return this.toOutput(searchResult)
    }

    private toOutput (searchResult: UserRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return UserOutputMapper.toOutput(item)
      })
      return PaginationOutputMapper.toOutput(items, searchResult)
    }
  }
}
