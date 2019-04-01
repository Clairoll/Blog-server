/**
 * 后台数据接口
 * 控制器是通过 class 来实现的
 * 但是并不是随便一个 class 他就能成为控制器
 * 类似继承的概念，koa-controllers 为我们提供了一个装饰器：Controller
 * 通过这个装饰器我们就可以把一个普通的类变成 具有 控制器特征的控制器类
 */

import { Controller, Get, Ctx, Post } from 'koa-controllers';
import { Context } from 'koa';
import * as moment from 'moment';

@Controller
export class MainController {

    // 首页接口
    @Get('/home')
    public async index(@Ctx ctx: Context) {

        let article = await ctx.state.db['article'].findAll();
        let comment = await ctx.state.db['comment'].findAll();
        let criticism = await ctx.state.db['criticism'].findAll();
        // console.log(comment);
        // console.log(criticism)
        ctx.body = {
            articleList: article,
            commentList: comment,
            criticismList: criticism
        }

    }

    // 所有文章接口(删除文章接口)
    @Post('/article')
    public async article(@Ctx ctx: Context) {
        let articleId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['article'].destroy({ where: { id: articleId } });
            await ctx.state.db['comment'].destroy({ where: { articleId: articleId } });
        }
        //获取所有文章
        let article = await ctx.state.db['article'].findAll();
        let user = null;
        let username = []
        let category = null;
        let categoryname = []
        for (let i of article) {
            user = await ctx.state.db['user'].findById(i.userId)
            username.push(user.username);
        }
        for (let i of article) {
            category = await ctx.state.db['category'].findById(i.categoryId)
            categoryname.push(category.name);
        }
        ctx.body = {
            articleList: article,
            username: username,
            categoryname: categoryname
        }

    }

    // 编辑文章接口
    @Post('/article/edit')
    public async editArticle(@Ctx ctx: Context) {
        let mean = ctx.request.body.mean; //标记位
        if (mean === 0) { // 当mean等于0时，是用户重新编辑后再次保存
            let article = await ctx.state.db['article'].update({
                content: ctx.request.body.content,
                keywotitlerd: ctx.request.body.title,
            }, {
                    where: {
                        id: ctx.request.body.id
                    }
                });
            ctx.body = {
                article
            }
        } else { // 默认展示
            let articleId = ctx.request.body.id;
            let article = await ctx.state.db['article'].findOne({ where: { id: articleId } });
            // 分类修改接口
            // let category = await ctx.state.db['category'].findOne({where:{id:article.categoryId}});
            // console.log(mean)
            ctx.body = {
                article,
                // category
            }
        }

    }


    // 写文章接口
    @Post('/writeArticle')
    public async writeArticle(@Ctx ctx: Context) {
       let article = await ctx.state.db['article'].create({
            title: ctx.request.body.title,
            userId: ctx.request.body.userId,
            categoryId: ctx.request.body.categoryId,
            img:ctx.request.body.img,
            content: ctx.request.body.content
        });
        ctx.body = {
            article
        }
    }

    // 评论接口(删除评论接口)
    @Post('/comment')
    public async comment(@Ctx ctx: Context) {
        let commentId = ctx.request.body.id;
        if (ctx.request.body.id) { // 若存在即表示删除，
            await ctx.state.db['comment'].destroy({ where: { id: commentId } });
        }
        let comment = await ctx.state.db['comment'].findAll();
        let article = null;
        let articletitle = [];
        for (let i of comment) {
            article = await ctx.state.db['article'].findById(i.articleId)
            articletitle.push(article.title);
        }
        ctx.body = {
            articletitle,
            comment
        }
    }

    // 留言接口(删除留言接口)
    @Post('/criticism')
    public async criticism(@Ctx ctx: Context) {
        let criticismId = ctx.request.body.id;
        if (ctx.request.body.id) { // 若存在即表示删除，
            await ctx.state.db['criticism'].destroy({ where: { id: criticismId } });
        }
        let criticism = await ctx.state.db['criticism'].findAll();
        ctx.body = {
            criticism
        }
    }

    // 时光轴接口(删除时光轴接口)
    @Post('/time')
    public async time(@Ctx ctx: Context) {
        let timeId = ctx.request.body.id;
        if (ctx.request.body.id) { // 若存在即表示删除，
            await ctx.state.db['time'].destroy({ where: { id: timeId } });
        }
        let time = await ctx.state.db['time'].findAll();
        ctx.body = {
            time
        }
    }

    // 编辑时光轴接口
    @Post('/time/edit')
    public async editTime(@Ctx ctx: Context) {
        let mean = ctx.request.body.mean; //标记位
        if (mean === 0) { // 当mean等于0时，是用户重新编辑后再次保存
            let time = await ctx.state.db['time'].update({
                content: ctx.request.body.content,
                title: ctx.request.body.title,
            }, {
                    where: {
                        id: ctx.request.body.id
                    }
                });
            ctx.body = {
                time
            }
        } else { // 默认展示
            let timeId = ctx.request.body.id;
            let time = await ctx.state.db['time'].findOne({ where: { id: timeId } });
            // 分类修改接口
            // let category = await ctx.state.db['category'].findOne({where:{id:article.categoryId}});
            console.log(mean)
            ctx.body = {
                time,
                // category
            }
        }

    }

    // 添加时光轴接口
    @Post('/time/add')
    public async AddTime(@Ctx ctx: Context) {
        let time = await ctx.state.db['time'].create({
            title: ctx.request.body.title,
            content: ctx.request.body.content,
        });
        ctx.body = {
            time
        }
    }

    // 分类接口(删除分类接口)
    @Post('/category')
    public async categroy(@Ctx ctx: Context) {
        let categoryId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['category'].destroy({ where: { id: categoryId } });
        }
        let category = await ctx.state.db['category'].findAll();
        ctx.body = {
            category
        }
    }

    // 编辑分类接口()
    @Post('/category/edit')
    public async categroyEdit(@Ctx ctx: Context) {
        let mean = ctx.request.body.mean;
        if (mean === 0) {
            // let categoryPid = ctx.request.body.pid;
            // let categoryName = ctx.request.body.name;
            let category = await ctx.state.db['category'].update({
                pid: ctx.request.body.pid,
                name: ctx.request.body.name,
            }, {
                    where: {
                        id: ctx.request.body.id
                    }
                });
            ctx.body = {
                category
            }
        } else {
            let categoryPid = ctx.request.body.pid;
            let categoryId = ctx.request.body.id;
            let category = await ctx.state.db['category'].findOne({ where: { id: categoryId } });
            let category0 = await ctx.state.db['category'].findAll({ where: { pid: categoryPid } });

            console.log(category0)
            ctx.body = {
                category0,
                category
            }
        }

    }

    // 添加分类接口
    @Post('/category/add')
    public async categoryAdd(@Ctx ctx: Context) {
        let category0 = await ctx.state.db['category'].findAll({ where: { pid: 0 } });
        if (ctx.request.body.pid === -1) {
            ctx.body = {
                category0
            }
        } else {
            let category = await ctx.state.db['category'].create({
                name: ctx.request.body.name,
                pid: ctx.request.body.pid,
            });
            ctx.body = {
                category0,
                category
            }
        }
    }

    // 用户接口(删除用户接口)
    @Post('/user')
    public async user(@Ctx ctx: Context) {
        // let categoryId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['user'].destroy({ where: { id: ctx.request.body.id } });
        }
        let user = await ctx.state.db['user'].findAll();
        ctx.body = {
            user
        }
    }

    // 编辑用户接口
    @Post('/user/edit')
    public async editUser(@Ctx ctx: Context) {
        let mean = ctx.request.body.mean; //标记位
        // console.log(md5('ctx.request.body.password'))
        if (mean === 0) { // 当mean等于0时，是用户重新编辑后再次保存
            let user = await ctx.state.db['user'].update({
                disabled: 1,
                username: ctx.request.body.username,
                password: ctx.request.body.password,
                mobile: ctx.request.body.mobile,
                email: ctx.request.body.email,
            }, {
                    where: {
                        id: ctx.request.body.id
                    }
                });
            ctx.body = {
                user
            }
        } else { // 默认展示
            let userId = ctx.request.body.id;
            let user = await ctx.state.db['user'].findOne({ where: { id: userId } });
            // 分类修改接口
            // let category = await ctx.state.db['category'].findOne({where:{id:article.categoryId}});
            ctx.body = {
                user,
                // category
            }
        }

    }

    // 添加用户接口
    @Post('/user/add')
    public async userAdd(@Ctx ctx: Context) {
        let user = await ctx.state.db['user'].create({
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            mobile: ctx.request.body.mobile,
            email: ctx.request.body.email,
        });
        ctx.body = {
            user
        }
    }


    // 友情链接接口(删除友情链接接口)
    @Post('/friend')
    public async friend(@Ctx ctx: Context) {
        // let categoryId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['friend'].destroy({ where: { id: ctx.request.body.id } });
        }
        let friend = await ctx.state.db['friend'].findAll();
        ctx.body = {
            friend
        }
    }


    // 编辑友情链接接口
    @Post('/friend/edit')
    public async editFriend(@Ctx ctx: Context) {
        let mean = ctx.request.body.mean; //标记位
        // console.log(md5('ctx.request.body.password'))
        if (mean === 0) { // 当mean等于0时，是用户重新编辑后再次保存
            let friend = await ctx.state.db['friend'].update({
                title: ctx.request.body.title,
                url: ctx.request.body.url,
                content: ctx.request.body.content
            }, {
                    where: {
                        id: ctx.request.body.id
                    }
                });
            ctx.body = {
                friend
            }
        } else { // 默认展示
            let friendId = ctx.request.body.id;
            let friend = await ctx.state.db['friend'].findOne({ where: { id: friendId } });
            // 分类修改接口
            // let category = await ctx.state.db['category'].findOne({where:{id:article.categoryId}});
            ctx.body = {
                friend,
                // category
            }
        }

    }

    // 添加友情链接接口
    @Post('/friend/add')
    public async friendAdd(@Ctx ctx: Context) {
        let friend = await ctx.state.db['friend'].create({
            title: ctx.request.body.title,
            url: ctx.request.body.url,
            content: ctx.request.body.content,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        ctx.body = {
            friend
        }
    }

    // 登录接口
    @Post('/login')
    public async login(@Ctx ctx: Context) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let user = await ctx.state.db['user'].findAll({ where: { username:username, password: password} });
        // console.log(user)
        ctx.body = {
           user
        }
    }
}