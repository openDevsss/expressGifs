// В модели User
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Comment } from "./Comment";
import { Gif } from "./Gif";
import { Role } from "./Role";
import { Like } from "./Like";
import { Subscription } from "./Subscriptions";

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

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  phone!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.BIGINT,
    defaultValue: 2,
  })
  role_id!: number;

  @HasMany(() => Gif, { foreignKey: "userId", as: "gifs" })
  gifs!: Gif[];

  @HasMany(() => Comment)
  comment!: Comment;

  @HasMany(() => Like)
  likes!: Like[];

  @HasMany(() => Subscription, { foreignKey: "followerId", as: "following" })
  following!: Subscription[];

  @HasMany(() => Subscription, { foreignKey: "followeeId", as: "followers" })
  followers!: Subscription[];
}
