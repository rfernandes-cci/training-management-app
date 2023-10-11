import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RawApprovedCertification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  tech: string;

  @PrimaryColumn({ name: 'certificaton_name' })
  certificationName: string;

  @PrimaryColumn()
  level: string;

  @Column({ name: 'cost_in_dollars', nullable: true })
  costInDollars: number;

  @Column({ name: 'is_processed', default: false })
  isProcessed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
