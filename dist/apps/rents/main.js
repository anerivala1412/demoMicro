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
const rents_schema_1 = __webpack_require__(9);
const rents_resolver_1 = __webpack_require__(10);
let RentsModule = class RentsModule {
};
RentsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "RENT", schema: rents_schema_1.rentSchema }]),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/microdb"),
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: path_1.join(process.cwd(), "apps/rents/src/schema.gql"),
            }),
        ],
        providers: [rents_service_1.RentsService, rents_resolver_1.RentResolver],
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
let RentsService = class RentsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(input) {
        return await this.productModel.create(input);
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
/* 10 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RentResolver = void 0;
const graphql_1 = __webpack_require__(6);
const graphql_2 = __webpack_require__(6);
const rents_model_1 = __webpack_require__(11);
const rents_service_1 = __webpack_require__(7);
const rents_input_1 = __webpack_require__(14);
let RentResolver = class RentResolver {
    constructor(rentService) {
        this.rentService = rentService;
    }
    async create(input) {
        return this.rentService.create(Object.assign({}, input));
    }
};
__decorate([
    graphql_1.Mutation(() => rents_model_1.Rent, { name: "createRent" }),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof rents_input_1.RentInput !== "undefined" && rents_input_1.RentInput) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RentResolver.prototype, "create", null);
RentResolver = __decorate([
    graphql_2.Resolver((of) => rents_model_1.Rent),
    __metadata("design:paramtypes", [typeof (_b = typeof rents_service_1.RentsService !== "undefined" && rents_service_1.RentsService) === "function" ? _b : Object])
], RentResolver);
exports.RentResolver = RentResolver;


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rent = void 0;
const graphql_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(12);
const products_model_1 = __webpack_require__(13);
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
Rent = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive("@extends"),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_c = typeof Partial !== "undefined" && Partial) === "function" ? _c : Object])
], Rent);
exports.Rent = Rent;


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
Product = __decorate([
    graphql_1.ObjectType(),
    graphql_1.Directive("@extends"),
    graphql_1.Directive('@key(fields: "id")'),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Product);
exports.Product = Product;


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