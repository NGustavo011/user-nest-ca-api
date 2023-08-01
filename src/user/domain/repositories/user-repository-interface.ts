import { type RepositoryInterface } from '@/shared/domain/repositories/repository-interface'
import { type UserEntity } from '../entities/user.entity'

export interface UserRepositoryInterface extends RepositoryInterface <UserEntity> {
  findByEmail: (email: string) => Promise<UserEntity>
  emailExists: (email: string) => Promise<void>
}
