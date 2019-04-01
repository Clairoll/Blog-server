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
let MainController = class MainController {
    async index(ctx) {
        let article = await ctx.state.db['article'].findAll();
        let comment = await ctx.state.db['comment'].findAll();
        let criticism = await ctx.state.db['criticism'].findAll();
        ctx.body = {
            articleList: article,
            commentList: comment,
            criticismList: criticism
        };
    }
    async article(ctx) {
        let articleId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['article'].destroy({ where: { id: articleId } });
            await ctx.state.db['comment'].destroy({ where: { articleId: articleId } });
        }
        let article = await ctx.state.db['article'].findAll();
        let user = null;
        let username = [];
        let category = null;
        let categoryname = [];
        for (let i of article) {
            user = await ctx.state.db['user'].findById(i.userId);
            username.push(user.username);
        }
        for (let i of article) {
            category = await ctx.state.db['category'].findById(i.categoryId);
            categoryname.push(category.name);
        }
        ctx.body = {
            articleList: article,
            username: username,
            categoryname: categoryname
        };
    }
    async editArticle(ctx) {
        let mean = ctx.request.body.mean;
        if (mean === 0) {
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
            };
        }
        else {
            let articleId = ctx.request.body.id;
            let article = await ctx.state.db['article'].findOne({ where: { id: articleId } });
            ctx.body = {
                article,
            };
        }
    }
    async writeArticle(ctx) {
        let article = await ctx.state.db['article'].create({
            title: ctx.request.body.title,
            userId: ctx.request.body.userId,
            categoryId: ctx.request.body.categoryId,
            img: ctx.request.body.img,
            content: ctx.request.body.content
        });
        ctx.body = {
            article
        };
    }
    async comment(ctx) {
        let commentId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['comment'].destroy({ where: { id: commentId } });
        }
        let comment = await ctx.state.db['comment'].findAll();
        let article = null;
        let articletitle = [];
        for (let i of comment) {
            article = await ctx.state.db['article'].findById(i.articleId);
            articletitle.push(article.title);
        }
        ctx.body = {
            articletitle,
            comment
        };
    }
    async criticism(ctx) {
        let criticismId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['criticism'].destroy({ where: { id: criticismId } });
        }
        let criticism = await ctx.state.db['criticism'].findAll();
        ctx.body = {
            criticism
        };
    }
    async time(ctx) {
        let timeId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['time'].destroy({ where: { id: timeId } });
        }
        let time = await ctx.state.db['time'].findAll();
        ctx.body = {
            time
        };
    }
    async editTime(ctx) {
        let mean = ctx.request.body.mean;
        if (mean === 0) {
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
            };
        }
        else {
            let timeId = ctx.request.body.id;
            let time = await ctx.state.db['time'].findOne({ where: { id: timeId } });
            console.log(mean);
            ctx.body = {
                time,
            };
        }
    }
    async AddTime(ctx) {
        let time = await ctx.state.db['time'].create({
            title: ctx.request.body.title,
            content: ctx.request.body.content,
        });
        ctx.body = {
            time
        };
    }
    async categroy(ctx) {
        let categoryId = ctx.request.body.id;
        if (ctx.request.body.id) {
            await ctx.state.db['category'].destroy({ where: { id: categoryId } });
        }
        let category = await ctx.state.db['category'].findAll();
        ctx.body = {
            category
        };
    }
    async categroyEdit(ctx) {
        let mean = ctx.request.body.mean;
        if (mean === 0) {
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
            };
        }
        else {
            let categoryPid = ctx.request.body.pid;
            let categoryId = ctx.request.body.id;
            let category = await ctx.state.db['category'].findOne({ where: { id: categoryId } });
            let category0 = await ctx.state.db['category'].findAll({ where: { pid: categoryPid } });
            console.log(category0);
            ctx.body = {
                category0,
                category
            };
        }
    }
    async categoryAdd(ctx) {
        let category0 = await ctx.state.db['category'].findAll({ where: { pid: 0 } });
        if (ctx.request.body.pid === -1) {
            ctx.body = {
                category0
            };
        }
        else {
            let category = await ctx.state.db['category'].create({
                name: ctx.request.body.name,
                pid: ctx.request.body.pid,
            });
            ctx.body = {
                category0,
                category
            };
        }
    }
    async user(ctx) {
        if (ctx.request.body.id) {
            await ctx.state.db['user'].destroy({ where: { id: ctx.request.body.id } });
        }
        let user = await ctx.state.db['user'].findAll();
        ctx.body = {
            user
        };
    }
    async editUser(ctx) {
        let mean = ctx.request.body.mean;
        if (mean === 0) {
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
            };
        }
        else {
            let userId = ctx.request.body.id;
            let user = await ctx.state.db['user'].findOne({ where: { id: userId } });
            ctx.body = {
                user,
            };
        }
    }
    async userAdd(ctx) {
        let user = await ctx.state.db['user'].create({
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            mobile: ctx.request.body.mobile,
            email: ctx.request.body.email,
        });
        ctx.body = {
            user
        };
    }
    async friend(ctx) {
        if (ctx.request.body.id) {
            await ctx.state.db['friend'].destroy({ where: { id: ctx.request.body.id } });
        }
        let friend = await ctx.state.db['friend'].findAll();
        ctx.body = {
            friend
        };
    }
    async editFriend(ctx) {
        let mean = ctx.request.body.mean;
        if (mean === 0) {
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
            };
        }
        else {
            let friendId = ctx.request.body.id;
            let friend = await ctx.state.db['friend'].findOne({ where: { id: friendId } });
            ctx.body = {
                friend,
            };
        }
    }
    async friendAdd(ctx) {
        let friend = await ctx.state.db['friend'].create({
            title: ctx.request.body.title,
            url: ctx.request.body.url,
            content: ctx.request.body.content,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        ctx.body = {
            friend
        };
    }
    async login(ctx) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let user = await ctx.state.db['user'].findAll({ where: { username: username, password: password } });
        ctx.body = {
            user
        };
    }
};
__decorate([
    koa_controllers_1.Get('/home'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "index", null);
__decorate([
    koa_controllers_1.Post('/article'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "article", null);
__decorate([
    koa_controllers_1.Post('/article/edit'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "editArticle", null);
__decorate([
    koa_controllers_1.Post('/writeArticle'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "writeArticle", null);
__decorate([
    koa_controllers_1.Post('/comment'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "comment", null);
__decorate([
    koa_controllers_1.Post('/criticism'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "criticism", null);
__decorate([
    koa_controllers_1.Post('/time'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "time", null);
__decorate([
    koa_controllers_1.Post('/time/edit'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "editTime", null);
__decorate([
    koa_controllers_1.Post('/time/add'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "AddTime", null);
__decorate([
    koa_controllers_1.Post('/category'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "categroy", null);
__decorate([
    koa_controllers_1.Post('/category/edit'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "categroyEdit", null);
__decorate([
    koa_controllers_1.Post('/category/add'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "categoryAdd", null);
__decorate([
    koa_controllers_1.Post('/user'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "user", null);
__decorate([
    koa_controllers_1.Post('/user/edit'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "editUser", null);
__decorate([
    koa_controllers_1.Post('/user/add'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "userAdd", null);
__decorate([
    koa_controllers_1.Post('/friend'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "friend", null);
__decorate([
    koa_controllers_1.Post('/friend/edit'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "editFriend", null);
__decorate([
    koa_controllers_1.Post('/friend/add'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "friendAdd", null);
__decorate([
    koa_controllers_1.Post('/login'),
    __param(0, koa_controllers_1.Ctx),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "login", null);
MainController = __decorate([
    koa_controllers_1.Controller
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map