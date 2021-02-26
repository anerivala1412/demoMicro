import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constant";
@Injectable()
export class JwtCommonService {
  constructor() {}

  async getJwtInfo() {
    const jwt = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    });
    return await jwt;
  }
}
