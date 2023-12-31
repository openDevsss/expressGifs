import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Gif } from "./Gif";
import { TagGifs } from "./TagGifs";

@Table({
  timestamps: false,
  tableName: "Tags",
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
