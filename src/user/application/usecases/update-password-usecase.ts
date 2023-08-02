import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { UserOutputMapper, type UserOutput } from '../dtos/user-output'
import { type UseCase as DefaultUseCase } from '@/shared/application/usecases/usecase'
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error'
import { type HashProvider } from '@/shared/application/providers/hash-provider'

export namespace UpdatePasswordUseCase {

  export interface Input {
    id: string
    oldPassword: string
    newPassword: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor (
      private readonly userRepository: UserRepository.Repository,
      private readonly hashProvider: HashProvider
    ) {
    }

    async execute (input: Input): Promise<Output> {
      const { id, newPassword, oldPassword } = input
      const entity = await this.userRepository.findById(id)
      if (!newPassword || !oldPassword) {
        throw new InvalidPasswordError('Old password and new password are required')
      }
      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, entity.password)
      if (!checkOldPassword) {
        throw new InvalidPasswordError('Old password does not match')
      }
      const hashedPassword = await this.hashProvider.generateHash(newPassword)
      entity.updatePassword(hashedPassword)
      await this.userRepository.update(entity)
      return UserOutputMapper.toOutput(entity)
    }
  }
}
