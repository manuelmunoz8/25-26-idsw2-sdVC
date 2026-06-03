import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
