import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { UserValidatorFactory, type UserValidator, UserRules } from '../../user-validator'
import { type UserProps } from '@/user/domain/entities/user.entity'

describe('UserValidator unit tests', () => {
  let sut: UserValidator
  let props: UserProps

  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })

  it('Valid case for user validator class', () => {
    const props = UserDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      const isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(
        [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      )
    })

    it('Invalidation in case of name is empty', () => {
      const isValid = sut.validate({
        ...props,
        name: ''
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(
        [
          'name should not be empty'
        ]
      )
    })

    it('Invalidation in case of name is not a string', () => {
      const isValid = sut.validate({
        ...props,
        name: 1 as any
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(
        [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      )
    })

    it('Invalidation in case of name length is greater 255 characters', () => {
      const isValid = sut.validate({
        ...props,
        name: 'a'.repeat(256)
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(
        [
          'name must be shorter than or equal to 255 characters'
        ]
      )
    })
  })

  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      const isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual(
        [
          'email should not be empty',
          'email must be an email',
          'email must be a string',
          'email must be shorter than or equal to 255 characters'
        ]
      )
    })

    it('Invalidation in case of email is empty', () => {
      const isValid = sut.validate({
        ...props,
        email: ''
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual(
        [
          'email should not be empty',
          'email must be an email'
        ]
      )
    })

    it('Invalidation in case of email is not a string', () => {
      const isValid = sut.validate({
        ...props,
        email: 1 as any
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual(
        [
          'email must be an email',
          'email must be a string',
          'email must be shorter than or equal to 255 characters'
        ]
      )
    })

    it('Invalidation in case of email is not a email format', () => {
      const isValid = sut.validate({
        ...props,
        email: 'test.com'
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual(
        [
          'email must be an email'
        ]
      )
    })

    it('Invalidation in case of email length is greater 255 characters', () => {
      const isValid = sut.validate({
        ...props,
        email: 'a'.repeat(256)
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual(
        [
          'email must be an email',
          'email must be shorter than or equal to 255 characters'
        ]
      )
    })
  })

  describe('Password field', () => {
    it('Invalidation cases for password field', () => {
      const isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors.password).toStrictEqual(
        [
          'password should not be empty',
          'password must be a string',
          'password must be shorter than or equal to 100 characters'
        ]
      )
    })

    it('Invalidation in case of password is empty', () => {
      const isValid = sut.validate({
        ...props,
        password: ''
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.password).toStrictEqual(
        [
          'password should not be empty'
        ]
      )
    })

    it('Invalidation in case of password is not a string', () => {
      const isValid = sut.validate({
        ...props,
        password: 1 as any
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.password).toStrictEqual(
        [
          'password must be a string',
          'password must be shorter than or equal to 100 characters'
        ]
      )
    })

    it('Invalidation in case of password length is greater 100 characters', () => {
      const isValid = sut.validate({
        ...props,
        password: 'a'.repeat(101)
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.password).toStrictEqual(
        [
          'password must be shorter than or equal to 100 characters'
        ]
      )
    })
  })

  describe('CreatedAt field', () => {
    it('Invalidation in case of createdAt is not a date (using number)', () => {
      const isValid = sut.validate({ ...props, createdAt: 2023 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors.createdAt).toStrictEqual(
        [
          'createdAt must be a Date instance'
        ]
      )
    })
    it('Invalidation in case of createdAt is not a date (using string)', () => {
      const isValid = sut.validate({ ...props, createdAt: '2023' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors.createdAt).toStrictEqual(
        [
          'createdAt must be a Date instance'
        ]
      )
    })
  })
})
