/* eslint-disable @typescript-eslint/prefer-readonly */
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, Query, Put } from '@nestjs/common'
import { SignupDto } from './dto/signup.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { SignupUseCase } from '../application/usecases/signup-usecase'
import { SigninUseCase } from '../application/usecases/signin-usecase'
import { UpdateUserUseCase } from '../application/usecases/update-user-usecase'
import { UpdatePasswordUseCase } from '../application/usecases/update-password-usecase'
import { DeleteUserUseCase } from '../application/usecases/delete-user-usecase'
import { GetUserUseCase } from '../application/usecases/get-user-usecase'
import { ListUsersUseCase } from '../application/usecases/list-users-usecase'
import { SigninDto } from './dto/signin.dto'
import { ListUsersDto } from './dto/list-users.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'

@Controller('user')
export class UserController {
  @Inject(SignupUseCase.UseCase)
  private signupUseCase: SignupUseCase.UseCase

  @Inject(SigninUseCase.UseCase)
  private signinUseCase: SigninUseCase.UseCase

  @Inject(UpdateUserUseCase.UseCase)
  private updateUserUseCase: UpdateUserUseCase.UseCase

  @Inject(UpdatePasswordUseCase.UseCase)
  private updatePasswordUseCase: UpdatePasswordUseCase.UseCase

  @Inject(DeleteUserUseCase.UseCase)
  private deleteUserUseCase: DeleteUserUseCase.UseCase

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase

  @Inject(ListUsersUseCase.UseCase)
  private listUsersUseCase: ListUsersUseCase.UseCase

  @Post()
  async create (@Body() signupDto: SignupDto) {
    return await this.signupUseCase.execute(signupDto)
  }

  @HttpCode(200)
  @Post('login')
  async login (@Body() signinDto: SigninDto) {
    return await this.signinUseCase.execute(signinDto)
  }

  @Get()
  async search (@Query() searchParams: ListUsersDto) {
    return await this.listUsersUseCase.execute(searchParams)
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    return await this.getUserUseCase.execute({ id })
  }

  @Put(':id')
  async update (@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserUseCase.execute({ id, ...updateUserDto })
  }

  @Patch(':id')
  async updatePassword (@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.updatePasswordUseCase.execute({ id, ...updatePasswordDto })
  }

  @HttpCode(204)
  @Delete(':id')
  async remove (@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }
}
