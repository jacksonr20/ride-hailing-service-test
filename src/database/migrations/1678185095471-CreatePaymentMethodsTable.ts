import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentMethodsTable1678185095471 implements MigrationInterface {
  name = 'CreatePaymentMethodsTable1678185095471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."payment_methods_method_enum" AS ENUM('CASH', 'CREDIT_CARD', 'PSE')`);
    await queryRunner.query(`CREATE TYPE "public"."payment_methods_card_type_enum" AS ENUM('VISA', 'MASTERCARD', 'AMERICAN_EXPRESS')`);
    await queryRunner.query(
      `CREATE TABLE "payment_methods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "method" "public"."payment_methods_method_enum" NOT NULL, "card_holder_name" character varying, "card_type" "public"."payment_methods_card_type_enum", "card_expiration_date" date, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment_methods"`);
    await queryRunner.query(`DROP TYPE "public"."payment_methods_card_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_methods_method_enum"`);
  }
}
