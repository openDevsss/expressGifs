import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from "sequelize-typescript";
import { Gif } from "./Gif";
import { TagGifs } from "./TagGifs";

@Table({
  timestamps: false,
  tableName: "Roles",
})
export class Tag extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  readonly id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string;

  @BelongsToMany(() => Gif, () => TagGifs)
  gif!: [Gif];
}
