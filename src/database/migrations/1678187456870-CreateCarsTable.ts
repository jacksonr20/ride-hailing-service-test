import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCarsTable1678187456870 implements MigrationInterface {
  name = 'CreateCarsTable1678187456870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "license_plate" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" integer, "capacity" smallint, "color" character varying(50), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cars"`);
  }
}
