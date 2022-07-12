import { IntegerDataType } from "sequelize/types";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UserAccount } from "./UserAccount";

@Entity()
export class Lobby {
    
    @PrimaryGeneratedColumn()
    lobbyID: string;

    @Column()
    lobbyLeader: UserAccount;

    @Column()
    players: UserAccount[];

    @Column()
    gamemode: string;

    @Column()
    time: number;

    @Column()
    scoreThreshold: number;

}