import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { UserEntity, type UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserProps = { ...UserDataBuilder({}), name: null as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), name: '' as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), name: 1 as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), name: 'a'.repeat(256) as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
  })
})
