import { PrismaClient, type User } from '@prisma/client'
import { UserModelMapper } from '../../user-model-mapper'
import { ValidationError } from '@/shared/domain/errors/validation-error'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { setupPrismaTests } from '@/shared/infra/database/prisma/testing/setup-prisma-tests'

describe('UserModelMapper integration tests', () => {
  let prismaClient: PrismaClient
  let props: any

  beforeAll(async () => {
    setupPrismaTests()
    prismaClient = new PrismaClient()
    await prismaClient.$connect()
  })

  beforeEach(async () => {
    await prismaClient.user.deleteMany()
    props = {
      id: 'af6e5f44-fc23-468e-8d93-4a7481425397',
      name: 'Gustavo Pato',
      email: 'gpato@gmail.com',
      password: '1234',
      createdAt: new Date()
    }
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  it('Should throws error when user model is invalid', async () => {
    const model: User = Object.assign(props, { name: null })
    expect(() => UserModelMapper.toEntity(model)).toThrow(ValidationError)
  })

  it('Should convert a user model to a user entity', async () => {
    const model: User = await prismaClient.user.create({
      data: props
    })
    const sut = UserModelMapper.toEntity(model)
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.toJSON()).toStrictEqual(props)
  })
})
