import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Todo } from "./todo"

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 100
    })
    username!: string

    @Column({
        length: 100
    })
    password!: string

    @OneToMany(() => Todo, (todo) => todo.users)
    todos! : Todo[]

    @Column()
    CreatedAt!: Date

    @Column()
    UpdatedAt!: Date
}