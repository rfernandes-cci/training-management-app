import { Batch } from 'src/batch/entities/batch.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrainingDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (emp) => emp.empId)
  @JoinColumn({ name: 'emp_id' })
  empId: string;

  @ManyToOne(() => Batch, (batch) => batch.id)
  @JoinColumn({ name: 'batch_id' })
  batchId: string;
}
