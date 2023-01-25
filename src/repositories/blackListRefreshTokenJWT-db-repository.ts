import {BlackListRefreshTokenJWT, PayloadType} from "../types/types";
import {MyModelBlackListRefreshTokenJWT} from "../mongoose/BlackListRefreshTokenJWTModel";
import {ioc} from "../IoCContainer";

const ck = require('ckey')


export class BlackListRefreshTokenJWTRepository {

  async findJWT(refreshToken: string): Promise<BlackListRefreshTokenJWT | null> {
    return await MyModelBlackListRefreshTokenJWT.findOne({refreshToken})
  }

  async addJWT(refreshToken: string) {
    return MyModelBlackListRefreshTokenJWT.create({refreshToken})
  }
}
