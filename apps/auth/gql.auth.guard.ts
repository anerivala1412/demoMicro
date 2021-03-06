import {
  Injectable,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { JwtCommonService } from "./jwt.service";

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtCommonService
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const res = ctx.getContext().req;

    return res;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const res = ctx.getContext().req;
    const req = this.getRequest(context);
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
      throw new BadRequestException("Authorization header not found.");
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`
      );
    }

    const jwt = await this.jwtService.getJwtInfo();
    const userData: any = jwt.decode(token);
    Object.assign(req, { user: { _id: userData.userId } });
    return true;
  }
}
