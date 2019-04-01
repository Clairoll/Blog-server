"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_controllers_1 = require("koa-controllers");
const moment = require("moment");
let ViewController = class ViewController {
    async article(ctx) {
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
        };
    }
    async editArticle(ctx) {
        let articleId = ctx.request.body.id;
        let read = ctx.request.body.read;
        await ctx.state.db['article'].update({ read: read }, { where: { id: articleId } });
        let article = await ctx.state.db['article'].findOne({ where: { id: articleId } });
        let comment = await ctx.state.db['comment'].findAll({
            where: { articleId: articleId }, order: [
                ['createdAt', 'DESC']
            ]
        });
        ctx.body = {
            article,
            comment
        };
    }
    async comment(ctx) {
        let comment = await ctx.state.db['comment'].create({
            userId: 0,
            articleId: ctx.request.body.articleId,
            content: ctx.request.body.content,
            username: ctx.request.body.username,
        });
        ctx.body = {
            comment
        };
    }
    async criticism(ctx) {
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
        };
    }
    async time(ctx) {
        let time = await ctx.state.db['time'].findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        ctx.body = {
            time
        };
    }
    async friends(ctx) {
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
        };
    }
};
__decorate([
    koa_controllers_1.Post('/view'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "article", null);
__decorate([
    koa_controllers_1.Post('/view/read'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "editArticle", null);
__decorate([
    koa_controllers_1.Post('/view/comment'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "comment", null);
__decorate([
    koa_controllers_1.Post('/view/criticism'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "criticism", null);
__decorate([
    koa_controllers_1.Post('/view/time'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "time", null);
__decorate([
    koa_controllers_1.Post('/view/friends'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "friends", null);
ViewController = __decorate([
    koa_controllers_1.Controller
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=view.controller.js.map