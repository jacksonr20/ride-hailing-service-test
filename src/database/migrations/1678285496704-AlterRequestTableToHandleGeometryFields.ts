import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRequestTableToHandleGeometryFields1678285496704 implements MigrationInterface {
  name = 'AlterRequestTableToHandleGeometryFields1678285496704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry(GEOMETRY,0)`);
  }
}
