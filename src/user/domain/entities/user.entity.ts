import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorFactory } from '../validators/user-validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export interface UserUpdateProps {
  name: string
}

export interface UserProps {
  name: string
  email: string
  password: string
  createdAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor (public readonly props: UserProps, id?: string) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  update ({ name }: UserUpdateProps): void {
    UserEntity.validate({ ...this.props, name })
    this.name = name
  }

  updatePassword (password: string): void {
    UserEntity.validate({ ...this.props, password })
    this.password = password
  }

  get name () {
    return this.props.name
  }

  private set name (name: string) {
    this.props.name = name
  }

  get email () {
    return this.props.email
  }

  get password () {
    return this.props.password
  }

  private set password (password: string) {
    this.props.password = password
  }

  get createdAt () {
    return this.props.createdAt
  }

  static validate (props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
