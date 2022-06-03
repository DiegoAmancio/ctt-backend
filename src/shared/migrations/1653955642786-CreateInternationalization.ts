import { Language } from '@shared/enum/language.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInternationalization1653955642786
  implements MigrationInterface
{
  name = 'CreateInternationalization1653955642786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'internationalizations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'value',
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
          {
            name: 'language',
            type: 'enum',
            enum: [Language.portuguese, Language.americanEnglish],
            enumName: 'languageType',
            isNullable: false,
            default: `'${Language.americanEnglish}'`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('internationalizations');
  }
}
