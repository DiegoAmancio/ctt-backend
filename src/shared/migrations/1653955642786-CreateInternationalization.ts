import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInternationalization1653955642786
  implements MigrationInterface
{
  name = 'CreateInternationalization1653955642786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."internationalizations_language_enum" AS ENUM('pt-BR', 'en-US')`,
    );
    await queryRunner.query(
      `CREATE TABLE "internationalizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" "public"."internationalizations_language_enum" NOT NULL DEFAULT 'en-US', "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e301dff78311f0aaa3ae38376c5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "internationalizations"`);
    await queryRunner.query(
      `DROP TYPE "public"."internationalizations_language_enum"`,
    );
  }
}
