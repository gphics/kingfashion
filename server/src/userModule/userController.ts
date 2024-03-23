import {
  Controller,
  Get,
  Req,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  HttpException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Express } from "express";
import FileValidatorService from "src/config/FileValidatorService";
import configuredCloduinary from "src/config/cloudConfig";
import userModel from "src/model/userModel";
import returnType from "src/utils/returnType";

@Controller("user")
export default class userController {
  constructor(private FileValidatorService: FileValidatorService) {}
  @Get()
  async getUser(): Promise<returnType> {
    const user = await userModel.find();
    return { err: null, response: { data: user[0] } };
  }
  @Post()
  async createUser(@Req() req: Request): Promise<returnType> {
    const { fullname, password } = req.body;
    const user = await userModel.create({ password, fullname });
    return { err: null, response: { data: user } };
  }
  @Put("/:id")
  async updateUser(@Req() req: Request): Promise<returnType> {
    const { fullname, password, email, contact } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { password, fullname, email, contact },
      { new: true },
    );
    return { err: null, response: { data: user } };
  }
  @UseInterceptors(FileInterceptor("file"))
  @Post("/img")
  async uploadImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { id } = req.query;
    const user = await userModel.findById(id);
    if (user.img.public_id) {
      await configuredCloduinary.uploader.destroy(user.img.public_id);
    }
    const isSized: boolean = this.FileValidatorService.sizeValidator(file.size);
    const isMimetype: boolean = this.FileValidatorService.mimetypeValidator(
      file.mimetype,
    );
    if (!isMimetype) {
      throw new HttpException("invalid file format",400);
    }
    if (!isSized) {
      throw new HttpException("file size must be less than 3MB",400);
    }
    const upload = await configuredCloduinary.uploader.upload(file.path, {
      folder: "kingfashion/user",
    });
    this.FileValidatorService.cleanUploadDir()
    user.img = this.FileValidatorService.getImgInfo(upload);
    await user.save();
  }
}
