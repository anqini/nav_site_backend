import { Document } from "mongoose";

export default interface ITag extends Document {
	ranking: number,
	title: string
}