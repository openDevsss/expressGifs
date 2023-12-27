// models/Subscription.ts
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
import { User } from "./User";

@Table({
  tableName: "Subscriptions",
})
export class Subscription extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id!: bigint;

  // Ваша модель Subscription
  @BelongsTo(() => User, { foreignKey: "followerId", as: "follower" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  followerId!: bigint;

  @BelongsTo(() => User, { foreignKey: "followeeId", as: "followee" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  followeeId!: bigint;
}
