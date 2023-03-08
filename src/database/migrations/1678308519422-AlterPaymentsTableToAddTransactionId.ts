import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPaymentsTableToAddTransactionId1678308519422 implements MigrationInterface {
  name = 'AlterPaymentsTableToAddTransactionId1678308519422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ADD "transaction_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "trips" ALTER COLUMN "final_location" TYPE geometry`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trips" ALTER COLUMN "final_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transaction_id"`);
  }
}
