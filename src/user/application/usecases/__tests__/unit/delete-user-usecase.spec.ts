import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory-repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { DeleteUserUseCase } from '../../delete-user-usecase'

describe('DeleteUserUseCase unit tests', () => {
  let sut: DeleteUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new DeleteUserUseCase.UseCase(repository)
  })

  describe('Execute method', () => {
    it('Should throws error when entity not found', async () => {
      await expect(sut.execute({ id: 'invalidId' })).rejects.toThrow(new NotFoundError('Entity not found'))
    })

    it('Should delete a user', async () => {
      const spyDelete = jest.spyOn(repository, 'delete')
      await repository.insert(new UserEntity(UserDataBuilder({})))
      expect(repository.items).toHaveLength(1)
      await sut.execute({ id: repository.items[0].id })
      expect(spyDelete).toHaveBeenCalledTimes(1)
      expect(repository.items).toHaveLength(0)
    })
  })
})
