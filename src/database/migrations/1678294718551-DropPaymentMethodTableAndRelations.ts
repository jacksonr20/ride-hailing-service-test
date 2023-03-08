import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropPaymentMethodTableAndRelations1678294718551 implements MigrationInterface {
  name = 'DropPaymentMethodTableAndRelations1678294718551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_12fd861c33c885f01b9a7da7d93"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_method_id"`);
    await queryRunner.query(`ALTER TABLE "trips" ALTER COLUMN "final_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "trips" ALTER COLUMN "final_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "payments" ADD "payment_method_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_12fd861c33c885f01b9a7da7d93" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
