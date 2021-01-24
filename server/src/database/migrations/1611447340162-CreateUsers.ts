import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1611447340162 implements MigrationInterface {

  // faz as mudanças (cria, altera, etc..)
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name:"users",
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
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
        ]
      })
    )

  }

  // metodo down desfaz o que o up cria
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
