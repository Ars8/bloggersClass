import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'
import {ioc} from "../IoCContainer";
import uuid4 from "uuid4";
import {PayloadType} from "../types/types";
import jwt_decode from "jwt-decode";

const ck = require('ckey')

export class JWTService {

  async createAccessJWT(userId: string) {
    const deviceId = uuid4().toString();
    return jwt.sign(
      {userId: userId, deviceId}, ck.ACCESS_SECRET_KEY,
      {expiresIn: ck.EXP_ACC_TIME}
    )
  }

  async createRefreshJWT(userId: string) {
    const deviceId = uuid4().toString();
    return jwt.sign(
      {userId: userId, deviceId}, ck.REFRESH_SECRET_KEY,
      {expiresIn: ck.EXP_REF_TIME}
    )
  }

  async updateAccessJWT(payload: PayloadType) {
    return jwt.sign(
      {userId: payload.userId, deviceId: payload.deviceId}, ck.ACCESS_SECRET_KEY,
      {expiresIn: ck.EXP_ACC_TIME}
    )
  }

  async updateRefreshJWT(payload: PayloadType) {
    return jwt.sign(
      {userId: payload.userId, deviceId: payload.deviceId}, ck.REFRESH_SECRET_KEY,
      {expiresIn: ck.EXP_REF_TIME})
  }

  async verifyRefreshJWT(token: string) {
    try {
      const result: any = jwt.verify(token, ck.REFRESH_SECRET_KEY)
      return result.userId
    } catch (e) {
      return null
    }
  }

  async verifyAccessJWT(token: string) {
    try {
      const result: any = jwt.verify(token, ck.ACCESS_SECRET_KEY)
      return result.userId
    } catch (err) {
      return null
    }
  }

  async verifyRefreshTokenAndCheckInBlackList(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) {
        console.log("Refresh token")
        return res.sendStatus(401)
      }      

      const jwtPayload = await jwt.verify(refreshToken, ck.REFRESH_SECRET_KEY)
      if (!jwtPayload) {
        console.log("jwtPayload")
        return res.sendStatus(401)
      }

      const isTokenBlocked = await ioc.blackListRefreshTokenJWTRepository.findJWT(refreshToken)
      if(isTokenBlocked) {
        console.log("isTokenBlocked")
        return res.sendStatus(401)
      }

      return next()
    } catch (e: any) {
      return res.sendStatus(401)
    }
  }

  jwt_decode(token: string): PayloadType {
    return jwt_decode(token)
  }

  /* verifyRefreshToken (refreshToken: string) {
    try {
      const jwtPayload = jwt.verify(refreshToken, ck.REFRESH_SECRET_KEY)
      return jwtPayload
    }
    catch (e) {}
      return null
  } */
}

