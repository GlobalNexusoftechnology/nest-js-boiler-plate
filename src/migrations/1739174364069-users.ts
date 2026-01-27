import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1739174364069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '15',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'role_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'refresh_token',
            type: 'text',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'auth_provider',
            type: 'enum',
            enum: ['phone', 'google'],
            default: "'phone'",
          },
          {
            name: 'is_verified',
            type: 'boolean',
            default: false,
          },

          // --------------------------------------
          // NEW PROFILE FIELDS
          // --------------------------------------

          {
            name: 'profile_photo',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'full_name',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'profession',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'company',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'short_bio',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'about',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'skills',
            type: 'text',
            isNullable: true,
            // simple-array stored as comma-separated value
          },
          {
            name: 'experience',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },

          // --------------------------------------
          // BASE ENTITY FIELDS
          // --------------------------------------

          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_on',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'modified_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'modified_on',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'deleted',
            type: 'boolean',
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
