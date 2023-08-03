import { ValidationError } from '@/shared/domain/errors/validation-error'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { type User } from '@prisma/client'

export class UserModelMapper {
  static toEntity (model: User): UserEntity {
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt
    }
    try {
      return new UserEntity(data, model.id)
    } catch {
      throw new ValidationError('An entity not be loaded')
    }
  }
}
