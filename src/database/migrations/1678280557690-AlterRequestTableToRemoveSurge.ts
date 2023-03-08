import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRequestTableToRemoveSurge1678280557690 implements MigrationInterface {
  name = 'AlterRequestTableToRemoveSurge1678280557690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "surge"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" ADD "surge" numeric(10,2) NOT NULL`);
  }
}
