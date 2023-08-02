import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { SignupUseCase } from '../../signup-usecase'
import { type HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptHashProvider } from '@/user/infra/providers/hash-provider/bcrypt-hash-provider'
import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory-repository'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

describe('SignupUseCase unit tests', () => {
  let sut: SignupUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptHashProvider()
    sut = new SignupUseCase.UseCase(repository, hashProvider)
  })

  describe('Execute method', () => {
    it('Should create a user', async () => {
      const spyInsert = jest.spyOn(repository, 'insert')
      const props = UserDataBuilder({})
      const result = await sut.execute(props)
      expect(result.id).toBeDefined()
      expect(result.createdAt).toBeInstanceOf(Date)
      expect(spyInsert).toHaveBeenCalledTimes(1)
    })

    it('Should not be able to register with same email twice', async () => {
      const props = UserDataBuilder({
        email: 'a@a.com'
      })
      await sut.execute(props)
      await expect(sut.execute(props)).rejects.toBeInstanceOf(ConflictError)
    })

    it('Should throws error when name not provided', async () => {
      const props = Object.assign(UserDataBuilder({}), { name: null })
      await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should throws error when email not provided', async () => {
      const props = Object.assign(UserDataBuilder({}), { email: null })
      await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should throws error when password not provided', async () => {
      const props = Object.assign(UserDataBuilder({}), { password: null })
      await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
    })
  })
})
