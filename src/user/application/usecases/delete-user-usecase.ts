import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { type UseCase as DefaultUseCase } from '@/shared/application/usecases/usecase'

export namespace DeleteUserUseCase {

  export interface Input {
    id: string
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor (
      private readonly userRepository: UserRepository.Repository
    ) {
    }

    async execute (input: Input): Promise<Output> {
      const { id } = input
      await this.userRepository.delete(id)
    }
  }
}
