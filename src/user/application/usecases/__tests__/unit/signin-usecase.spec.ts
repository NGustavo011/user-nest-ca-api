import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { type HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptHashProvider } from '@/user/infra/providers/hash-provider/bcrypt-hash-provider'
import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory-repository'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { SigninUseCase } from '../../signin-usecase'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('SigninUseCase unit tests', () => {
  let sut: SigninUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptHashProvider()
    sut = new SigninUseCase.UseCase(repository, hashProvider)
  })

  describe('Execute method', () => {
    it('Should authenticate a user', async () => {
      const spyFindByEmail = jest.spyOn(repository, 'findByEmail')
      const hashedPassword = await hashProvider.generateHash('1234')
      const entity = new UserEntity(UserDataBuilder({ email: 'a@a.com', password: hashedPassword }))
      repository.items = [entity]
      const result = await sut.execute({ email: entity.email, password: '1234' })
      expect(spyFindByEmail).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual(entity.toJSON())
    })

    it('Should throws error when email not provided', async () => {
      const props = { email: null, password: '1234' }
      await expect(sut.execute(props as any)).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should throws error when password not provided', async () => {
      const props = { email: 'a@a.com', password: null }
      await expect(sut.execute(props as any)).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should not be able to authenticate with wrong email', async () => {
      const props = { email: 'a@a.com', password: '1234' }
      await expect(sut.execute(props)).rejects.toBeInstanceOf(NotFoundError)
    })

    it('Should not be able to authenticate with wrong password', async () => {
      const hashedPassword = await hashProvider.generateHash('1234')
      const entity = new UserEntity(UserDataBuilder({ email: 'a@a.com', password: hashedPassword }))
      repository.items = [entity]
      const props = { email: 'a@a.com', password: 'invalidPassword' }
      await expect(sut.execute(props)).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
  })
})
