import express from "express";
import { middleware } from "@line/bot-sdk";
import { Env } from "./env"

const app = express();
app.use('/send', middleware(Env.middlewareConfig));
app.use("/send", require("./functions/routers/v1/send/router.ts"));

app.listen(Env.port, () => {
  console.log("Express WebApi listening on port " + Env.port);
})
