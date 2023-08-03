import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { SignupUseCase } from '../application/usecases/signup-usecase'
import { BcryptHashProvider } from './providers/hash-provider/bcrypt-hash-provider'
import { type UserRepository } from '../domain/repositories/user-repository-interface'
import { type HashProvider } from '@/shared/application/providers/hash-provider'
import { SigninUseCase } from '../application/usecases/signin-usecase'
import { GetUserUseCase } from '../application/usecases/get-user-usecase'
import { ListUsersUseCase } from '../application/usecases/list-users-usecase'
import { UpdateUserUseCase } from '../application/usecases/update-user-usecase'
import { UpdatePasswordUseCase } from '../application/usecases/update-password-usecase'
import { DeleteUserUseCase } from '../application/usecases/delete-user-usecase'
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service'
import { UserPrismaRepository } from './database/prisma/repositories/user-prisma-repository'

@Module({
  controllers: [UserController],
  providers:
  [
    {
      provide: 'PrismaService',
      useClass: PrismaService
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
      },
      inject: ['PrismaService']
    },
    {
      provide: 'HashProvider',
      useClass: BcryptHashProvider
    },
    {
      provide: SignupUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: SigninUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider
      ) => {
        return new SigninUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: GetUserUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository
      ) => {
        return new GetUserUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository']
    },
    {
      provide: ListUsersUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository
      ) => {
        return new ListUsersUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository']
    },
    {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository
      ) => {
        return new UpdateUserUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository']
    },
    {
      provide: UpdatePasswordUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider
      ) => {
        return new UpdatePasswordUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: DeleteUserUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository
      ) => {
        return new DeleteUserUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository']
    }
  ]
})
export class UserModule {}
