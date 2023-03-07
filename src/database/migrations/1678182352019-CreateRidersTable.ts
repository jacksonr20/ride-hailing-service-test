import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRidersTable1678182352019 implements MigrationInterface {
  name = 'CreateRidersTable1678182352019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "riders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(150) NOT NULL, "last_name" character varying(150), "email" character varying NOT NULL, "phone_number" character varying(250), "rating" smallint, CONSTRAINT "UQ_ed6e8eb2542a3c7c1742f9c2b54" UNIQUE ("email"), CONSTRAINT "PK_6c17e67f760677500c29d68e689" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "riders"`);
  }
}
