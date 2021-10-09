import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1633225887055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'users',
              columns: [
                  {
                      name: 'id',
                      type: 'bigint',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'name',
                      type: 'varchar',
                      isNullable: true
                  },
                  {
                      name: 'email',
                      type: 'varchar',
                      isNullable: true
                  },
                  {
                      name: 'address',
                      type: 'varchar',
                      isNullable: true
                  },
                  {
                      name: 'gender',
                      type: 'varchar',
                      isNullable: true
                  },
                  {
                      name: 'birthday',
                      type: 'date',
                      isNullable: true
                  },
                  {
                      name: 'password',
                      type: 'varchar',
                      isNullable: true
                  },
                  {
                      name: 'created_at',
                      type: 'timestamp',
                      isNullable: true,
                      default: 'now()'
                  },
                  {
                      name: 'updated_at',
                      type: 'timestamp',
                      isNullable: true,
                      default: 'now()'
                  }
              ],
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }
}
