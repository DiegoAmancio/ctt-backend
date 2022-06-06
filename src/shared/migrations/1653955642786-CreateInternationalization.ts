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
            name: 'status',
            type: 'enum',
            enum: [Status.Complete, Status.Hiatus, Status.InProgress],
            enumName: 'status',
            isNullable: false,
            default: `'${Status.InProgress}'`,
          },
          {
            name: 'nacionality',
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
          {
            name: 'language',
            type: 'enum',
            enum: [Language.portuguese, Language.americanEnglish],
            enumName: 'languageType',
            isNullable: false,
            default: `'${Language.americanEnglish}'`,
          },
          {
            name: 'edition',
            type: 'enum',
            enum: [
              Edition.Soshuhen,
              Edition.bunkoban,
              Edition.deluxe,
              Edition.fullColor,
              Edition.kanzenban,
              Edition.kyukyokuban,
              Edition.omnibus,
              Edition.shinsoban,
              Edition.tankobon,
              Edition.wideBan,
            ],
            enumName: 'editionType',
            isNullable: false,
          },
          {
            name: 'paperType',
            type: 'enum',
            enum: [
              PaperType.chamois,
              PaperType.couche,
              PaperType.newsPrint,
              PaperType.offset,
              PaperType.pollen,
            ],
            enumName: 'paperType',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: [Type.japaneseComicBook, Type.comicBook, Type.book],
            enumName: 'type',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('internationalizations');
  }
}
