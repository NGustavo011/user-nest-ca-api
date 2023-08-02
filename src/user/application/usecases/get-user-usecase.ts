import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'

export namespace GetUserUseCase {

  export interface Input {
    id: string
  }

  export interface Output {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
  }

  export class UseCase {
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
