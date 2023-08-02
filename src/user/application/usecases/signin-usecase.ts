import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { type HashProvider } from '@/shared/application/providers/hash-provider'
import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { UserOutputMapper, type UserOutput } from '../dtos/user-output'
import { type UseCase as DefaultUseCase } from '@/shared/application/usecases/usecase'
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error'

export namespace SigninUseCase {

  export interface Input {
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
      const { email, password } = input
      if (!email || !password) {
        throw new BadRequestError('Input data not provided')
      }
      const entity = await this.userRepository.findByEmail(email)
      const checkPassword = await this.hashProvider.compareHash(password, entity.password)
      if (!checkPassword) {
        throw new InvalidCredentialsError('Invalid credentials')
      }
      return UserOutputMapper.toOutput(entity)
    }
  }
}
