import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { type PrismaService } from '@/shared/infra/database/prisma/prisma.service'
import { type UserEntity } from '@/user/domain/entities/user.entity'
import { type UserRepository } from '@/user/domain/repositories/user-repository-interface'
import { UserModelMapper } from '../models/user-model-mapper'
import { type User } from '@prisma/client'

export class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[]
  constructor (private readonly prismaService: PrismaService) {
  }

  findByEmail: (email: string) => Promise<UserEntity>
  emailExists: (email: string) => Promise<void>
  search: (props: UserRepository.SearchParams) => Promise<UserRepository.SearchResult>
  insert: (entity: UserEntity) => Promise<void>

  async findById (id: string): Promise<UserEntity> {
    return await this._get(id)
  }

  findAll: () => Promise<UserEntity[]>
  update: (entity: UserEntity) => Promise<void>
  delete: (id: string) => Promise<void>

  protected async _get (id: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({ where: { id } })
      return UserModelMapper.toEntity(user as User)
    } catch {
      throw new NotFoundError(`UserModel not found using ID ${id}`)
    }
  }
}
