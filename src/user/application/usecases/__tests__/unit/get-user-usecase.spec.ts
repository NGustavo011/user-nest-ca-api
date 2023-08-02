import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory-repository'
import { GetUserUseCase } from '../../get-user-usecase'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'

describe('GetUserUseCase unit tests', () => {
  let sut: GetUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new GetUserUseCase.UseCase(repository)
  })

  describe('Execute method', () => {
    it('Should throws error when entity not found', async () => {
      await expect(sut.execute({ id: 'invalidId' })).rejects.toThrow(new NotFoundError('Entity not found'))
    })

    it('Should be able to get user profile', async () => {
      const spyFindById = jest.spyOn(repository, 'findById')
      await repository.insert(new UserEntity(UserDataBuilder({})))
      const result = await sut.execute({ id: repository.items[0].id })
      expect(spyFindById).toHaveBeenCalledTimes(1)
      expect(spyFindById).toHaveBeenCalledWith(repository.items[0].id)
      expect(result).toMatchObject({
        id: repository.items[0].id,
        name: repository.items[0].name,
        email: repository.items[0].email,
        password: repository.items[0].password,
        createdAt: repository.items[0].createdAt
      })
    })
  })
})
