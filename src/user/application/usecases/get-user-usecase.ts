import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { type UserOutput } from '../dtos/user-output'
import { type UseCase as DefaultUseCase } from '@/shared/application/usecases/usecase'

export namespace GetUserUseCase {

  export interface Input {
    id: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor (
      private readonly userRepository: UserRepository.Repository
    ) {
    }

    async execute (input: Input): Promise<Output> {
      const { id } = input
      const entity = await this.userRepository.findById(id)
      return entity.toJSON()
    }
  }
}
