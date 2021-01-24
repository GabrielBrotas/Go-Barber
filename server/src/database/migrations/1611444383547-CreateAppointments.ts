import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1611444031193 implements MigrationInterface {

  // faz as mudanças (cria, altera, etc..)
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name:"appointments",
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          }
        ]
      })
    )

  }

  // metodo down desfaz o que o up cria
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments')
  }

}
