/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    await app.listen(config.get("app.gatewayPort"));
    const url = await app.getUrl();
    common_1.Logger.log(`${url}/grapqhl`);
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
exports.AppModule = void 0;
const common_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const core_1 = __webpack_require__(2);
const config_1 = __webpack_require__(6);
const app_1 = __webpack_require__(7);
const database_1 = __webpack_require__(8);
const user_schema_1 = __webpack_require__(9);
const products_schema_1 = __webpack_require__(11);
const role_guard_1 = __webpack_require__(12);
const jwt_service_1 = __webpack_require__(13);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "USER", schema: user_schema_1.userSchema },
                { name: "PRODUCT", schema: products_schema_1.productSchema },
            ]),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    uri: config.get("database.url"),
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot({
                load: [app_1.default, database_1.default],
            }),
            graphql_1.GraphQLGatewayModule.forRoot({
                server: { cors: true },
                gateway: {
                    serviceList: [
                        { name: "users", url: "http://[::1]:3001/graphql" },
                        { name: "products", url: "http://[::1]:3003/graphql" },
                    ],
                },
            }),
        ],
        providers: [
            jwt_service_1.JwtCommonService,
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");;

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");;

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(6);
exports.default = config_1.registerAs("app", () => ({
    url: process.env.DATABASE_URL,
    gatewayPort: process.env.GATEWAY_PORT,
    userPort: process.env.USER_PORT,
    rentPort: process.env.RENT_PORT,
    productPort: process.env.PRODUCT_PORT,
}));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(6);
exports.default = config_1.registerAs('database', () => ({
    type: 'mongoose',
    url: process.env.DATABASE_URL,
}));


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userSchema = void 0;
const mongoose = __webpack_require__(10);
exports.userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    password: String,
}, { timestamps: true });


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.productSchema = void 0;
const mongoose = __webpack_require__(10);
exports.productSchema = new mongoose.Schema({
    name: String,
    price: String,
    unit: String,
}, { timestamps: true });


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(4);
const core_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(10);
const mongoose_2 = __webpack_require__(5);
const jwt_service_1 = __webpack_require__(13);
let RolesGuard = class RolesGuard {
    constructor(reflector, jwtService, userModel) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async canActivate(context) {
        const jwt = await this.jwtService.getJwtInfo();
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const currentContext = ctx.getContext();
        const request = ctx.getContext().req;
        if (!request.headers.authorization) {
            throw new common_1.UnauthorizedException();
        }
        const token = request.headers.authorization.replace(/Bearer /g, "");
        let userToken;
        try {
            userToken = await jwt.verify(`${token}`);
            console.log({ userToken });
        }
        catch (error) {
            const currentArgs = ctx.getArgs();
            throw new Error(error.message);
        }
        const user = await this.userModel.findOne({
            _id: userToken.userId,
        });
        const res = this.matchRoles(user === null || user === void 0 ? void 0 : user.name);
        console.log({ res });
        if (!res) {
            throw new common_1.UnauthorizedException();
        }
        Object.assign(currentContext, {
            req: Object.assign(Object.assign({}, currentContext.req), { user: { _id: user._id } }),
        });
        return res;
    }
    matchRoles(role) {
        return role;
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __param(2, mongoose_2.InjectModel("USER")),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_service_1.JwtCommonService !== "undefined" && jwt_service_1.JwtCommonService) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtCommonService = void 0;
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(14);
const constant_1 = __webpack_require__(15);
let JwtCommonService = class JwtCommonService {
    constructor() { }
    async getJwtInfo() {
        const jwt = new jwt_1.JwtService({
            secret: constant_1.jwtConstants.secret,
            signOptions: { expiresIn: constant_1.jwtConstants.expiresIn },
        });
        return await jwt;
    }
};
JwtCommonService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], JwtCommonService);
exports.JwtCommonService = JwtCommonService;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

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