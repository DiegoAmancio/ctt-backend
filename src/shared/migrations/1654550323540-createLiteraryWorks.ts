import { Edition, Language, PaperType, Status, Type } from '@shared/enum';
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
            enum: [Language.ptBR, Language.enUS],
            enumName: 'languageType',
            isNullable: false,
            default: `'${Language.enUS}'`,
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
