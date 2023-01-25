import {Router} from "express";
import {ioc} from "../IoCContainer";


export const securityDevicesRouter = Router({})

securityDevicesRouter.get('/devices',
  ioc.authMiddl.verifyRefreshTokenAndCheckInBlackList,
  ioc.securityDevicesController.getAllDevices.bind(ioc.securityDevicesController))

  .delete('/devices',
    ioc.authMiddl.verifyRefreshTokenAndCheckInBlackList,
    ioc.securityDevicesController.deleteAllDevicesExceptCurrent.bind(ioc.securityDevicesController))

  .delete('/devices/:deviceId',
    ioc.authMiddl.verifyRefreshTokenAndCheckInBlackList,
    ioc.securityDevicesController.deleteDeviceByDeviceId.bind(ioc.securityDevicesController))

