import { Language, Status } from '@shared/enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createLiteraryWorks1654550323540 implements MigrationInterface {
  name = 'createLiteraryWorks1654550323540';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'literaryWorks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'bagShape',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'language',
            type: 'enum',
            enum: [Language.portuguese, Language.americanEnglish],
            enumName: 'languageType',
            isNullable: false,
            default: `'${Language.americanEnglish}'`,
          },
          {
            name: 'synopsis',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'publisher',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dimensions',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: [Status.Complete, Status.Hiatus, Status.InProgress],
            enumName: 'statusType',
            isNullable: false,
            default: `'${Status.InProgress}'`,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'categories',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "literaryWorks"`);
  }
}
