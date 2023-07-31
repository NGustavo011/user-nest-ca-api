import { UserEntity, type UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  let sut: UserEntity
  let props: UserProps

  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })
  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
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
})
