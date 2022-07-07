import { Coin } from '@shared/enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUserVolume1656698232450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userVolumes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'purchasedPrice',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'purchasedDate',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'purchasedPriceUnit',
            type: 'enum',
            enum: [Coin.BRL, Coin.EUR, Coin.JPY, Coin.USD],
            enumName: 'CoinType',
            isNullable: false,
            default: `'${Coin.USD}'`,
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
            name: 'userId',
            type: 'numeric(30)',
            isNullable: false,
          },
          {
            name: 'volumeId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'userVolumes',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'userVolumes',
      new TableForeignKey({
        columnNames: ['volumeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'volumes',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userVolumes');
  }
}
