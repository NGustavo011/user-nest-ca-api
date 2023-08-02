import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory-repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { UpdateUserUseCase } from '../../update-user-usecase'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { UserEntity } from '@/user/domain/entities/user.entity'

describe('UpdateUserUseCase unit tests', () => {
  let sut: UpdateUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UpdateUserUseCase.UseCase(repository)
  })

  describe('Execute method', () => {
    it('Should throws error when name not provided', async () => {
      const props = Object.assign(UserDataBuilder({}), { name: null })
      await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should throws error when entity not found', async () => {
      await expect(sut.execute({ id: 'invalidId', name: 'newName' })).rejects.toThrow(new NotFoundError('Entity not found'))
    })

    it('Should update a user', async () => {
      const spyUpdate = jest.spyOn(repository, 'update')
      const items = [new UserEntity(UserDataBuilder({}))]
      repository.items = items

      const result = await sut.execute({ id: items[0].id, name: 'newName' })
      expect(spyUpdate).toHaveBeenCalledTimes(1)
      expect(result).toMatchObject({
        id: items[0].id,
        name: 'newName',
        email: items[0].email,
        password: items[0].password,
        createdAt: items[0].createdAt
      })
    })
  })
})
