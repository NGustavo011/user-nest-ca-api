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
    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = { ...UserDataBuilder({}), email: null as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), email: '' as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), email: 1 as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), email: 'test.com' as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), email: 'a'.repeat(256) as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = { ...UserDataBuilder({}), password: null as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), password: '' as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), password: 1 as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), password: 'a'.repeat(101) as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid createdAt', () => {
      let props: UserProps = { ...UserDataBuilder({}), createdAt: 2023 as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      props = { ...UserDataBuilder({}), createdAt: '2023' as any }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
  })
})
