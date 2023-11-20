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
  tableName: "Comments",
})
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  id!: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment_text!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Gif)
  gif!: Gif;

  @ForeignKey(() => User)
  userId!: number;
  @ForeignKey(() => Gif)
  gifId!: number;
}
