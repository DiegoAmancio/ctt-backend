import { Edition, PaperType, Status, Type } from '@shared/enum';
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
            name: 'synopsis',
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
            enum: [Language.ptBR, Language.enUS],
            enumName: 'languageType',
            isNullable: false,
            default: `'${Language.enUS}'`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('internationalizations');
  }
}
