/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const users_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(users_module_1.UsersModule);
    await app.listen(3001);
    const url = await app.getUrl();
    common_1.Logger.log(`${url}/graphql`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");;

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const path_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(6);
const users_resolver_1 = __webpack_require__(7);
const users_service_1 = __webpack_require__(9);
const user_schema_1 = __webpack_require__(16);
const config_1 = __webpack_require__(17);
const app_1 = __webpack_require__(18);
const database_1 = __webpack_require__(19);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [app_1.default, database_1.default],
            }),
            mongoose_1.MongooseModule.forFeature([{ name: "USER", schema: user_schema_1.userSchema }]),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/microdb"),
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: path_1.join(process.cwd(), "apps/users/src/schema.gql"),
            }),
        ],
        providers: [users_resolver_1.UsersResolver, users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");;

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");;

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersResolver = void 0;
const graphql_1 = __webpack_require__(5);
const user_model_1 = __webpack_require__(8);
const users_service_1 = __webpack_require__(9);
const user_input_1 = __webpack_require__(15);
const common_1 = __webpack_require__(1);
const constant_1 = __webpack_require__(14);
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    resolveReference(reference) {
        return this.usersService.findOneById(reference.id);
    }
    async getUser(id) {
        return await this.usersService.findOneById(id);
    }
    async create(input) {
        let payload = Object.assign({}, input);
        payload.email = payload.email.toLowerCase();
        const existUser = await this.usersService.findOne({
            email: payload.email,
        });
        if (existUser)
            throw new Error(`${constant_1.staticError.userExist}`);
        return this.usersService.create(Object.assign({}, payload));
    }
    async update(input) {
        try {
            let payload = Object.assign({}, input);
            const user = await this.usersService.update(payload);
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message, `${constant_1.staticError.user}_UPDATE.ERROR`);
        }
    }
    async login(input) {
        try {
            let payload = Object.assign(Object.assign({}, input), { email: input.email.toLowerCase() });
            return await this.usersService.login(payload);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message, `${constant_1.staticError.user}_LOGIN.ERROR`);
        }
    }
};
__decorate([
    graphql_1.ResolveReference(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "resolveReference", null);
__decorate([
    graphql_1.Query((returns) => user_model_1.User, { name: "user" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUser", null);
__decorate([
    graphql_1.Mutation(() => user_model_1.User, { name: "createUser" }),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof user_input_1.CreateUserInput !== "undefined" && user_input_1.CreateUserInput) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "create", null);
__decorate([
    graphql_1.Mutation(() => user_model_1.User, { name: "updateUser" }),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_input_1.UserUpdateInput !== "undefined" && user_input_1.UserUpdateInput) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "update", null);
__decorate([
    graphql_1.Mutation(() => user_model_1.LoginResponse, { name: "login" }),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof user_input_1.LoginInput !== "undefined" && user_input_1.LoginInput) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "login", null);
UsersResolver = __decorate([
    graphql_1.Resolver((of) => user_model_1.User),
    __metadata("design:paramtypes", [typeof (_d = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _d : Object])
], UsersResolver);
exports.UsersResolver = UsersResolver;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginResponse = exports.User = void 0;
const graphql_1 = __webpack_require__(5);
let User = class User {
    constructor(user) {
        Object.assign(user);
    }
};
__decorate([
    graphql_1.Field((type) => graphql_1.ID),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
User = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], User);
exports.User = User;
let LoginResponse = class LoginResponse {
};
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], LoginResponse.prototype, "token", void 0);
__decorate([
    graphql_1.Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], LoginResponse.prototype, "userInfo", void 0);
LoginResponse = __decorate([
    graphql_1.ObjectType({ isAbstract: true })
], LoginResponse);
exports.LoginResponse = LoginResponse;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const mongodb_1 = __webpack_require__(11);
const jwt_1 = __webpack_require__(12);
const mongoose_2 = __webpack_require__(6);
const bcrypt = __webpack_require__(13);
const constant_1 = __webpack_require__(14);
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.posts = [{ id: 1, name: "melkir", email: "test@gmail.com" }];
    }
    async findOneById(postId) {
        return await this.posts.find(({ id }) => id === postId);
    }
    async findAll() {
        return await this.userModel.aggregate();
    }
    async getMany(query) {
        return await this.userModel.aggregate();
    }
    async findOne(query) {
        console.log({ query });
        return await this.userModel.findOne(query).lean();
    }
    async createMany(payload) {
        await this.userModel.deleteMany({
            _id: { $in: payload.map((doc) => new mongodb_1.ObjectId(doc._id)) },
        });
        return await this.userModel.create(payload);
    }
    async create(input) {
        const hashedPassword = await bcrypt.hash(input.password, 12);
        let payload = Object.assign(Object.assign({}, input), { email: input.email.toLowerCase(), password: hashedPassword });
        return await this.userModel.create(payload);
    }
    async update(input) {
        let payload = Object.assign(Object.assign({}, input), { email: input.email.toLowerCase() });
        return await this.userModel.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(payload._id),
        }, ...payload, {
            new: true,
            upsert: true,
        });
    }
    async remove(id) {
        return await this.userModel.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
    async login(loginInfo) {
        const jwt = new jwt_1.JwtService({
            secret: constant_1.jwtConstants.secret,
            signOptions: { expiresIn: constant_1.jwtConstants.expiresIn },
        });
        const existUser = await this.userModel.findOne({
            email: loginInfo.email,
        });
        if (!existUser) {
            throw new Error(constant_1.staticError.userNotFound);
        }
        const result = await bcrypt.compare(loginInfo.password, existUser.password);
        if (result) {
            const payload = {
                userId: new mongodb_1.ObjectId(existUser._id),
            };
            console.log({ payload });
            const token = jwt.sign(payload);
            return { token, userInfo: existUser };
        }
        throw new Error(constant_1.staticError.passwordNotMatched);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("USER")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("mongodb");;

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("bcrypt");;

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = exports.staticError = void 0;
exports.staticError = {
    alreayRent: "already on rent",
    userExist: "User already exist",
    userNotFound: "User not found",
    passwordNotMatched: "Password Not Matched",
    user: "USER_LOGIN",
    product: 'PRODUCT'
};
exports.jwtConstants = {
    secret: 'micro',
    expiresIn: '1d',
};


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginInput = exports.UserUpdateInput = exports.CreateUserInput = void 0;
const graphql_1 = __webpack_require__(5);
let CreateUserInput = class CreateUserInput {
};
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = __decorate([
    graphql_1.InputType()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let UserUpdateInput = class UserUpdateInput extends graphql_1.OmitType(CreateUserInput, [
    "email",
]) {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "_id", void 0);
UserUpdateInput = __decorate([
    graphql_1.InputType()
], UserUpdateInput);
exports.UserUpdateInput = UserUpdateInput;
let LoginInput = class LoginInput {
};
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    graphql_1.InputType()
], LoginInput);
exports.LoginInput = LoginInput;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userSchema = void 0;
const mongoose = __webpack_require__(10);
exports.userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true });


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@nestjs/config");;

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(17);
exports.default = config_1.registerAs("app", () => ({
    url: process.env.DATABASE_URL,
}));


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(17);
exports.default = config_1.registerAs("database", () => ({
    type: "mongoose",
    url: process.env.DATABASE_URL,
}));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;