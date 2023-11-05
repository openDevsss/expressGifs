// 1. nickname
// 2. password
// 3. email
// 4. role
// 5. avatar
// 6. favourite tags
// 7. isSucsec

import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { Role } from "./Role";

@Table({
  timestamps: true,
  tableName: "Users",
})
export class User extends Model {
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
  nickname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue:
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611734.jpg?w=740&t=st=1698923432~exp=1698924032~hmac=8833199e92ab9ec24ebab12f6e5a417bec1bbd06d1741e0611c1dbda0f800a1e",
  })
  avatar!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isSuccess!: boolean;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.BIGINT,
    defaultValue: 2,
  })
  role_id!: number;
}
