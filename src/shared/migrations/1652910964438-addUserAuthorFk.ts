import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserAuthorFk1652910964438 implements MigrationInterface {
  name = 'addUserAuthorFk1652910964438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "authors" ADD "registeredById" decimal(30) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "authors" ADD "updatedById" decimal(30) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "authors" ADD CONSTRAINT "registeredByFK" FOREIGN KEY ("registeredById") REFERENCES "users"("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "authors" ADD CONSTRAINT "updatedByFK" FOREIGN KEY ("updatedById") REFERENCES "users"("id")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "authors" DROP CONSTRAINT "registeredByFK"',
    );
    await queryRunner.query(
      'ALTER TABLE "authors" DROP CONSTRAINT "updatedByFK"',
    );
    await queryRunner.query(
      'ALTER TABLE "authors" DROP COLUMN "registeredById"',
    );
    await queryRunner.query('ALTER TABLE "authors" DROP COLUMN "updatedById"');
  }
}
