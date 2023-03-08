import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTripsTableToHandleGeolocationFields1678290428231 implements MigrationInterface {
  name = 'AlterTripsTableToHandleGeolocationFields1678290428231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_839c2a9fd7fb004440b548b59f1"`);
    await queryRunner.query(`ALTER TABLE "trips" RENAME COLUMN "final_location_id" TO "final_location"`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "final_location"`);
    await queryRunner.query(`ALTER TABLE "trips" ADD "final_location" geometry`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "final_location"`);
    await queryRunner.query(`ALTER TABLE "trips" ADD "final_location" uuid`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "trips" RENAME COLUMN "final_location" TO "final_location_id"`);
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_839c2a9fd7fb004440b548b59f1" FOREIGN KEY ("final_location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
