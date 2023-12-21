import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Gif } from "./Gif";
import { User } from "./User";

@Table({
  timestamps: true,
  tableName: "Likes",
})
export class Like extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  id!: bigint;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Gif)
  @Column
  gifId!: bigint;

  @BelongsTo(() => User)
  user!: User;
}
