import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import { ioc } from "../IoCContainer";

const ck = require('ckey')

export class authMiddleware {
    
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
}