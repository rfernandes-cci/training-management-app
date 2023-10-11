import { TrainingDetail } from 'src/training-detail/entities/training-detail.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Batch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'batch_title' })
  batchTitle: string;

  @Column()
  tech: string;

  @Column({ name: 'start_date', type: 'timestamp without time zone' })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'timestamp without time zone',
    nullable: true,
  })
  endDate: Date;

  @Column({ name: 'training_coordinator' })
  trainingCoordinator: string;

  @Column({ name: 'head_trainer' })
  headTrainer: string;

  @Column()
  status: string;

  @TreeChildren()
  children: Batch[];

  @TreeParent()
  parent: Batch;

  @OneToMany(() => TrainingDetail, (trainingDetail) => trainingDetail.batchId)
  trainingDetail: TrainingDetail[];
}
