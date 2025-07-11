import { Router } from "express";
import { UserControllers } from "./user.controller";


const route = Router()

route.post("/register", UserControllers.createUser)
route.get("/all-users", UserControllers.getAllUsers)

export const UserRoutes = route;