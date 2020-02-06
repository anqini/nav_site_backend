// express
import { NextFunction, Response, Request, Router } from "express";
// interface
import IWeb from "../interfaces/website";
import ITag from "../interfaces/tag";
// mongoose model
import Website from "../models/website";

/**
 * @class WAPI
 */
export class WAPI {
    /**
     * Create the api
     *  @static
     */
    public static create(router: Router) {
        // GET
        router.get("/category/:type", (req: Request, res: Response, next: NextFunction) => {
            new WAPI().getByCategory(req, res, next);
        })
        router.get("/detail/:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
            new WAPI().getDetail(req, res,next);
        })
        router.get("/search/:content", (req: Request, res: Response, next: NextFunction) => {
            new WAPI().search(req, res, next);
        })
        router.get("/schools", (req: Request, res: Response, next: NextFunction) => {
            new WAPI().getSchools(req, res, next);
        })
    }


    /**
     * get a university
     * @param req 
     * @param res
     * @param next
     */
    public getDetail(req: Request, res: Response, next: NextFunction) {
        // verify the id parameter exists
        const PARAM_ID: string = "id";
        if (req.params[PARAM_ID] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }

        // get id
        const id: string = req.params[PARAM_ID];

        // get Website
        Website.findById(id).then((website: IWeb | null) => {
            // verify website is found
            if (website == null) {
                res.sendStatus(404);
                next();
                return;
            }

            // send json
            res.json(website.toObject());
            next();
        }).catch(next);
    }
    /**
     * get a university
     * @param req 
     * @param res
     * @param next
     */
    public getSchools(req: Request, res: Response, next: NextFunction) {

        // get Website
        Website.find({}, {rank: 1, title: 1}).then((tags:  Array<ITag>) => {
            // verify website is found
            if (!tags.length) {
                res.sendStatus(404);
                next();
                return;
            }

            // send json
            res.json(tags.map((tag: ITag) => tag.toObject()));
            next();
        }).catch(next);
    }

    /**
     * get websites by category
     * @param req 
     * @param res
     * @param next
     */
    public async getByCategory(req: Request, res: Response, next: NextFunction) {
        // get websites by Category
        const PARAM_TP: string = "type";
        if (req.params[PARAM_TP] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }

        // get id
        const type: string = req.params[PARAM_TP];

        const typeRange: Array<string> = ["综合大学", "商学", "计算机", "物理", 
                                        "化学", "生物", "电子电气", "环境工程", "经济",
                                        "在线教育", "K12", "专业协会", "书", "外语学习",
                                        "媒体和新闻", "学术搜索","技能学习", "ivy",
                                        "搜学校", "留学论坛", "科技和工具", "住宿",
                                        "医疗与保险", "奖学金", "招聘和职场", "政府官方"];
        if (!typeRange.includes(type)) {
            res.sendStatus(404);
            next();
            return;
        }

        Website.find({category: type}).then((websites: Array<IWeb>) => {
            if (!websites.length) {
                res.sendStatus(404);
                next();
                return;
            }
            res.json(websites.map((website: IWeb) => website.toObject()));
            next();
        }).catch(next);

    }

    /**
     * get by country
     * @param req
     * @param res
     * @param next
     */
    public search(req: Request, res: Response, next: NextFunction) {
        // verify the country parameter
        const PARAM_CNTNT: string = "content";
        if (req.params[PARAM_CNTNT] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }

        // get id
        const content: string = req.params[PARAM_CNTNT];

        if (req.params.content.length > 40) {
            res.status(400).send();
            next();
            return;
        }
        Website.find({ $or: [
            {title: { $regex: req.params.content, $options: 'i' }},
            {en_title: { $regex: req.params.content, $options: 'i' }},
            {description: { $regex: req.params.content, $options: 'i' }}
            ]
        }).then((websites: Array<IWeb>) => {
            res.json(websites.map((website: IWeb) => website.toObject()));
            next();
        }).catch(next);
    }
}