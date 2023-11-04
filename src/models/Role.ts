import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasOne,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

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
