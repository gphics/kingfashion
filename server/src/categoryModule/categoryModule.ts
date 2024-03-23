import { Module } from "@nestjs/common";
import categoryController from "./categoryController";

@Module({
  controllers: [categoryController],
})
export default class categoryModule {}
