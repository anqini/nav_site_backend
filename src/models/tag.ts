import { Schema, Model, model } from "mongoose";
import ITag from "../interfaces/tag";

const TagSchema: Schema = new Schema({
	rank: String,
    title: String,
    rankIn2020: String
})

export default model<ITag>("Tag", TagSchema)
