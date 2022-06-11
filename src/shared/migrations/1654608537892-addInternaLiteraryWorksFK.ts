import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addInternaLiteraryWorksFK1654608537892
  implements MigrationInterface
{
  name = 'addInternaLiteraryWorksFK1654608537892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD "registeredById" decimal(30) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD "updatedById" decimal(30) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD CONSTRAINT "registeredByFK" FOREIGN KEY ("registeredById") REFERENCES "users"("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD CONSTRAINT "updatedByFK" FOREIGN KEY ("updatedById") REFERENCES "users"("id")',
    );

    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD "writterById" uuid NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD "ilustratorById" uuid NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD CONSTRAINT "writterByFK" FOREIGN KEY ("writterById") REFERENCES "authors"("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" ADD CONSTRAINT "ilustratorByFK" FOREIGN KEY ("ilustratorById") REFERENCES "authors"("id")',
    );

    await queryRunner.addColumn(
      'internationalizations',
      new TableColumn({
        name: 'literaryWorkId',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'internationalizations',
      new TableForeignKey({
        name: 'internationalizationFK',
        columnNames: ['literaryWorkId'],
        referencedTableName: 'literaryWorks',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP CONSTRAINT "registeredByFK"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP CONSTRAINT "updatedByFK"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "registeredById"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "updatedById"',
    );

    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP CONSTRAINT "writterByFK"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP CONSTRAINT "ilustratorByFK"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "writterById"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "ilustratorById"',
    );

    await queryRunner.query(
      'ALTER TABLE "internationalizations" DROP CONSTRAINT "internationalizationFK"',
    );

    await queryRunner.query(
      'ALTER TABLE "internationalizations" DROP COLUMN "literaryWorkId"',
    );
  }
}
