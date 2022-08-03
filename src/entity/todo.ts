import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity()
export class Todo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 200
    })
    todo!: string

    @ManyToOne(() => User, (user) => user.todos)
    users! : User

    @Column()
    CreatedAt!: Date

    @Column()
    UpdatedAt!: Date
}