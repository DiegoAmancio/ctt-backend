import { MigrationInterface, QueryRunner } from 'typeorm';

export class addClassificationsLiteraryWork1657470881030
  implements MigrationInterface
{
  name = 'addClassificationsLiteraryWork1657470881030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD "acquisitionDifficulty" float NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD "classification" float NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" DROP COLUMN "classification"`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" DROP COLUMN "acquisitionDifficulty"`,
    );
  }
}
