/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const rents_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(4);
async function bootstrap() {
    const app = await core_1.NestFactory.create(rents_module_1.RentsModule);
    await app.listen(3004);
    const url = await app.getUrl();
    common_1.Logger.log(`${url}/graphql`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RentsModule = void 0;
const path_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const rents_service_1 = __webpack_require__(7);
const rents_schema_1 = __webpack_require__(10);
const rents_resolver_1 = __webpack_require__(11);
const user_model_1 = __webpack_require__(14);
const products_model_1 = __webpack_require__(15);
const products_resolver_1 = __webpack_require__(26);
const products_service_1 = __webpack_require__(20);
const users_resolver_1 = __webpack_require__(29);
const users_service_1 = __webpack_require__(23);
const products_schema_1 = __webpack_require__(31);
const user_schema_1 = __webpack_require__(32);
let RentsModule = class RentsModule {
};
RentsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "RENT", schema: rents_schema_1.rentSchema },
                { name: "PRODUCT", schema: products_schema_1.productSchema },
                { name: "USER", schema: user_schema_1.userSchema },
            ]),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/microdb"),
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: path_1.join(process.cwd(), "apps/rents/src/schema.gql"),
                buildSchemaOptions: { orphanedTypes: [user_model_1.User, products_model_1.Product] },
            }),
        ],
        providers: [
            rents_service_1.RentsService,
            rents_resolver_1.RentResolver,
            products_resolver_1.ProductsResolver,
            products_service_1.ProductsService,
            users_resolver_1.UsersResolver,
            users_service_1.UsersService,
        ],
    })
], RentsModule);
exports.RentsModule = RentsModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");;

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");;

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");;

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RentsService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(8);
const constant_1 = __webpack_require__(9);
let RentsService = class RentsService {
    constructor(rentModel) {
        this.rentModel = rentModel;
    }
    async create(input) {
        const existItem = await this.rentModel.findOne({
            $and: [
                {
                    userId: input.userId,
                },
                {
                    productId: input.productId,
                },
            ],
        });
        if (existItem) {
            throw new Error(constant_1.staticError.alreayRent);
        }
        return await this.rentModel.create(input);
    }
};
RentsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("RENT")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], RentsService);
exports.RentsService = RentsService;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),
/* 9 */
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
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rentSchema = void 0;
const mongoose = __webpack_require__(8);
exports.rentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PRODUCT",
    },
}, { timestamps: true });


/***/ }),
/* 11 */
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RentResolver = void 0;
const graphql_1 = __webpack_require__(6);
const graphql_2 = __webpack_require__(6);
const mongodb_1 = __webpack_require__(12);
const rents_model_1 = __webpack_require__(13);
const rents_service_1 = __webpack_require__(7);
const rents_input_1 = __webpack_require__(18);
const products_model_1 = __webpack_require__(15);
const rents_interface_1 = __webpack_require__(19);
const products_service_1 = __webpack_require__(20);
const user_model_1 = __webpack_require__(21);
const users_service_1 = __webpack_require__(23);
let RentResolver = class RentResolver {
    constructor(rentService, productService, userService) {
        this.rentService = rentService;
        this.productService = productService;
        this.userService = userService;
    }
    async productId(rent) {
        if (!rent.productId)
            return null;
        return await this.productService.getOne({
            _id: new mongodb_1.ObjectId(rent.productId),
        });
    }
    async userId(rent) {
        if (!rent.userId)
            return null;
        return await this.userService.findOne({
            _id: new mongodb_1.ObjectId(rent.userId),
        });
    }
    async create(input) {
        return this.rentService.create(Object.assign({}, input));
    }
};
__decorate([
    graphql_1.ResolveField(() => products_model_1.Product, { nullable: true }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof rents_interface_1.IRent !== "undefined" && rents_interface_1.IRent) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RentResolver.prototype, "productId", null);
__decorate([
    graphql_1.ResolveField(() => user_model_1.User, { nullable: true }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof rents_interface_1.IRent !== "undefined" && rents_interface_1.IRent) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RentResolver.prototype, "userId", null);
__decorate([
    graphql_1.Mutation(() => rents_model_1.Rent, { name: "createRent" }),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof rents_input_1.RentInput !== "undefined" && rents_input_1.RentInput) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], RentResolver.prototype, "create", null);
RentResolver = __decorate([
    graphql_2.Resolver((of) => rents_model_1.Rent),
    __metadata("design:paramtypes", [typeof (_d = typeof rents_service_1.RentsService !== "undefined" && rents_service_1.RentsService) === "function" ? _d : Object, typeof (_e = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _e : Object, typeof (_f = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _f : Object])
], RentResolver);
exports.RentResolver = RentResolver;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("mongodb");;

/***/ }),
/* 13 */
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rent = void 0;
const graphql_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(14);
const products_model_1 = __webpack_require__(15);
const date_scalar_1 = __webpack_require__(16);
let Rent = class Rent {
    constructor(rent) {
        Object.assign(rent);
    }
};
__decorate([
    graphql_1.Field((type) => graphql_1.ID),
    graphql_1.Directive("@external"),
    __metadata("design:type", Number)
], Rent.prototype, "id", void 0);
__decorate([
    graphql_1.Field((type) => products_model_1.Product),
    __metadata("design:type", typeof (_a = typeof products_model_1.Product !== "undefined" && products_model_1.Product) === "function" ? _a : Object)
], Rent.prototype, "productId", void 0);
__decorate([
    graphql_1.Field((type) => user_model_1.User),
    __metadata("design:type", typeof (_b = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _b : Object)
], Rent.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => date_scalar_1.DATETIME, { nullable: true }),
    __metadata("design:type", Object)
], Rent.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => date_scalar_1.DATETIME, { nullable: true }),
    __metadata("design:type", Object)
], Rent.prototype, "updatedAt", void 0);
Rent = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive("@extends"),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_c = typeof Partial !== "undefined" && Partial) === "function" ? _c : Object])
], Rent);
exports.Rent = Rent;


/***/ }),
/* 14 */
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
const graphql_1 = __webpack_require__(6);
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const graphql_1 = __webpack_require__(6);
let Product = class Product {
    constructor(product) {
        Object.assign(product);
    }
};
__decorate([
    graphql_1.Field((type) => graphql_1.ID),
    graphql_1.Directive("@external"),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
Product = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive("@extends"),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Product);
exports.Product = Product;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DATETIME = void 0;
const graphql_1 = __webpack_require__(17);
exports.DATETIME = new graphql_1.GraphQLScalarType({
    name: 'DateTimeScalar',
    description: 'A date and time, represented as an ISO-8601 string',
    serialize: (value) => new Date(value).toUTCString(),
    parseValue: (value) => new Date(value).toUTCString(),
    parseLiteral: (ast) => new Date(ast.value).toUTCString(),
});


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("graphql");;

/***/ }),
/* 18 */
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
exports.RentInput = void 0;
const graphql_1 = __webpack_require__(6);
let RentInput = class RentInput {
};
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], RentInput.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], RentInput.prototype, "productId", void 0);
RentInput = __decorate([
    graphql_1.InputType()
], RentInput);
exports.RentInput = RentInput;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 20 */
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
exports.ProductsService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(8);
const mongodb_1 = __webpack_require__(12);
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll() {
        return await this.productModel.find();
    }
    async create(input) {
        return await this.productModel.create(input);
    }
    async getOne(id) {
        return await this.productModel.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("PRODUCT")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ProductsService);
exports.ProductsService = ProductsService;


/***/ }),
/* 21 */
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
exports.User = void 0;
const graphql_1 = __webpack_require__(6);
const post_model_1 = __webpack_require__(22);
let User = class User {
    constructor(user) {
        Object.assign(user);
    }
};
__decorate([
    graphql_1.Field((type) => graphql_1.ID),
    graphql_1.Directive('@external'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    graphql_1.Field((type) => [post_model_1.Post]),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
User = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive('@extends'),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], User);
exports.User = User;


/***/ }),
/* 22 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Post = void 0;
const graphql_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(21);
let Post = class Post {
    constructor(post) {
        Object.assign(this, post);
    }
};
__decorate([
    graphql_1.Field((type) => graphql_1.ID),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Post.prototype, "votes", void 0);
__decorate([
    graphql_1.Field((type) => user_model_1.User),
    __metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], Post.prototype, "user", void 0);
Post = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_b = typeof Partial !== "undefined" && Partial) === "function" ? _b : Object])
], Post);
exports.Post = Post;


/***/ }),
/* 23 */
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
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(8);
const mongodb_1 = __webpack_require__(12);
const jwt_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(5);
const bcrypt = __webpack_require__(25);
const constant_1 = __webpack_require__(9);
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
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("bcrypt");;

/***/ }),
/* 26 */
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsResolver = void 0;
const graphql_1 = __webpack_require__(6);
const graphql_2 = __webpack_require__(6);
const products_model_1 = __webpack_require__(15);
const products_service_1 = __webpack_require__(20);
const products_input_1 = __webpack_require__(27);
const common_1 = __webpack_require__(4);
const constant_1 = __webpack_require__(9);
let ProductsResolver = class ProductsResolver {
    constructor(productService) {
        this.productService = productService;
    }
    async getProducts() {
        return await this.productService.findAll();
    }
    getProduct(product) {
        return { __typename: "Product", id: product.id };
    }
    async create(input) {
        try {
            let payload = Object.assign({}, input);
            return await this.productService.create(payload);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message, `${constant_1.staticError.product}_CREATE.ERROR`);
        }
    }
};
__decorate([
    graphql_1.Query((returns) => [products_model_1.Product], { name: "getProducts" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "getProducts", null);
__decorate([
    graphql_1.ResolveField((of) => products_model_1.Product, { name: "getProduct" }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof products_model_1.Product !== "undefined" && products_model_1.Product) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "getProduct", null);
__decorate([
    graphql_1.Mutation(() => products_model_1.Product, { name: "createProduct" }),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof products_input_1.CreateProductInput !== "undefined" && products_input_1.CreateProductInput) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "create", null);
ProductsResolver = __decorate([
    graphql_2.Resolver((of) => products_model_1.Product),
    __metadata("design:paramtypes", [typeof (_c = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _c : Object])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;


/***/ }),
/* 27 */
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
exports.ProductUpdateInput = exports.CreateProductInput = void 0;
const graphql_1 = __webpack_require__(6);
const global_enum_1 = __webpack_require__(28);
let CreateProductInput = class CreateProductInput {
};
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: false }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => global_enum_1.PRODUCT_UNIT, { nullable: true }),
    __metadata("design:type", typeof (_a = typeof global_enum_1.PRODUCT_UNIT !== "undefined" && global_enum_1.PRODUCT_UNIT) === "function" ? _a : Object)
], CreateProductInput.prototype, "unit", void 0);
CreateProductInput = __decorate([
    graphql_1.InputType()
], CreateProductInput);
exports.CreateProductInput = CreateProductInput;
let ProductUpdateInput = class ProductUpdateInput extends graphql_1.OmitType(CreateProductInput, []) {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ProductUpdateInput.prototype, "_id", void 0);
ProductUpdateInput = __decorate([
    graphql_1.InputType()
], ProductUpdateInput);
exports.ProductUpdateInput = ProductUpdateInput;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCT_UNIT = void 0;
var PRODUCT_UNIT;
(function (PRODUCT_UNIT) {
    PRODUCT_UNIT["USD"] = "Usd";
    PRODUCT_UNIT["INR"] = "Inr";
})(PRODUCT_UNIT = exports.PRODUCT_UNIT || (exports.PRODUCT_UNIT = {}));


/***/ }),
/* 29 */
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
const graphql_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(14);
const users_service_1 = __webpack_require__(23);
const user_input_1 = __webpack_require__(30);
const common_1 = __webpack_require__(4);
const constant_1 = __webpack_require__(9);
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
/* 30 */
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
const graphql_1 = __webpack_require__(6);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.productSchema = void 0;
const mongoose = __webpack_require__(8);
exports.productSchema = new mongoose.Schema({
    name: String,
    price: String,
    unit: String,
}, { timestamps: true });


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userSchema = void 0;
const mongoose = __webpack_require__(8);
exports.userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true });


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