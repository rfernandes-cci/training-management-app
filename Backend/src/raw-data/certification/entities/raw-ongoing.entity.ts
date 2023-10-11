import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RawOngoing {
  @PrimaryColumn({ name: 'emp_id' })
  empId: string;

  @PrimaryColumn({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @PrimaryColumn()
  certification: string;

  @PrimaryColumn()
  exam: string;

  @Column({
    name: 'start_date',
    type: 'timestamp without time zone',
    nullable: true,
  })
  startDate: Date;

  @Column({ name: 'expected_end_date', type: 'timestamp without time zone' })
  expectedEndDate: Date;

  @Column()
  status: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  when: Date;

  @Column({ nullable: true })
  what: String;

  @Column({ name: 'is_processed', default: false })
  isProcessed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
