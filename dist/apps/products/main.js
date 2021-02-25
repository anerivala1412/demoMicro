/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const products_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(products_module_1.ProductsModule);
    await app.listen(3003);
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
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(4);
const path_1 = __webpack_require__(5);
const products_service_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const products_schema_1 = __webpack_require__(10);
const products_resolver_1 = __webpack_require__(11);
const user_model_1 = __webpack_require__(16);
const products_model_1 = __webpack_require__(12);
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "PRODUCT", schema: products_schema_1.productSchema }]),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/microdb"),
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: path_1.join(process.cwd(), "apps/products/src/schema.gql"),
                buildSchemaOptions: { orphanedTypes: [user_model_1.User, products_model_1.Product] },
            }),
        ],
        providers: [products_service_1.ProductsService, products_resolver_1.ProductsResolver],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("path");;

/***/ }),
/* 6 */
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
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(8);
const mongodb_1 = __webpack_require__(9);
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
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");;

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("mongodb");;

/***/ }),
/* 10 */
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsResolver = void 0;
const graphql_1 = __webpack_require__(4);
const graphql_2 = __webpack_require__(4);
const products_model_1 = __webpack_require__(12);
const products_service_1 = __webpack_require__(6);
const products_input_1 = __webpack_require__(14);
const common_1 = __webpack_require__(1);
const constant_1 = __webpack_require__(15);
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
/* 12 */
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
exports.Product = void 0;
const graphql_1 = __webpack_require__(4);
const global_enum_1 = __webpack_require__(13);
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
    graphql_1.Field(() => global_enum_1.PRODUCT_UNIT, { nullable: true }),
    __metadata("design:type", typeof (_a = typeof global_enum_1.PRODUCT_UNIT !== "undefined" && global_enum_1.PRODUCT_UNIT) === "function" ? _a : Object)
], Product.prototype, "unit", void 0);
Product = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive("@extends"),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_b = typeof Partial !== "undefined" && Partial) === "function" ? _b : Object])
], Product);
exports.Product = Product;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCT_UNIT = void 0;
const graphql_1 = __webpack_require__(4);
var PRODUCT_UNIT;
(function (PRODUCT_UNIT) {
    PRODUCT_UNIT["USD"] = "Usd";
    PRODUCT_UNIT["INR"] = "Inr";
})(PRODUCT_UNIT = exports.PRODUCT_UNIT || (exports.PRODUCT_UNIT = {}));
graphql_1.registerEnumType(PRODUCT_UNIT, {
    name: 'PRODUCT_UNIT',
});


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
exports.ProductUpdateInput = exports.CreateProductInput = void 0;
const graphql_1 = __webpack_require__(4);
const global_enum_1 = __webpack_require__(13);
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
/* 15 */
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
/* 16 */
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
const graphql_1 = __webpack_require__(4);
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