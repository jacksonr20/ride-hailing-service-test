import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameNameColumnInRidersTable1678186681233 implements MigrationInterface {
  name = 'RenameNameColumnInRidersTable1678186681233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "riders" RENAME COLUMN "name" TO "first_name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "riders" RENAME COLUMN "first_name" TO "name"`);
  }
}
