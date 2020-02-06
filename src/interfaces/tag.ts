import { Document } from "mongoose";

export default interface ITag extends Document {
	rank: string,
	title: string
}