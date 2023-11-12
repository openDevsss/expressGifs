import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Tag } from "./Tag";
import { Gif } from "./Gif";

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
