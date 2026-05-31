import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Por seguridad, no devolvemos la contraseña por defecto
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['investigador', 'coordinador'],
    default: 'investigador',
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
