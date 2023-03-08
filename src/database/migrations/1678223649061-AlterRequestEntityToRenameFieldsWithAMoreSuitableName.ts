import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRequestEntityToRenameFieldsWithAMoreSuitableName1678223649061 implements MigrationInterface {
  name = 'AlterRequestEntityToRenameFieldsWithAMoreSuitableName1678223649061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_6c5633e5a6d5635831cbc96bef6"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_a796178a3fa8c222d6bb8b65c54"`);
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_213969006cff7948380b9595044"`);
    await queryRunner.query(`ALTER TABLE "trips" RENAME COLUMN "final_location" TO "final_location_id"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "REL_6c5633e5a6d5635831cbc96bef"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "pickup_location"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "REL_a796178a3fa8c222d6bb8b65c5"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "dropoff_location"`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "pickup_location_id" uuid`);
    await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "UQ_04caa31b8581b77d274c1180c0c" UNIQUE ("pickup_location_id")`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "dropoff_location_id" uuid`);
    await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "UQ_9610d35d5d21db627101427b7e5" UNIQUE ("dropoff_location_id")`);
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_04caa31b8581b77d274c1180c0c" FOREIGN KEY ("pickup_location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_9610d35d5d21db627101427b7e5" FOREIGN KEY ("dropoff_location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_839c2a9fd7fb004440b548b59f1" FOREIGN KEY ("final_location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_839c2a9fd7fb004440b548b59f1"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_9610d35d5d21db627101427b7e5"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_04caa31b8581b77d274c1180c0c"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "UQ_9610d35d5d21db627101427b7e5"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "dropoff_location_id"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "UQ_04caa31b8581b77d274c1180c0c"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "pickup_location_id"`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "dropoff_location" uuid`);
    await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "REL_a796178a3fa8c222d6bb8b65c5" UNIQUE ("dropoff_location")`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "pickup_location" uuid`);
    await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "REL_6c5633e5a6d5635831cbc96bef" UNIQUE ("pickup_location")`);
    await queryRunner.query(`ALTER TABLE "trips" RENAME COLUMN "final_location_id" TO "final_location"`);
    await queryRunner.query(
      `ALTER TABLE "trips" ADD CONSTRAINT "FK_213969006cff7948380b9595044" FOREIGN KEY ("final_location") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_a796178a3fa8c222d6bb8b65c54" FOREIGN KEY ("dropoff_location") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_6c5633e5a6d5635831cbc96bef6" FOREIGN KEY ("pickup_location") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
