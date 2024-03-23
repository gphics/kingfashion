import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import userModule from "./userModule/userModule";
import categoryModule from "./categoryModule/categoryModule";
import styleModule from "./styleModule/styleModule";

@Module({
  imports: [userModule, categoryModule, styleModule],
  controllers: [AppController],
})
export class AppModule {}
