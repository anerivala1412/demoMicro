import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  CACHE_MANAGER,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { ObjectId } from "mongodb";
import { jwtConstants } from "../constant";
import { IUser } from "../users/src/user.interface";
import { JwtCommonService } from "./jwt.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtCommonService,
    @InjectModel("USER") private readonly userModel: Model<IUser>
  ) {}

  async canActivate(context: ExecutionContext) {
    const jwt = await this.jwtService.getJwtInfo();

    const ctx = GqlExecutionContext.create(context);

    const currentContext = ctx.getContext();

    const request = ctx.getContext().req;

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const token = request.headers.authorization.replace(/Bearer /g, "");

    let userToken;

    try {
      userToken = await jwt.verify(`${token}`);
      console.log({ userToken });
    } catch (error) {
      const currentArgs = ctx.getArgs();

      throw new Error(error.message);
    }

    const user: any = await this.userModel.findOne({
      _id: userToken.userId,
    });

    const res = this.matchRoles(user?.name);
    console.log({ res });
    if (!res) {
      throw new UnauthorizedException();
    }

    Object.assign(currentContext, {
      req: { ...currentContext.req, user: { _id: user._id } },
    });

    return res;
  }

  matchRoles(role) {
    return role;
  }
}
