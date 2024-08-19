import mongo from "./connections/mongo";
import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { veterinarianController } from "./controllers/veterinarian.controller";
import swagger from "@elysiajs/swagger";

mongo.connect("example_company")
    .then(() => console.log("Connected to mongo"))
    .catch((error) => 
        console.error("Error on connecting to Mongo\n" + error.message)
    )

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .use(veterinarianController)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
