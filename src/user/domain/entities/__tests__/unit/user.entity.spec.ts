import { UserEntity, type UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  let sut: UserEntity
  let props: UserProps

  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })
  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
    expect(UserEntity.validate).toHaveBeenCalled()
  })

  describe('Getters', () => {
    it('Getter of name field', () => {
      expect(sut.props.name).toBeDefined()
      expect(sut.props.name).toEqual(props.name)
      expect(typeof sut.props.name).toBe('string')
    })

    it('Getter of email field', () => {
      expect(sut.props.email).toBeDefined()
      expect(sut.props.email).toEqual(props.email)
      expect(typeof sut.props.email).toBe('string')
    })

    it('Getter of password field', () => {
      expect(sut.props.password).toBeDefined()
      expect(sut.props.password).toEqual(props.password)
      expect(typeof sut.props.password).toBe('string')
    })

    it('Getter of createdAt field', () => {
      expect(sut.props.createdAt).toBeDefined()
      expect(sut.props.createdAt).toBeInstanceOf(Date)
    })
  })

  describe('Setters', () => {
    it('Setter of name field', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      sut['name'] = 'other_name'
      expect(sut.props.name).toEqual('other_name')
    })

    it('Getter of email field', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      sut['password'] = 'other_password'
      expect(sut.props.password).toEqual('other_password')
    })

    it('Getter of password field', () => {
      expect(sut.props.password).toBeDefined()
      expect(sut.props.password).toEqual(props.password)
      expect(typeof sut.props.password).toBe('string')
    })

    it('Getter of createdAt field', () => {
      expect(sut.props.createdAt).toBeDefined()
      expect(sut.props.createdAt).toBeInstanceOf(Date)
    })
  })

  describe('Methods', () => {
    it('Should update a user', () => {
      sut.update({ name: 'other_name' })
      expect(UserEntity.validate).toHaveBeenCalled()
      expect(sut.props.name).toEqual('other_name')
    })

    it('Should update the password field', () => {
      sut.updatePassword('other_password')
      expect(UserEntity.validate).toHaveBeenCalled()
      expect(sut.props.password).toEqual('other_password')
    })
  })
})
