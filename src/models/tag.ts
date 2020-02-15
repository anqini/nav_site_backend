import { Schema, Model, model } from "mongoose";
import ITag from "../interfaces/tag";

const TagSchema: Schema = new Schema({
	rank: String,
	title: String
})

export default model<ITag>("Tag", TagSchema)
