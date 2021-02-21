import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addAvatarFieldToUsers1611496756493
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true, // como na nossa applicação ja tem usuarios é importante que o campo possa ser nulo para n dar erro nos antigos
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
