import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'

export namespace SignupUseCase {

  export interface Input {
    name: string
    email: string
    password: string
  }

  export interface Output {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
  }

  export class UseCase {
    constructor (private readonly userRepository: UserRepository.Repository) {
    }

    async execute (input: Input): Promise<Output> {
      const { email, name, password } = input
      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
      }
      await this.userRepository.emailExists(email)
      const entity = new UserEntity(input)
      await this.userRepository.insert(entity)
      return entity.toJSON()
    }
  }
}
