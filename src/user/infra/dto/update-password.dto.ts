import { type UpdatePasswordUseCase } from '@/user/application/usecases/update-password-usecase'

export class UpdatePasswordDto implements Omit<UpdatePasswordUseCase.Input, 'id'> {
  oldPassword: string
  newPassword: string
}
