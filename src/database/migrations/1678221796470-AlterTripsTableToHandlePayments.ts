import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTripsTableToHandlePayments1678221796470 implements MigrationInterface {
  name = 'AlterTripsTableToHandlePayments1678221796470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('APPROVED', 'DECLINED', 'ERROR')`);
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "fare" numeric(10,2) NOT NULL, "tip" numeric(10,2), "status" "public"."payments_status_enum" NOT NULL, "trip_id" uuid, "payment_method_id" uuid, CONSTRAINT "REL_bd02a6beaa5c282445abc4b350" UNIQUE ("trip_id"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "fare"`);
    await queryRunner.query(`ALTER TABLE "trips" ADD "end_time" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_bd02a6beaa5c282445abc4b3507" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_12fd861c33c885f01b9a7da7d93" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_12fd861c33c885f01b9a7da7d93"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_bd02a6beaa5c282445abc4b3507"`);
    await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "end_time"`);
    await queryRunner.query(`ALTER TABLE "trips" ADD "end_time" numeric(10,2) NOT NULL`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(`ALTER TABLE "trips" RENAME COLUMN "end_time" TO "fare"`);
  }
}
