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

@Injectable()
export class UsersService {
  private posts: User[] = [{ id: 1, name: "melkir", email: "test@gmail.com" }];

  constructor(
    @InjectModel("USER")
    private userModel: Model<IUser>
  ) {}

  findOneById(postId: number): User {
    return this.posts.find(({ id }) => id === postId);
  }
  // async create(user) {
  //   await this.userModel.create(user);
  // }

  /**
   * fetch all users
   * @param query
   */
  async findAll() {
    return await this.userModel.aggregate();
  }

  /**
   * fetch all users
   * @param query
   */
  async getMany(query) {
    return await this.userModel.aggregate();
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
  async create(payload): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    payload.password = hashedPassword;
    payload.email = payload.email.toLowerCase();
    return await this.userModel.create(payload);
  }

  /**
   * update user
   * @param payload
   */
  async update(payload): Promise<IUser> {
    payload.email = payload.email.toLowerCase();
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
    const jwt = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    });
    const existUser: any = await this.userModel.findOne({
      email: loginInfo.email,
    });

    if (!existUser) {
      throw new Error(staticError.userNotFound);
    }

    let result = null;

    result = await bcrypt.compare(loginInfo.password, existUser.password);

    if (result) {
      const payload = {
        userId: new ObjectId(existUser._id),
      };
      console.log({ payload });
      const token = jwt.sign(payload);
      return { token, userInfo: existUser };
    }
    throw new Error(staticError.passwordNotMatched);
  }
}
