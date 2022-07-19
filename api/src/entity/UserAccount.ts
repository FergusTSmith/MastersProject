import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserAccount {
    
    @PrimaryGeneratedColumn()
    username: string;

    @Column()
    gamesPlayed: number;

    @Column()
    online: boolean;

    @Column('datetime')
    dateJoined: Date;

     

}