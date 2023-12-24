import { InternationalizationDto } from '@domain/internationalization/dto';
import { CreateInternationalizationBody } from '@domain/internationalization/dto/createInternationalizationBody';
import { UpdateInternationalizationInput } from '@domain/internationalization/dto/internationalizationInput.type';
import { InternationalizationServiceImpl } from '@domain/internationalization/interfaces';
import { JwtAuthGuard } from '@domain/jwt';
import { Role } from '@domain/jwt/role.enum';
import { Roles } from '@domain/jwt/roles.decorator';
import { RolesGuard } from '@domain/jwt/roles.guard';
import {
  UseGuards,
  Logger,
  Inject,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Controller,
} from '@nestjs/common';
import { INTERNATIONALIZATION_SERVICE } from '@shared/utils/constants';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class InternationalizationController {
  private readonly logger = new Logger(InternationalizationController.name);
  constructor(
    @Inject(INTERNATIONALIZATION_SERVICE)
    private readonly internationalizationService: InternationalizationServiceImpl,
  ) {}

  @Get()
  @Roles(Role.Admin)
  async getInternationalization(
    @Body() { id }: { id: string },
  ): Promise<InternationalizationDto> {
    this.logger.log('Get Internationalization');

    return this.internationalizationService.getInternationalization(id);
  }

  @Post()
  @Roles(Role.Admin)
  async createInternationalization(
    @Body() input: CreateInternationalizationBody,
  ): Promise<InternationalizationDto> {
    this.logger.log('Update Internationalization');

    const message =
      await this.internationalizationService.createInternationalization(input);
    return message;
  }

  @Put()
  async updateInternationalization(
    @Body() input: UpdateInternationalizationInput,
  ): Promise<string> {
    this.logger.log('Update Internationalization');

    const message =
      await this.internationalizationService.updateInternationalization(input);
    return message;
  }

  @Delete()
  @Roles(Role.Admin)
  async deleteInternationalization(
    @Body() { id }: { id: string },
  ): Promise<boolean> {
    this.logger.log('Delete Internationalization');

    return await this.internationalizationService.deleteInternationalization(
      id,
    );
  }
}
