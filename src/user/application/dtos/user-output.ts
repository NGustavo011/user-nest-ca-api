import { type UserEntity } from '@/user/domain/entities/user.entity'

export interface UserOutput {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export class UserOutputMapper {
  static toOutput (entity: UserEntity): UserOutput {
    return entity.toJSON()
  }
}
