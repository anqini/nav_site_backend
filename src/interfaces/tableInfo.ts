import { Document } from "mongoose";

export default interface ITableRow extends Document {
    title: string,
    rankIn2020: string,
	rankIn2019: string,
	EnglishName: string,
	logo: string,
	change1: string,
    change2: string,
    state: string
}