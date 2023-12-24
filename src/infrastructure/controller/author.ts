import {
  AuthorDTO,
  CreateAuthorDTO,
  UpdateAuthorDTO,
} from '@domain/author/dto';
import { AuthorServiceImp } from '@domain/author/interfaces';
import { JwtAuthGuard } from '@domain/jwt';
import { CurrentUser } from '@domain/jwt/current-user.decorator';
import { Role } from '@domain/jwt/role.enum';
import { Roles } from '@domain/jwt/roles.decorator';
import { RolesGuard } from '@domain/jwt/roles.guard';
import { UserTokenDTO } from '@domain/user/dto';
import {
  Controller,
  Logger,
  Inject,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AUTHOR_SERVICE } from '@shared/utils/constants';

@Controller()
export class AuthorController {
  private readonly logger = new Logger(AuthorController.name);
  constructor(
    @Inject(AUTHOR_SERVICE)
    private readonly authorService: AuthorServiceImp,
  ) {}

  @Get('/:id')
  async author(@Param('id') id: string): Promise<AuthorDTO> {
    this.logger.log('Author');

    return this.authorService.getAuthor(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  createAuthor(
    @Body() input: CreateAuthorDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<AuthorDTO> {
    this.logger.log(`Create Author - id ${input.name}`);

    return this.authorService.createAuthor({
      ...input,
      adminId: id,
    });
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  updateAuthor(
    @Body() input: UpdateAuthorDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update Author');

    return this.authorService.updateAuthor({
      ...input,
      adminId: id,
    });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  deleteAuthor(@Param('id') id: string): Promise<boolean> {
    this.logger.log('Delete Author');

    return this.authorService.deleteAuthor(id);
  }
}
