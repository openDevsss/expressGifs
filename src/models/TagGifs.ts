import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Gif } from "./Gif";
import { Tag } from "./Tag";

@Table({
  timestamps: false,
  tableName: "TagGifs",
})
export class TagGifs extends Model {
  @ForeignKey(() => Tag)
  @Column
  tagId!: number;

  @ForeignKey(() => Gif)
  @Column
  gifId!: number;
}
