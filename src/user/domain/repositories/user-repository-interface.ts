import { type UserEntity } from '../entities/user.entity'
import { type SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository-interface'

export interface UserRepositoryInterface extends SearchableRepositoryInterface <UserEntity, any, any> {
  findByEmail: (email: string) => Promise<UserEntity>
  emailExists: (email: string) => Promise<void>
}
