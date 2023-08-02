import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory-repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { UpdatePasswordUseCase } from '../../update-password-usecase'
import { type HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptHashProvider } from '@/user/infra/providers/hash-provider/bcrypt-hash-provider'
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error'

describe('UpdatePasswordUseCase unit tests', () => {
  let sut: UpdatePasswordUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptHashProvider()
    sut = new UpdatePasswordUseCase.UseCase(repository, hashProvider)
  })

  describe('Execute method', () => {
    it('Should throws error when oldPassword not provided', async () => {
      const entity = new UserEntity(UserDataBuilder({}))
      repository.items = [entity]
      await expect(sut.execute({ id: entity.id, oldPassword: '', newPassword: 'newPassword' })).rejects.toThrow(new InvalidPasswordError('Old password and new password are required'))
    })

    it('Should throws error when newPassword not provided', async () => {
      const entity = new UserEntity(UserDataBuilder({ password: 'oldPassword' }))
      repository.items = [entity]
      await expect(sut.execute({ id: entity.id, oldPassword: 'oldPassword', newPassword: '' })).rejects.toThrow(new InvalidPasswordError('Old password and new password are required'))
    })

    it('Should throws error when entity not found', async () => {
      await expect(sut.execute({ id: 'invalidId', oldPassword: 'oldPassword', newPassword: 'newPassword' })).rejects.toThrow(new NotFoundError('Entity not found'))
    })

    it('Should throws error when old password does not match', async () => {
      const hashedPassword = await hashProvider.generateHash('oldPassword')
      const entity = new UserEntity(UserDataBuilder({ password: hashedPassword }))
      repository.items = [entity]
      await expect(sut.execute({ id: entity.id, oldPassword: 'invalidOldPassword', newPassword: 'newPassword' })).rejects.toThrow(new InvalidPasswordError('Old password does not match'))
    })

    it('Should update a password', async () => {
      const spyUpdate = jest.spyOn(repository, 'update')
      const hashedPassword = await hashProvider.generateHash('oldPassword')
      const entity = new UserEntity(UserDataBuilder({ password: hashedPassword }))
      repository.items = [entity]

      const result = await sut.execute({ id: entity.id, oldPassword: 'oldPassword', newPassword: 'newPassword' })

      const checkNewPassword = await hashProvider.compareHash('newPassword', result.password)

      expect(spyUpdate).toHaveBeenCalledTimes(1)
      expect(checkNewPassword).toBeTruthy()
    })
  })
})
