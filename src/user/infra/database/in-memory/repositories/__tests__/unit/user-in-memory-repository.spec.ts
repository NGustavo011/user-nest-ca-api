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
})
