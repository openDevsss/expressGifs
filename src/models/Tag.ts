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

@Table({
  timestamps: false,
  tableName: "Roles",
})
export class Role extends Model {
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
}
