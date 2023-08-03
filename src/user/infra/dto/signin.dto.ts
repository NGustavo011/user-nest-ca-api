import { type SigninUseCase } from '@/user/application/usecases/signin-usecase'

export class SigninDto implements SigninUseCase.Input {
  email: string
  password: string
}
