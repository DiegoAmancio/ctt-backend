import {
  InternationalizationDTO,
  CreateInternationalizationBody,
  UpdateInternationalizationDTO,
} from '@domain/internationalization/dto';
import { InternationalizationServiceImpl } from '@domain/internationalization/interfaces';
import { JwtAuthGuard, RolesGuard, Roles, Role } from '@domain/jwt';
import {
  Controller,
  UseGuards,
  Logger,
  Inject,
  Get,
  Body,
  Post,
  Put,
  Delete,
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
  ): Promise<InternationalizationDTO> {
    this.logger.log('Get Internationalization');

    return this.internationalizationService.getInternationalization(id);
  }

  @Post()
  @Roles(Role.Admin)
  async createInternationalization(
    @Body() input: CreateInternationalizationBody,
  ): Promise<InternationalizationDTO> {
    this.logger.log('Update Internationalization');

    const message =
      await this.internationalizationService.createInternationalization(input);
    return message;
  }

  @Put()
  async updateInternationalization(
    @Body() input: UpdateInternationalizationDTO,
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
