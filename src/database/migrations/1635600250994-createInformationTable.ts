import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createInformationTable1635600250994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'information',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'value',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('information');
  }
}
