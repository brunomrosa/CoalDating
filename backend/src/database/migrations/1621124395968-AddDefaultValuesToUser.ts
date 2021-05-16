import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDefaultValuesToUser1621124395968
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'max_distance',
      new TableColumn({
        name: 'max_distance',
        default: 100,
        type: 'decimal',
        isNullable: true,
      }),
    );
    await queryRunner.changeColumn(
      'users',
      'max_age',
      new TableColumn({
        name: 'max_age',
        default: 60,
        type: 'decimal',
        isNullable: true,
      }),
    );
    await queryRunner.changeColumn(
      'users',
      'min_age',
      new TableColumn({
        name: 'min_age',
        default: 18,
        type: 'decimal',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'max_distance',
      new TableColumn({
        name: 'max_distance',
        type: 'decimal',
        isNullable: true,
      }),
    );
    await queryRunner.changeColumn(
      'users',
      'max_age',
      new TableColumn({
        name: 'max_age',
        type: 'decimal',
        isNullable: true,
      }),
    );
    await queryRunner.changeColumn(
      'users',
      'min_age',
      new TableColumn({
        name: 'min_age',
        type: 'decimal',
        isNullable: true,
      }),
    );
  }
}
