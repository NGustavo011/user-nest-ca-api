import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'
import { UserValidatorFactory, type UserValidator, UserRules } from '../../user-validator'

describe('UserValidator unit tests', () => {
  let sut: UserValidator

  beforeEach(() => {
    sut = UserValidatorFactory.create()
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
        ...UserDataBuilder({}),
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
        ...UserDataBuilder({}),
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
        ...UserDataBuilder({}),
        name: 'a'.repeat(256)
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(
        [
          'name must be shorter than or equal to 255 characters'
        ]
      )
    })

    it('Valid case for name field', () => {
      const props = UserDataBuilder({})
      const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRules(props))
    })
  })
})
