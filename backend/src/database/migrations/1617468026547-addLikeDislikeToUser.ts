import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addLikeDislikeToUser1617468026547
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'likes',
        type: 'varchar[]',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'dislikes',
        type: 'varchar[]',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'likes');
    await queryRunner.dropColumn('users', 'dislikes');
  }
}
