import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text', select: false }) // Por seguridad, no devolvemos la contraseña por defecto
  password!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['investigador', 'coordinador'],
    default: 'investigador',
  })
  role!: string;

  @Column({ type: 'boolean', default: false })
  deletionRequested!: boolean;

  @Column({ type: 'float', default: 0 })
  weeklyWorkload!: number;

  @Column({ type: 'float', default: 0 })
  totalWorkload!: number;

  @ManyToMany(() => Project, (project) => project.researchers)
  projects!: Project[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
