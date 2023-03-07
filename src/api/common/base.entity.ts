import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity()
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updateAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  @IsOptional()
  deletedAt?: Date;
}
