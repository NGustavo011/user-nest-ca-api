import { type SignupUseCase } from '@/user/application/usecases/signup-usecase'

export class SignupDto implements SignupUseCase.Input {
  name: string
  email: string
  password: string
}
