import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Posts1765815250346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'caption',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'likes_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'created_on',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'deleted',
            type: 'boolean',
            default: false,
          },
        ],
        foreignKeys: [
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
    await queryRunner.dropTable('posts');
  }
}
