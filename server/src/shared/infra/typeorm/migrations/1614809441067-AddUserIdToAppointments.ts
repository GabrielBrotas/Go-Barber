import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1614809441067
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['user_id'], // coluna que vai ter a foreign key
        referencedColumnNames: ['id'], // na tabela de usuarios qual vai ser o nome da coluna que vai ter o dado de referencia
        referencedTableName: 'users', // tabela de relacionamento
        onDelete: 'SET NULL', // caso o usuario seja deletado vamos colocar o dado na tabela de referencia como nulo,
        onUpdate: 'CASCADE', // se alterar o id por algum motivo a alteração vai refletir no relacionamento
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');
    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
