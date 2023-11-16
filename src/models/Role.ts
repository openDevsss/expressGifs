import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

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
