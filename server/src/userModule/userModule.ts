import { Module } from "@nestjs/common";
import userController from "./userController";
import { MulterModule } from "@nestjs/platform-express";
import FileValidatorService from "src/config/FileValidatorService";

@Module({
  controllers: [userController],
  imports: [MulterModule.register({ dest: "./uploads" })],
  providers: [FileValidatorService]
})
export default class userModule { }
