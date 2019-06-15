import { Schema, Model, model } from "mongoose";
import IWeb from "../interfaces/website";

const WebSchema: Schema = new Schema({
    id: Number,
	ranking: Number,
	en_title: String,
	title: String,
	content: String,
	description: String,
	phone: String,
	city: String,
	state: String,
	fax: String,
	Email: String,
	web: String,
	school: {
        "学院列表" : String, 
        "本科专业列表" : String, 
        "研究生专业列表" : String, 
        "研究生院" : String, 
        "国际学生本科申请" : String, 
        "国际学生本科申请截止日期" : String, 
        "英语能力要求" : String, 
        "本科学费" : String
    },
	images: String,
	category: Array,
	post_tag: Array,
	icon: Number
})

export default model<IWeb>("Website", WebSchema)
