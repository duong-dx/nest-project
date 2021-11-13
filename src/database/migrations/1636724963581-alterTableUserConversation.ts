import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUserConversation1636724963581
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
       ALTER TABLE user_conversation
       ADD last_message_id bigint
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
       ALTER TABLE user_conversation
       DROP COLUMN last_message_id
    `);
  }
}
