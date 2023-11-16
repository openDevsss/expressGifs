import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { Tag } from "./Tag";
import { TagGifs } from "./TagGifs";
import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixinOptions,
  BelongsToManySetAssociationsMixin,
} from "sequelize";

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
