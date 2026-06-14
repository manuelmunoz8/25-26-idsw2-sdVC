import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('deliverables')
export class Deliverable {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate!: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'delivered', 'approved', 'rejected'],
    default: 'pending',
  })
  status!: string;

  @ManyToOne(() => Project, (project) => project.deliverables, { onDelete: 'CASCADE' })
  project!: Project;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
