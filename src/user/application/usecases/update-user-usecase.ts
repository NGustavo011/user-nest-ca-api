import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { UserOutputMapper, type UserOutput } from '../dtos/user-output'
import { type UseCase as DefaultUseCase } from '@/shared/application/usecases/usecase'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

export namespace UpdateUserUseCase {

  export interface Input {
    id: string
    name: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor (
      private readonly userRepository: UserRepository.Repository
    ) {
    }

    async execute (input: Input): Promise<Output> {
      const { id, name } = input
      if (!name) {
        throw new BadRequestError('Input data not provided')
      }
      const entity = await this.userRepository.findById(id)
      entity.update({ name })
      await this.userRepository.update(entity)
      return UserOutputMapper.toOutput(entity)
    }
  }
}
