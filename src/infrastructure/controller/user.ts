import { JwtAuthGuard, CurrentUser, Roles, Role } from '@domain/jwt';
import { UserDTO, UserTokenDTO, UpdateUserDTO } from '@domain/user/dto';
import { UserServiceImp } from '@domain/user/interfaces';
import {
  Controller,
  Logger,
  Inject,
  Get,
  Param,
  Put,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';
import { USER_SERVICE } from '@shared/utils/constants';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceImp,
  ) {}

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserDTO> {
    this.logger.log('getUser');

    return this.userService.getUser(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() userTokenData: UserTokenDTO,
    @Body() input: UpdateUserDTO,
  ): Promise<string> {
    this.logger.log('Update user');

    const message = await this.userService.updateUser(input, userTokenData);
    return message;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  deleteAuthor(@Param('id') id: string): Promise<boolean> {
    this.logger.log('Delete Author');

    return this.userService.deleteUser(id);
  }
}
