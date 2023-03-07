import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDriversTable1678187115666 implements MigrationInterface {
  name = 'CreateDriversTable1678187115666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "drivers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(150) NOT NULL, "last_name" character varying(150), "email" character varying NOT NULL, "phone_number" character varying(250), "rating" smallint, "joined_date" TIMESTAMP, "dni" character varying(50), "is_banned" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2" UNIQUE ("email"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "drivers"`);
  }
}
