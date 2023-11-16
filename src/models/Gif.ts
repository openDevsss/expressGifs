import { BelongsToManySetAssociationsMixin } from "sequelize";
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Tag } from "./Tag";
import { TagGifs } from "./TagGifs";
import { User } from "./User";

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

  declare setTags: BelongsToManySetAssociationsMixin<Tag, Tag["id"]>;
}
