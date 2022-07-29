import { Coin, Language, PaperType } from '@shared/enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createVolume1655823874936 implements MigrationInterface {
  name = 'createVolume1655823874936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'volumes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
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
            name: 'coverPriceUnit',
            type: 'enum',
            enum: [Coin.BRL, Coin.EUR, Coin.JPY, Coin.USD],
            enumName: 'CoinType',
            isNullable: false,
            default: `'${Coin.USD}'`,
          },
          {
            name: 'coverPrice',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'publication',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'pagesNumber',
            type: 'int',
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
            name: 'dimensions',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'registeredById',
            type: 'numeric(30)',
          },
          {
            name: 'updatedById',
            type: 'numeric(30)',
          },
          {
            name: 'literaryWorkId',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.query(
      `ALTER TABLE "internationalizations" ADD "volumeId" uuid`,
    );

    await queryRunner.query(
      `ALTER TABLE "volumes" ADD CONSTRAINT "FK_22c9ce47e7f9bbf9e911b4be932" FOREIGN KEY ("registeredById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volumes" ADD CONSTRAINT "FK_04a670f49b9349660fff3f59577" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "volumes" ADD CONSTRAINT "FK_59839908b797d22a7dca300c1c0" FOREIGN KEY ("literaryWorkId") REFERENCES "literaryWorks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internationalizations" ADD CONSTRAINT "FK_3021408301cbf501c96dddb7ecd" FOREIGN KEY ("volumeId") REFERENCES "volumes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internationalizations" DROP CONSTRAINT "FK_3021408301cbf501c96dddb7ecd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volumes" DROP CONSTRAINT "FK_59839908b797d22a7dca300c1c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volumes" DROP CONSTRAINT "FK_04a670f49b9349660fff3f59577"`,
    );
    await queryRunner.query(
      `ALTER TABLE "volumes" DROP CONSTRAINT "FK_22c9ce47e7f9bbf9e911b4be932"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internationalizations" DROP COLUMN "volumeId"`,
    );
    await queryRunner.query(`DROP TABLE "volumes"`);
  }
}
