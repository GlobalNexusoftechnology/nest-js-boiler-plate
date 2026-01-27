import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class PostVotes1765880428863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post_votes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'post_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'vote',
            type: 'enum',
            enum: ['up', 'down'],
          },
          {
            name: 'created_on',
            type: 'bigint',
          },
        ],
        uniques: [
          new TableUnique({
            columnNames: ['post_id', 'user_id'],
          }),
        ],
        foreignKeys: [
          {
            columnNames: ['post_id'],
            referencedTableName: 'posts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post_votes');
  }
}
