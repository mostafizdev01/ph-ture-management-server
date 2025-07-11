import cors from "cors"
import express, {Application, Request, Response} from 'express'
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalError";

const app: Application = express();


app.use(express.json())
app.use(cors())
app.use("/api/v1", router)

app.get("/", (req:Request, res:Response) => {
    res.send("WellCome to ph ture server")
})


app.use(globalErrorHandler) /// handle global error


export default app;