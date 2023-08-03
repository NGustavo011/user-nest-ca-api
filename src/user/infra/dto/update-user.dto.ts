import { type UpdateUserUseCase } from '@/user/application/usecases/update-user-usecase'

export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, 'id'> {
  name: string
}
