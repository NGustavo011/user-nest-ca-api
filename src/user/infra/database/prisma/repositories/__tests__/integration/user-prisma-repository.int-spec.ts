import { PrismaClient } from '@prisma/client'
import { setupPrismaTests } from '@/shared/infra/database/prisma/testing/setup-prisma-tests'
import { UserPrismaRepository } from '../../user-prisma-repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { DatabaseModule } from '@/shared/infra/database/database.module'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'

describe('UserModelMapper integration tests', () => {
  const prismaClient = new PrismaClient()
  let sut: UserPrismaRepository
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let module: TestingModule

  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaClient)]
    }).compile()
  })

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaClient as any)
    await prismaClient.user.deleteMany()
  })

  describe('FindById method', () => {
    it('Should throws error when entity not found', async () => {
      await expect(sut.findById('invalidId')).rejects.toThrow(new NotFoundError('UserModel not found using ID invalidId'))
    })

    it('Should finds a entity by id', async () => {
      const entity = new UserEntity(UserDataBuilder({}))
      const newUser = await prismaClient.user.create({
        data: entity.toJSON()
      })
      const output = await sut.findById(newUser.id)
      expect(output.toJSON()).toStrictEqual(entity.toJSON())
    })
  })
})
