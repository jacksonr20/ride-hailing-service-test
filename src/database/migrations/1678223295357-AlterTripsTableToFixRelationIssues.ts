import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTripsTableToFixRelationIssues1678223295357 implements MigrationInterface {
  name = 'AlterTripsTableToFixRelationIssues1678223295357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_bd02a6beaa5c282445abc4b3507"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "REL_bd02a6beaa5c282445abc4b350"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "trip_id"`);
    await queryRunner.query(`ALTER TABLE "trips" ADD "payment_id" uuid`);
    await queryRunner.query(`ALTER TABLE "trips" ADD CONSTRAINT "UQ_79746ad153ee98938ff06104438" UNIQUE ("payment_id")`);
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_79746ad153ee98938ff06104438" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_79746ad153ee98938ff06104438"`);
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "UQ_79746ad153ee98938ff06104438"`);
    await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "payment_id"`);
    await queryRunner.query(`ALTER TABLE "payments" ADD "trip_id" uuid`);
    await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "REL_bd02a6beaa5c282445abc4b350" UNIQUE ("trip_id")`);
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_bd02a6beaa5c282445abc4b3507" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
