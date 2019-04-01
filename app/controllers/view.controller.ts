/**
 * 前台数据接口
 * 控制器是通过 class 来实现的
 * 但是并不是随便一个 class 他就能成为控制器
 * 类似继承的概念，koa-controllers 为我们提供了一个装饰器：Controller
 * 通过这个装饰器我们就可以把一个普通的类变成 具有 控制器特征的控制器类
 */

import { Controller, Get, Ctx, Post } from 'koa-controllers';
import { Context } from 'koa';
import * as moment from 'moment';

@Controller
export class ViewController {
  // 首页文章接口
  @Post('/view')
  public async article(@Ctx ctx: Context) {
    //获取所有文章
    let article = await ctx.state.db['article'].findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });

    let category = null;
    let categoryname = [];
    for (let i of article) {
      category = await ctx.state.db['category'].findById(i.categoryId);
      categoryname.push(category.name);
    }
    ctx.body = {
      articleList: article,
      categoryname: categoryname
    }

  }

  // 详细文章接口
  @Post('/view/read')
  public async editArticle(@Ctx ctx: Context) {
    let articleId = ctx.request.body.id;
    let read = ctx.request.body.read;
    await ctx.state.db['article'].update({read:read},{ where: { id: articleId } });
    let article = await ctx.state.db['article'].findOne({ where: { id: articleId } });
    let comment = await ctx.state.db['comment'].findAll({
      where: { articleId: articleId }, order: [
        ['createdAt', 'DESC']
      ]
    });
    ctx.body = {
      article,
      comment
    }
  }

  // 评论接口接口
  @Post('/view/comment')
  public async comment(@Ctx ctx: Context) {
    let comment = await ctx.state.db['comment'].create({
      userId: 0,
      articleId: ctx.request.body.articleId,
      content: ctx.request.body.content,
      username: ctx.request.body.username,
    });
    ctx.body = {
      comment
    }
  }

  // 留言接口
  @Post('/view/criticism')
  public async criticism(@Ctx ctx: Context) {
    let criticism = '';
    if (ctx.request.body.mean == 0) {
      criticism = await ctx.state.db['criticism'].create({
        content: ctx.request.body.content,
        username: ctx.request.body.username,
        userId: 0
      });
    }
    criticism = await ctx.state.db['criticism'].findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });
    ctx.body = {
      criticism
    }
  }

  //  时光轴接口
  @Post('/view/time')
  public async time(@Ctx ctx: Context) {
    let time = await ctx.state.db['time'].findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });
    ctx.body = {
      time
    }
  }

  //  友链接口
  @Post('/view/friends')
  public async friends(@Ctx ctx: Context) {
    let friend = '';
    if (ctx.request.body.mean == 0) {
      friend = await ctx.state.db['friend'].create({
        title: ctx.request.body.title,
        url: ctx.request.body.url,
        content: ctx.request.body.content,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      });
    }
    friend = await ctx.state.db['friend'].findAll();
    ctx.body = {
      friend
    }
  }
}