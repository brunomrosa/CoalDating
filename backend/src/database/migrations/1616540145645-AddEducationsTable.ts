import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class AddEducationsTable1616540145645
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'educations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'last_institution',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'education_level',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'area',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'course',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_graduating',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'educations',
      new TableForeignKey({
        name: 'UserEducation',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('educations', 'UserEducation');
    await queryRunner.dropTable('educations');
  }
}
