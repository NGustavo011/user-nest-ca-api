/* eslint-disable @typescript-eslint/dot-notation */
import { type SignupUseCase } from '@/user/application/usecases/signup-usecase'
import { UserController } from '../../user.controller'
import { type UserOutput } from '@/user/application/dtos/user-output'
import { type SignupDto } from '../../dto/signup.dto'
import { type SigninUseCase } from '@/user/application/usecases/signin-usecase'
import { type SigninDto } from '../../dto/signin.dto'
import { type UpdateUserUseCase } from '@/user/application/usecases/update-user-usecase'
import { type UpdateUserDto } from '../../dto/update-user.dto'

describe('UserController unit tests', () => {
  let sut: UserController
  let id: string
  let props: UserOutput

  beforeEach(async () => {
    sut = new UserController()
    id = 'af6e5f44-fc23-468e-8d93-4a7481425397'
    props = {
      id,
      name: 'Gustavo Pato',
      email: 'gpato@gmail.com',
      password: '1234',
      createdAt: new Date()
    }
  })

  it('Should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should create a user', async () => {
    const output: SignupUseCase.Output = props
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    }
    sut['signupUseCase'] = mockSignupUseCase as any
    const input: SignupDto = {
      name: 'Gustavo Pato',
      email: 'gpato@gmail.com',
      password: '1234'
    }
    const result = await sut.create(input)
    expect(output).toMatchObject(result)
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should authenticate a user', async () => {
    const output: SigninUseCase.Output = props
    const mockSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    }
    sut['signinUseCase'] = mockSigninUseCase as any
    const input: SigninDto = {
      email: 'gpato@gmail.com',
      password: '1234'
    }
    const result = await sut.login(input)
    expect(output).toMatchObject(result)
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should update a user', async () => {
    const output: UpdateUserUseCase.Output = props
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    }
    sut['updateUserUseCase'] = mockUpdateUserUseCase as any
    const input: UpdateUserDto = {
      name: 'newName'
    }
    const result = await sut.update(id, input)
    expect(output).toMatchObject(result)
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })
})
