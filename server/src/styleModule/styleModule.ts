import { Module } from "@nestjs/common";
import styleController from "./styleController";
import { MulterModule } from "@nestjs/platform-express";
import FileValidatorService from "src/config/FileValidatorService";

@Module({
  controllers: [styleController],
  imports: [
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  providers: [FileValidatorService],
})
export default class styleModule {}
