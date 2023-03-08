import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRequestTableToImplementSpatialColumnTypesForLocation1678276720338 implements MigrationInterface {
  name = 'AlterRequestTableToImplementSpatialColumnTypesForLocation1678276720338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_9610d35d5d21db627101427b7e5"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_04caa31b8581b77d274c1180c0c"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "UQ_9610d35d5d21db627101427b7e5"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "dropoff_location_id"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "UQ_04caa31b8581b77d274c1180c0c"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "pickup_location_id"`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "pickup_location" geometry NOT NULL`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "dropoff_location" geometry NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "dropoff_location"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "pickup_location"`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "pickup_location_id" uuid`);
    await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "UQ_04caa31b8581b77d274c1180c0c" UNIQUE ("pickup_location_id")`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "dropoff_location_id" uuid`);
    await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "UQ_9610d35d5d21db627101427b7e5" UNIQUE ("dropoff_location_id")`);
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_04caa31b8581b77d274c1180c0c" FOREIGN KEY ("pickup_location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_9610d35d5d21db627101427b7e5" FOREIGN KEY ("dropoff_location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
