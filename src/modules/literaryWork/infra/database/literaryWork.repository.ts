import { DataSource, Repository } from 'typeorm';
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
    collectionId: string,
    language: Language,
  ): Promise<LiteraryWorkDtoCollectionRepository[]> {
    this.logger.log('getUserLiteraryWorks: ' + collectionId + ' ' + language);

    const literaryWorks = await this.repository.query(
      `select
      lw.id as id,
      lw.name as name,
      lw."imageUrl",
      lw."publisher",
      "edition",
      adquiredvolumes as "adquiredVolumes",
      totalVolumes as "totalVolumes"
    from
      "literaryWorks" lw
    inner join (
      select
        count(v."literaryWorkId") as adquiredVolumes,
        v."literaryWorkId" as literary
      from
        "userVolumes" uv
      inner join volumes v on
        uv."volumeId" = v."id"
        and uv."collectionId" = '${collectionId}'
      group by
        v."literaryWorkId" ) sx on sx.literary = lw.id
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
        uv."collectionId" = '${collectionId}' )
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
    });
    return literaryWorks;
  }
  private readonly logger = new Logger('LiteraryWork repository');

  async getLiteraryWork(id: string): Promise<LiteraryWork> {
    this.logger.log('getLiteraryWork: ' + id);

    const literaryWork = await this.repository.findOne({
      where: { id: id },
      relations: [
        'internationalization',
        'registeredBy',
        'updatedBy',
        'writterBy',
        'ilustratorBy',
      ],
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
