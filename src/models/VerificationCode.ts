import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  timestamps: true,
  tableName: "VerificationCode",
})
export class VerificationCode extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  id!: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  code!: string;

  @ForeignKey(() => User)
  @Column
  userId!: bigint;
}
