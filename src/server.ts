/* eslint-disable no-console */

import mongoose from "mongoose";
import app from "./app";
// const PORT = envVars.PORT
import { Server } from "http"
import { envVars } from "./config/env";
import { seedSuperAdmin } from "./middlewares/seedSuperAdmin";
let server: Server


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log('✅ Connected Successfull to MongoDB Useing Mongoose!!');

        server = app.listen(envVars.PORT, () => {
            console.log(`✅ App listening on port ${envVars.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}


(async() => { /// call IIFE function
   await startServer();
   await seedSuperAdmin()
})()


// ** The server can be down for 3 main reasons:
// 1. unhandled rejection error
// 2. uncaught rejection error 
// 3. signal termination sigterm

// 1. unhandled rejection error ==== >> An error that we need to handle using try catch in promise releleted error

process.on("unhandledRejection", (error) => {
    console.log("unhandled Rejection detected.. server shutting down..", error);
    if (server) {
        server.close(() => { // closed the server connection
            process.exit(1) // closed the node tarminal
        });
    }
    process.exit(1)
})

//// checking unhandledRejection error ...
// Promise.reject(new Error("I forgot to catch this promise"))


// 2. uncaught Exception error ==== >> An error that local error

process.on("uncaughtException", (error) => {
    console.log("uncaughtException error.. server shutting down..", error);
    if (server) {
        server.close(() => { // closed the server connection
            process.exit(1) // closed the node tarminal
        });
    }
    process.exit(1)
})

//// checking unhandledRejection error ...
// throw new Error("I forgot to handle this local error")


// 3. Signal error ==== >> This error will show when we close the server

process.on("SIGTERM", (error) => {
    console.log("SIGTERM signal recieved error.. server shutting down..", error);
    if (server) {
        server.close(() => { // closed the server connection
            process.exit(1) // closed the node tarminal
        });
    }
    process.exit(1)
})
process.on("SIGINT", () => {
    console.log("SIGINT signal recieved error.. server shutting down..");
    if (server) {
        server.close(() => { // closed the server connection
            process.exit(1) // closed the node tarminal
        });
    }
    process.exit(1)
})

