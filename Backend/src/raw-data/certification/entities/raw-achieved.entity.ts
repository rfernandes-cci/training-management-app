import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RawAchieved {
  @PrimaryColumn({ name: 'emp_id' })
  empId: string;

  @PrimaryColumn({ name: 'first_name' })
  firstName: string;

  @PrimaryColumn()
  certification: string;

  @PrimaryColumn()
  level: string;

  @PrimaryColumn()
  exam: string;

  @Column({ name: 'achieved_date', type: 'timestamp without time zone' })
  achievedDate: Date;

  @Column({
    name: 'expiry_date',
    nullable: true,
    type: 'timestamp without time zone',
  })
  expiryDate: Date;

  @Column({ name: 'certification_link' })
  certificationLink: string;

  @Column({ name: 'is_processed', default: false })
  isProcessed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
