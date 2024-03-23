import { config } from "dotenv";
config();
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import dbConnect from "./config/dbConnect";
import { NestExpressApplication } from "@nestjs/platform-express";
import ErrorConfig from "./config/ErrorConfig";

async function Server() {
  dbConnect();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT;

  app.enableCors({ origin: process.env.CLIENT_URL});
  app.useGlobalFilters(new ErrorConfig());
  await app.listen(port, () => console.log("SERVER IS UP AND RUNNING"));
}
Server();
