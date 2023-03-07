import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationBetweenDriversAndCars1678187764454 implements MigrationInterface {
  name = 'AddRelationBetweenDriversAndCars1678187764454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" ADD "driver_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "cars" ADD CONSTRAINT "FK_1403195e3b80cf083352758adb0" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_1403195e3b80cf083352758adb0"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "driver_id"`);
  }
}
