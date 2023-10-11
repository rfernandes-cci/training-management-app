import { ApprovedCertification } from 'src/approved-certification/entities/approved-certification.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CertificationOngoing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (emp) => emp.empId)
  @JoinColumn({ name: 'emp_id' })
  empId: Employee;

  @ManyToOne(() => ApprovedCertification, (cert) => cert.id)
  @JoinColumn({ name: 'exam_id' })
  exam: ApprovedCertification;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'expected_end_date' })
  expectedEndDate: Date;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'when' })
  when: string;

  @Column({ name: 'what' })
  what: string;
}
