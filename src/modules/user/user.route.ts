/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import z from "zod";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";


const route = Router()

route.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser)

route.get("/all-users", UserControllers.getAllUsers)

export const UserRoutes = route;