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
export class CertificationAchieved {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (emp) => emp.empId)
  @JoinColumn({ name: 'emp_id' })
  empId: Employee;

  @ManyToOne(() => ApprovedCertification, (cert) => cert.id)
  @JoinColumn({ name: 'exam_id' })
  exam: ApprovedCertification;

  @Column({ name: 'achieved_date', type: 'timestamp without time zone' })
  achievedDate: Date;

  @Column({
    name: 'expiry_date',
    type: 'timestamp without time zone',
    nullable: true,
  })
  expiryDate: Date;

  @Column({ name: 'certification_link', nullable: true })
  certificatiionLink: string;
}
