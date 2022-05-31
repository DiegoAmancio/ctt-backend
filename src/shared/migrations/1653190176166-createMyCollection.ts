import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMyCollection1653190176166 implements MigrationInterface {
  name = 'createMyCollection1653190176166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "myCollections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalLiteraryWorks" integer NOT NULL, "completeLiteraryWorks" integer NOT NULL, "collectionValue" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" decimal(30), CONSTRAINT "REL_c4e5d93307e68f5dbff7c57974" UNIQUE ("userId"), CONSTRAINT "PK_07aa245337ee1be9543f3e89e6a" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "myCollections" ADD CONSTRAINT "FK_c4e5d93307e68f5dbff7c57974b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "myCollections" DROP CONSTRAINT "FK_c4e5d93307e68f5dbff7c57974b"`,
    );

    await queryRunner.query(`DROP TABLE "myCollections"`);
  }
}
