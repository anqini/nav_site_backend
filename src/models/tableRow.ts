import { Schema, Model, model } from "mongoose";
import ITableRow from "../interfaces/tableInfo";

const TableSchema: Schema = new Schema({
    title: String,
    rankIn2020: String,
	rankIn2019: String,
	EnglishName: String,
	logo: String,
	change1: String,
    change2: String,
    state: String
})

export default model<ITableRow>("TableRow", TableSchema)
