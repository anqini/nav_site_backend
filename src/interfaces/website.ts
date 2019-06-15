import { Document } from "mongoose";
import IDS from './schoolDtl';

export default interface IWeb extends Document {
    id: number,
	ranking: number,
	en_title: string,
	title: string,
	content: string,
	description: string,
	phone: string,
	city: string,
	state: string,
	fax: string,
	Email: string,
	web: string,
	school: IDS,
	images: string,
	category: Array<string>,
	post_tag: Array<string>,
	icon: Number
}