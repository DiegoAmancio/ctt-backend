import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLiteraryWorksFK1655599361829 implements MigrationInterface {
  name = 'addLiteraryWorksFK1655599361829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD "registeredById" numeric(30)`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD "updatedById" numeric(30)`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD "ilustratorById" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD "writterById" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "internationalizations" ADD "literaryWorkId" uuid`,
    );

    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD CONSTRAINT "FK_08f50c2c72e96e0e7271b75fa82" FOREIGN KEY ("registeredById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD CONSTRAINT "FK_a916b9df8d78b699a0319b3af77" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD CONSTRAINT "FK_1336ff4fb06bc9b9ad4f9d8b1e0" FOREIGN KEY ("ilustratorById") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" ADD CONSTRAINT "FK_713fe62e1615407fe2be0531b15" FOREIGN KEY ("writterById") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internationalizations" ADD CONSTRAINT "FK_27480955ec380b0203cddbfe33d" FOREIGN KEY ("literaryWorkId") REFERENCES "literaryWorks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internationalizations" DROP CONSTRAINT "FK_27480955ec380b0203cddbfe33d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" DROP CONSTRAINT "FK_713fe62e1615407fe2be0531b15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" DROP CONSTRAINT "FK_1336ff4fb06bc9b9ad4f9d8b1e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" DROP CONSTRAINT "FK_a916b9df8d78b699a0319b3af77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "literaryWorks" DROP CONSTRAINT "FK_08f50c2c72e96e0e7271b75fa82"`,
    );

    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "registeredById"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "updatedById"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "writterById"',
    );
    await queryRunner.query(
      'ALTER TABLE "literaryWorks" DROP COLUMN "ilustratorById"',
    );
    await queryRunner.query(
      'ALTER TABLE "internationalizations" DROP COLUMN "literaryWorkId"',
    );
  }
}
