/* eslint-disable @typescript-eslint/dot-notation */
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserInMemoryRepository } from '../../user-in-memory-repository'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository

  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  describe('FindByEmail method', () => {
    it('Should throw error on findByEmail when user not found', async () => {
      const email = 'a@a.com'
      await expect(sut.findByEmail(email)).rejects.toThrow(
        new NotFoundError(`Entity not found using email ${email}`)
      )
    })

    it('Should find a user when email is exists', async () => {
      const entity = new UserEntity(UserDataBuilder({}))
      await sut.insert(entity)
      const output = await sut.findByEmail(entity.email)
      expect(entity.toJSON()).toStrictEqual(output.toJSON())
    })
  })

  describe('EmailExists method', () => {
    it('Should throw error on emailExists when user with email is founded', async () => {
      const entity = new UserEntity(UserDataBuilder({}))
      await sut.insert(entity)
      await expect(sut.emailExists(entity.email)).rejects.toThrow(new ConflictError('Email address already in use'))
    })

    it('Should not throws error in emailExists when user with email is not found', async () => {
      expect(async () => { await sut.emailExists('a@a.com') }).not.toThrow()
    })
  })

  describe('ApplyFilter method', () => {
    it('Should no filter items when filter object is null', async () => {
      const entity = new UserEntity(UserDataBuilder({}))
      await sut.insert(entity)
      const result = await sut.findAll()
      const spyFilter = jest.spyOn(result, 'filter')
      const itemsFiltered = await sut['applyFilter'](result, null as any)
      expect(spyFilter).not.toHaveBeenCalled()
      expect(itemsFiltered).toStrictEqual(result)
    })

    it('Should filter name field using filter param', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ name: 'Test' })),
        new UserEntity(UserDataBuilder({ name: 'TEST' })),
        new UserEntity(UserDataBuilder({ name: 'fake' }))
      ]
      const spyFilter = jest.spyOn(items, 'filter')
      const itemsFiltered = await sut['applyFilter'](items, 'TEST')
      expect(spyFilter).toHaveBeenCalled()
      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
    })
  })
})
