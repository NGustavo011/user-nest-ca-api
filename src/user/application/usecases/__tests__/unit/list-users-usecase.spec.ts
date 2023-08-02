/* eslint-disable @typescript-eslint/dot-notation */
import { ListUsersUseCase } from '../../list-users-usecase'
import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory-repository'
import { UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'

describe('ListUsersUseCase unit tests', () => {
  let sut: ListUsersUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new ListUsersUseCase.UseCase(repository)
  })
  describe('ToOutput method', () => {
    it('Should make a result without items', () => {
      const result = new UserRepository.SearchResult({
        items: [] as any,
        total: 1,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null
      })
      const output = sut['toOutput'](result)
      expect(output).toStrictEqual({
        items: [],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 2
      })
    })

    it('Should make a result with items', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      const result = new UserRepository.SearchResult({
        items: [entity],
        total: 1,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null
      })
      const output = sut['toOutput'](result)
      expect(output).toStrictEqual({
        items: [entity.toJSON()],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 2
      })
    })
  })

  describe('Execute method', () => {
    it('Should return the users ordered by createdAt', async () => {
      const createdAt = new Date()
      const items = [
        new UserEntity(UserDataBuilder({ createdAt })),
        new UserEntity(UserDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }))
      ]
      repository.items = items
      const output = await sut.execute({})
      expect(output).toStrictEqual({
        items: [...items].reverse().map(item => item.toJSON()),
        total: 2,
        currentPage: 1,
        lastPage: 1,
        perPage: 15
      })
    })

    it('Should return the users using pagination, sort and filter', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ name: 'a' })),
        new UserEntity(UserDataBuilder({ name: 'AA' })),
        new UserEntity(UserDataBuilder({ name: 'Aa' })),
        new UserEntity(UserDataBuilder({ name: 'b' })),
        new UserEntity(UserDataBuilder({ name: 'c' }))
      ]
      repository.items = items
      let output = await sut.execute({
        page: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'a'
      })
      expect(output).toStrictEqual({
        items: [items[1].toJSON(), items[2].toJSON()],
        total: 3,
        currentPage: 1,
        lastPage: 2,
        perPage: 2
      })

      output = await sut.execute({
        page: 2,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'a'
      })
      expect(output).toStrictEqual({
        items: [items[0].toJSON()],
        total: 3,
        currentPage: 2,
        lastPage: 2,
        perPage: 2
      })

      output = await sut.execute({
        page: 1,
        perPage: 3,
        sort: 'name',
        sortDir: 'desc',
        filter: 'a'
      })
      expect(output).toStrictEqual({
        items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
        total: 3,
        currentPage: 1,
        lastPage: 1,
        perPage: 3
      })
    })
  })
})