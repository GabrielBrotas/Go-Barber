import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderNameToProviderId1611448352323
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true, // pode ser nulo porque caso um barbeiro saia da plataforma é ideal manter o historico dos usuarios
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'], // coluna que vai ter a foreign key
        referencedColumnNames: ['id'], // na tabela de usuarios qual vai ser o nome da coluna que vai ter o dado de referencia
        referencedTableName: 'users', // tabela de relacionamento
        onDelete: 'SET NULL', // caso o usuario seja deletado vamos colocar o dado na tabela de referencia como nulo,
        onUpdate: 'CASCADE', // se alterar o id por algum motivo a alteração vai refletir no relacionamento
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // neste caso o reverte tem que ser feito de forma inversa
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
