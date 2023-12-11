import { Role } from '@domain/jwt/role.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1652787804712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'numeric',
            isPrimary: true,
            precision: 30,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
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
          {
            name: 'role',
            type: 'enum',
            enum: [Role.User, Role.Admin],
            enumName: 'userRole',
            isNullable: false,
            default: `'${Role.User}'`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users" CASCADE`);
  }
}
