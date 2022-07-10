import { DataSource, ILike, Repository } from 'typeorm';
import { ILiteraryWorkRepository } from '@modules/LiteraryWork/interfaces';
import { LiteraryWork } from './literaryWork.entity';
import {
  CreateLiteraryWorkRepository,
  getAllLiteraryWork,
  LiteraryWorkDtoCollectionRepository,
  UpdateLiteraryWorkRepository,
} from '@modules/LiteraryWork/Dto';
import { Injectable, Logger } from '@nestjs/common';
import { Language } from '@shared/enum';

@Injectable()
export class LiteraryWorkRepository implements ILiteraryWorkRepository {
  private readonly repository: Repository<LiteraryWork>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(LiteraryWork);
  }
  async getUserLiteraryWorks(
    userId: string,
    language: Language,
  ): Promise<LiteraryWorkDtoCollectionRepository[]> {
    this.logger.log('getUserLiteraryWorks: ' + userId + ' ' + language);

    const literaryWorks = await this.repository.query(
      `select
      lw.id as id,
      lw.name as name,
      lw."country",
      lw."imageUrl",
      lw."publisher",
      lw."bagShape",
      lw."originalPublisher",
      lw."publisher",
      lw."dimensions",
      lw."status",
      lw."categories",
      lw."type",
      lw."paperType",
      lw."releaseFrequency",
      lw."startOfPublication",
      lw."endOfPublication",
      lw."createdAt",
      lw."updatedAt",
      "edition",
      adquiredvolumes as "adquiredVolumes",
      totalVolumes as "totalVolumes",
      registeredBy."name" as "registeredBy",
      updatedBy."name" as "updatedBy",
      a1."name"  as "ilustratorBy",
      a."name" as "writterBy",
      i."synopsis"
    from
      "literaryWorks" lw
    inner join users registeredBy on
      registeredBy."id" = lw."registeredById"
    left join internationalizations i on
      i."language" = '${language}' and i."literaryWorkId" = lw.id
    inner join users updatedBy on
      registeredBy."id" = lw."updatedById"
    inner join authors a on
      a."id" = lw."writterById"
    inner join authors a1 on
      a1."id" = lw."ilustratorById"
    inner join (
      select
        count(v."literaryWorkId") as adquiredVolumes,
        v."literaryWorkId" as literary
      from
        "userVolumes" uv
      inner join volumes v on
        uv."volumeId" = v."id"
        and uv."userId" = '101102962398390474542'
      group by
        v."literaryWorkId" ) sx on
      sx.literary = lw.id
    inner join (
      select
        count(v."literaryWorkId") as totalVolumes,
        v."literaryWorkId" as literary
      from
        volumes v
      group by
        v."literaryWorkId" ) st on
      st.literary = lw.id
    where
      lw.id in (
      select
        distinct "literaryWorkId"
      from
        "volumes" v
      left join "userVolumes" uv on
        uv."volumeId" = v.id
      where
        uv."userId" = '${userId}' )
    `,
    );

    return literaryWorks;
  }

  async getAllLiteraryWork(data: getAllLiteraryWork): Promise<LiteraryWork[]> {
    const literaryWorks = await this.repository.find({
      relations: [
        'internationalization',
        'registeredBy',
        'updatedBy',
        'writterBy',
        'ilustratorBy',
      ],
      skip: data.offset,
      take: data.limit,
      where: {
        ...(data.name && { name: ILike(`%${data.name}%`) }),
      },
    });

    return literaryWorks;
  }
  private readonly logger = new Logger('LiteraryWork repository');

  async getLiteraryWork(
    id: string,
    relationsList: string[] = [
      'internationalization',
      'registeredBy',
      'updatedBy',
      'writterBy',
      'ilustratorBy',
    ],
  ): Promise<LiteraryWork> {
    this.logger.log('getLiteraryWork: ' + id);

    const literaryWork = await this.repository.findOne({
      where: { id: id },
      relations: relationsList,
      loadRelationIds: {
        relations: relationsList,
      },
    });

    return literaryWork;
  }
  createAndSaveLiteraryWork(
    data: CreateLiteraryWorkRepository,
  ): Promise<LiteraryWork> {
    this.logger.log('createAndSaveLiteraryWork: ' + JSON.stringify(data));

    const literaryWork = this.repository.create(data);

    return this.repository.save(literaryWork);
  }
  async updateLiteraryWork(
    data: UpdateLiteraryWorkRepository,
  ): Promise<boolean> {
    this.logger.log('updateLiteraryWork: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteLiteraryWork(id: string): Promise<boolean> {
    this.logger.log('deleteLiteraryWork ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
