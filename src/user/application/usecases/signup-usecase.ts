import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { type HashProvider } from '@/shared/application/providers/hash-provider'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { UserOutputMapper, type UserOutput } from '../dtos/user-output'
import { type UseCase as DefaultUseCase } from '@/shared/application/usecases/usecase'

export namespace SignupUseCase {

  export interface Input {
    name: string
    email: string
    password: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor (
      private readonly userRepository: UserRepository.Repository,
      private readonly hashProvider: HashProvider
    ) {
    }

    async execute (input: Input): Promise<Output> {
      const { email, name, password } = input
      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
      }
      await this.userRepository.emailExists(email)
      const hashedPassword = await this.hashProvider.generateHash(password)
      const entity = new UserEntity({
        name,
        email,
        password: hashedPassword
      })
      await this.userRepository.insert(entity)
      return UserOutputMapper.toOutput(entity)
    }
  }
}
