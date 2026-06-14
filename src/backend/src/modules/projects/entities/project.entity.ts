import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Deliverable } from '../../deliverables/entities/deliverable.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: true })
  objectives!: string;

  @Column({
    type: 'enum',
    enum: ['draft', 'active', 'completed', 'cancelled'],
    default: 'draft',
  })
  status!: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate!: Date;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  researchers!: User[];

  @OneToMany(() => Deliverable, (deliverable) => deliverable.project)
  deliverables!: Deliverable[];

  @Column({ type: 'uuid' })
  coordinatorId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'coordinatorId' })
  coordinator!: User;

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
