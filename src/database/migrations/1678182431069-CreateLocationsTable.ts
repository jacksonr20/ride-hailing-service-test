import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLocationsTable1678182431069 implements MigrationInterface {
  name = 'CreateLocationsTable1678182431069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "zip_code" character varying(150), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "location"`);
  }
}
