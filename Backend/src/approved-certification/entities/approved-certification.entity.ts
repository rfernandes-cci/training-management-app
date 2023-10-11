import { CertificationAchieved } from 'src/certification-achieved/entities/certification-achieved.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApprovedCertification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tech: string;

  @Column({ name: 'certification_name' })
  certificationName: string;

  @Column()
  level: string;

  @Column({ name: 'cost_in_dollar', nullable: true })
  costInDollar: number;

  @OneToMany(() => CertificationAchieved, (cert) => cert.exam)
  certificationAchieved: CertificationAchieved[];
}
