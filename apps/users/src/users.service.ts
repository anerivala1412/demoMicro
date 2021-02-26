import { Injectable } from "@nestjs/common";

import { User } from "./user.model";
import { IUser } from "./user.interface";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { LoginInput } from "./user.input";
import { jwtConstants, staticError } from "../../constant";
import { JwtCommonService } from "../../auth/jwt.service";

@Injectable()
export class UsersService {
  private posts: User[] = [{ id: 1, name: "melkir", email: "test@gmail.com" }];

  constructor(
    @InjectModel("USER")
    private userModel: Model<IUser>,
    private readonly jwtService: JwtCommonService
  ) {}

  async findOneById(postId: number) {
    return await this.posts.find(({ id }) => id === postId);
  }
  /**
   * fetch all users
   * @param query
   */
  async findAll() {
    return await this.userModel.find();
  }

  /**
   * fetch all users
   * @param query
   */
  async getMany(query) {
    return await this.userModel.find();
  }

  /**
   * single user
   * @param query
   */
  async findOne(query): Promise<IUser> {
    console.log({ query });
    return await this.userModel.findOne(query).lean();
  }

  /**
   *
   * @param payload
   */
  async createMany(payload): Promise<any> {
    await this.userModel.deleteMany({
      _id: { $in: payload.map((doc) => new ObjectId(doc._id)) },
    });
    return await this.userModel.create(payload);
  }

  /**
   * register user
   * @param payload
   */
  async create(input): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(input.password, 12);

    let payload = {
      ...input,
      email: input.email.toLowerCase(),
      password: hashedPassword,
    };
    return await this.userModel.create(payload);
  }

  /**
   * update user
   * @param payload
   */
  async update(input): Promise<IUser> {
    let payload = {
      ...input,
      email: input.email.toLowerCase(),
    };
    return await this.userModel.findOneAndUpdate(
      {
        _id: new ObjectId(payload._id),
      },
      ...payload,
      {
        new: true,
        upsert: true,
      }
    );
  }

  /**
   * delete user
   * @param id
   */
  async remove(id): Promise<IUser> {
    return await this.userModel.findOneAndDelete({ _id: new ObjectId(id) });
  }

  /**
   * login user
   * @param id
   */
  async login(loginInfo: LoginInput) {
    const jwtInfo = await this.jwtService.getJwtInfo();

    const existUser: IUser = await this.userModel.findOne({
      email: loginInfo.email,
    });

    if (!existUser) {
      throw new Error(staticError.userNotFound);
    }
    const result = await bcrypt.compare(loginInfo.password, existUser.password);

    if (result) {
      const payload = {
        userId: new ObjectId(existUser._id),
      };
      console.log({ payload });
      const token = jwtInfo.sign(payload);
      return { token, userInfo: existUser };
    }
    throw new Error(staticError.passwordNotMatched);
  }
}
