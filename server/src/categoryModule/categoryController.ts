import {
  HttpException,
  Controller,
  Get,
  Post,
  Req,
  Delete,
  Put,
} from "@nestjs/common";
import { Request } from "express";
import categoryModel from "src/model/categoryModel";
import returnType from "src/utils/returnType";

@Controller("categories")
export default class categoryController {
  @Get()
  async getCategories(): Promise<returnType> {
    const categories = await categoryModel.find();
    return { response: { data: categories }, err: null };
  }

  @Post("/create")
  async createCategory(@Req() req: Request): Promise<returnType> {
    const { name } = req.body;
    if (!name) {
      throw new HttpException("name must be provided", 400);
    }
    const isExist = await categoryModel.findOne({ name });
    if (isExist) {
      throw new HttpException(
        `category with the name ${name} already exists`,
        400,
      );
    }
    await categoryModel.create({ name });
    return { err: null, response: { message: "category created" } };
  }

  @Delete("/:id")
  async deleteCategory(@Req() req: Request): Promise<returnType> {
    const { id } = req.params;
    const deleted = await categoryModel.findByIdAndDelete(id);
    if (deleted) {
      return { err: null, response: { message: "category deleted" } };
    }
    throw new HttpException("category does not exist", 404);
  }
  @Put("/:id")
  async updateCategory(@Req() req: Request): Promise<returnType> {
    const {
      params: { id },
      body: { name },
    } = req;
    if (!name) {
      throw new HttpException("name must be provided", 400);
    }

    const updated = await categoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (updated) {
      return { err: null, response: { message: "category updated" } };
    }

    throw new HttpException("something went wrong", 404);
  }
}
