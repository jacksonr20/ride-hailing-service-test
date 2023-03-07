import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationBetweenRidersAndPaymentMethods1678185298028 implements MigrationInterface {
  name = 'AddRelationBetweenRidersAndPaymentMethods1678185298028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment_methods" ADD "rider_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_cc669ad722640e54bb5c56972c6" FOREIGN KEY ("rider_id") REFERENCES "riders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_cc669ad722640e54bb5c56972c6"`);
    await queryRunner.query(`ALTER TABLE "payment_methods" DROP COLUMN "rider_id"`);
  }
}
