import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTripsTable1678218041445 implements MigrationInterface {
  name = 'CreateTripsTable1678218041445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."trips_status_enum" AS ENUM('COMPLETED', 'IN_PROGRESS', 'PAYMENT_PENDING')`);
    await queryRunner.query(
      `CREATE TABLE "trips" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "fare" numeric(10,2) NOT NULL, "rider_rating" smallint, "driver_rating" smallint, "status" "public"."trips_status_enum" NOT NULL DEFAULT 'IN_PROGRESS', "request_id" uuid, "final_location" uuid, "driver_id" uuid, "car_id" uuid, CONSTRAINT "REL_f8ab7c11057c69afa8746f7924" UNIQUE ("request_id"), CONSTRAINT "REL_213969006cff7948380b959504" UNIQUE ("final_location"), CONSTRAINT "PK_f71c231dee9c05a9522f9e840f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_f8ab7c11057c69afa8746f79245" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_213969006cff7948380b9595044" FOREIGN KEY ("final_location") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_44d36110fb38f45c2f15c946ddb" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_dfea9f5c01666a915e9eb1aca5b" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_dfea9f5c01666a915e9eb1aca5b"`);
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_44d36110fb38f45c2f15c946ddb"`);
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_213969006cff7948380b9595044"`);
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_f8ab7c11057c69afa8746f79245"`);
    await queryRunner.query(`DROP TABLE "trips"`);
    await queryRunner.query(`DROP TYPE "public"."trips_status_enum"`);
  }
}
