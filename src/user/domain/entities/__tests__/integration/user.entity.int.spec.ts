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

    it('Should create a valid user', () => {
      const props: UserProps = UserDataBuilder({})
      expect(() => new UserEntity(props)).not.toThrow()
    })
  })

  describe('Update method', () => {
    let entity: UserEntity
    beforeEach(() => {
      entity = new UserEntity(UserDataBuilder({}))
    })

    it('Should throw an error when update a user with invalid name', () => {
      expect(() => { entity.update({ name: null as any }) }).toThrowError(EntityValidationError)
      expect(() => { entity.update({ name: '' as any }) }).toThrowError(EntityValidationError)
      expect(() => { entity.update({ name: 10 as any }) }).toThrowError(EntityValidationError)
      expect(() => { entity.update({ name: 'a'.repeat(256) as any }) }).toThrowError(EntityValidationError)
    })

    it('Should update a valid user', () => {
      expect(() => { entity.update({ name: 'valid_name' }) }).not.toThrow()
    })
  })

  describe('UpdatePassword method', () => {
    let entity: UserEntity
    beforeEach(() => {
      entity = new UserEntity(UserDataBuilder({}))
    })

    it('Should throw an error when updatePassword a user with invalid name', () => {
      expect(() => { entity.updatePassword(null as any) }).toThrowError(EntityValidationError)
      expect(() => { entity.updatePassword('' as any) }).toThrowError(EntityValidationError)
      expect(() => { entity.updatePassword(10 as any) }).toThrowError(EntityValidationError)
      expect(() => { entity.updatePassword('a'.repeat(101) as any) }).toThrowError(EntityValidationError)
    })

    it('Should updatePassword a valid user', () => {
      expect(() => { entity.updatePassword('valid_password') }).not.toThrow()
    })
  })
})
