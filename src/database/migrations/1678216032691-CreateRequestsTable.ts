import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRequestsTable1678216032691 implements MigrationInterface {
  name = 'CreateRequestsTable1678216032691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."requests_status_enum" AS ENUM('WAITING', 'ACCEPTED')`);
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "estimated_fare" numeric(10,2) NOT NULL, "surge" numeric(10,2) NOT NULL, "status" "public"."requests_status_enum" NOT NULL DEFAULT 'WAITING', "pickup_location" uuid, "dropoff_location" uuid, "rider_id" uuid, CONSTRAINT "REL_6c5633e5a6d5635831cbc96bef" UNIQUE ("pickup_location"), CONSTRAINT "REL_a796178a3fa8c222d6bb8b65c5" UNIQUE ("dropoff_location"), CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_6c5633e5a6d5635831cbc96bef6" FOREIGN KEY ("pickup_location") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_a796178a3fa8c222d6bb8b65c54" FOREIGN KEY ("dropoff_location") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_db5f71a072c7bfefc58670b358e" FOREIGN KEY ("rider_id") REFERENCES "riders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_db5f71a072c7bfefc58670b358e"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_a796178a3fa8c222d6bb8b65c54"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_6c5633e5a6d5635831cbc96bef6"`);
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TYPE "public"."requests_status_enum"`);
  }
}
