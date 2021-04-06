import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addCordsToUser1617655746874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'lat',
        type: 'decimal',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'max_distance',
        type: 'decimal',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'max_age',
        type: 'decimal',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'lon',
        type: 'decimal',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'lat');
    await queryRunner.dropColumn('users', 'lon');
    await queryRunner.dropColumn('users', 'max_distance');
    await queryRunner.dropColumn('users', 'max_age');
  }
}
