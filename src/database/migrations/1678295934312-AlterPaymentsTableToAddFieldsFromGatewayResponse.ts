import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPaymentsTableToAddFieldsFromGatewayResponse1678295934312 implements MigrationInterface {
  name = 'AlterPaymentsTableToAddFieldsFromGatewayResponse1678295934312';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_type_enum" AS ENUM('CASH', 'CREDIT_CARD', 'PSE')`);
    await queryRunner.query(`ALTER TABLE "payments" ADD "payment_method_type" "public"."payments_payment_method_type_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."payments_status_enum" RENAME TO "payments_status_enum_old"`);
    await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'APPROVED', 'DECLINED', 'ERROR')`);
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" TYPE "public"."payments_status_enum" USING "status"::"text"::"public"."payments_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum_old"`);
    await queryRunner.query(`ALTER TABLE "trips" ALTER COLUMN "final_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "dropoff_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "pickup_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`ALTER TABLE "trips" ALTER COLUMN "final_location" TYPE geometry(GEOMETRY,0)`);
    await queryRunner.query(`CREATE TYPE "public"."payments_status_enum_old" AS ENUM('APPROVED', 'DECLINED', 'ERROR')`);
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "status" TYPE "public"."payments_status_enum_old" USING "status"::"text"::"public"."payments_status_enum_old"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."payments_status_enum_old" RENAME TO "payments_status_enum"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_method_type"`);
    await queryRunner.query(`DROP TYPE "public"."payments_payment_method_type_enum"`);
  }
}
