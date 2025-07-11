import { Router } from "express";
import { UserControllers } from "./user.controller";


const route = Router()

route.post("/register", UserControllers.createUser)

export const UserRoutes = route;