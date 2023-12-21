import { BelongsToManySetAssociationsMixin } from "sequelize";
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { TagGifs } from "./TagGifs";
import { User } from "./User";
import { Like } from "./Like";

@Table({
  timestamps: true,
  tableName: "Gifs",
})
export class Gif extends Model {
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
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Tag, () => TagGifs)
  tags!: [Tag];

  @HasMany(() => Comment)
  comment!: Comment;

  @HasMany(() => Like)
  likes!: Like[];

  declare setTags: BelongsToManySetAssociationsMixin<Tag, Tag["id"]>;
}
