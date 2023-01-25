import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import { ioc } from "../IoCContainer";

const ck = require('ckey')

export class authMiddleware {
    
    async verifyRefreshTokenAndCheckInBlackList(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('authMiddleware');
            
          const refreshToken = req.cookies.refreshToken
          console.log("Refresh token", refreshToken);
          if (!refreshToken) {
            console.log("no Refresh token")
            return res.sendStatus(401)
          }      
    
          const jwtPayload = await jwt.verify(refreshToken, ck.REFRESH_SECRET_KEY)
          console.log("jwtPayload =>", jwtPayload)
          if (!jwtPayload) {
            console.log("jwtPayload")
            return res.sendStatus(401)
          }
    
          const isTokenBlocked = await ioc.blackListRefreshTokenJWTRepository.findJWT(refreshToken)
          console.log('isTokenBlocked =>', isTokenBlocked);
          
          if(isTokenBlocked) {
            console.log("isTokenBlocked")
            return res.sendStatus(401)
          }
    
          return next()
        } catch (e: any) {
            console.log('e in auth mw => ', e);
            
          return res.sendStatus(401)
        }
      }
}