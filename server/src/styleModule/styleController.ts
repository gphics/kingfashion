import {
  Post,
  Put,
  Delete,
  Req,
  Controller,
  Get,
  HttpException,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from "@nestjs/common";

import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Request, Express } from "express";
import FileValidatorService from "src/config/FileValidatorService";
import configuredCloduinary from "src/config/cloudConfig";

import styleModel from "src/model/styleModel";
import returnType from "src/utils/returnType";

@Controller("styles")
export default class styleController {
  constructor(private FileValidatorService: FileValidatorService) { }
  @Get()
  async getStyles(): Promise<returnType> {
    const styles = await styleModel.find().populate("categories");
    if (styles) {
      const jsonParsed = JSON.parse(JSON.stringify(styles));
      const transformedStyles = jsonParsed.map((style) => {
        const transformedCategories = style?.categories.map(
          (elem) => elem.name,
        );
        return { ...style, categories: transformedCategories };
      });

      return { err: null, response: { data: transformedStyles } };
    }
  }

  @Post("/create")
  async create(@Req() req: Request): Promise<returnType> {
    try {
      const { price, description, categories, name, images } = req.body;
      if (!price || !description || !name || !categories) {
        throw new HttpException("all fields must be supplied", 400);
      }
      console.log(categories)
      await styleModel.create({
        name,
        description,
        categories,
        price,
        images
      });
      return { err: null, response: { message: "style created" } };

    } catch (error) {
      console.log(error)
    }

  }

  @UseInterceptors(FileInterceptor("file"))
  @Put("/update-image")
  async updateImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<returnType> {
    try {
      const { style, image } = req.query;
      console.log(style, image, file);

      if (!style || !image) {
        throw new HttpException("style id and img id must be provided", 404);
      }
      const { size, mimetype, path } = file;
      const isSized: boolean = this.FileValidatorService.sizeValidator(size);
      const isMimetyped: boolean =
        this.FileValidatorService.mimetypeValidator(mimetype);

      if (!isMimetyped)
        throw new HttpException("file format not supported", 400);
      if (!isSized)
        throw new HttpException("file size is greater than 3MB", 400);
      const fetchedStyle = await styleModel.findById(style);
      const remImage = fetchedStyle.images.find(
        (item) => item.public_id === image,
      );
      await configuredCloduinary.uploader.destroy(remImage.public_id);
      const transImages = fetchedStyle.images.filter(
        (item) => item.public_id !== image,
      );
      const upload = await configuredCloduinary.uploader.upload(path, {
        folder: "kingfashion/styles",
      });
      const { secure_url, public_id } = upload;
      fetchedStyle.images = [...transImages, { secure_url, public_id }];
      this.FileValidatorService.cleanUploadDir()
      await fetchedStyle.save();
      return { err: null, response: { message: "image updated" } };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
  @UseInterceptors(FilesInterceptor("files"))
  @Post("/upload-images")
  async uploadImages(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<returnType> {
    try {
      const { style: id } = req.query;
      const { err } = this.FileValidatorService.compoundValidation(files);
      if (err) {
        throw new HttpException(err, 400);
      }
      const filePaths = files.map((elem) => elem.path);
      const filePromises = filePaths.map(
        async (elem) =>
          await configuredCloduinary.uploader.upload(elem, {
            folder: "kingfashion/styles",
          }),
      );
      const allSettled = await Promise.allSettled(filePromises);
      if (allSettled) {
        await this.FileValidatorService.cleanUploadDir();
        const images = this.FileValidatorService.getImgInfos(allSettled);
        const fetchedStyle = await styleModel.findById(id);
        images.forEach((item) => fetchedStyle.images.push(item));
        await fetchedStyle.save();
        return { err: null, response: { message: "images uploaded" } };
      }
    } catch (error) {
      throw new HttpException(error.message, 400)
    }

  }

  @Delete("/delete-image")
  async deleteImage(@Req() req: Request): Promise<returnType> {
    const { image, style } = req.query;
    try {
      const fetchedStyle = await styleModel.findById(style);

      const remImage = fetchedStyle.images.find(
        (item) => image === item.public_id,
      );
      if (!remImage) {
        throw new HttpException("image not found", 404);
      }
      await configuredCloduinary.uploader.destroy(remImage.public_id);
      const transImages = fetchedStyle.images.filter(
        (item) => item.public_id !== image,
      );
      fetchedStyle.images = transImages;
      await fetchedStyle.save();

      return { err: null, response: { message: "image deleted" } };
    } catch (error) {
      throw new HttpException(error.message || "An error occured", 400)
    }
  }

  @Get("/sort")
  async sorts(): Promise<returnType> {
    const styles = await styleModel.find().sort({ createdAt: -1 })
    return { err: null, response: { data: styles } }
  }
  @Get("/:id")
  async style(@Req() req: Request): Promise<returnType> {
    try {
      const { id } = req.params;
      const style = await (await styleModel.findById(id)).populate("categories");

      if (!id) {
        throw new HttpException("style not found", 404);
      }
      return { err: null, response: { data: style } };
    } catch (error) {
      throw new HttpException(error.message, 400)
    }

  }
  @Put("/:id")
  async update(@Req() req: Request): Promise<returnType> {
    try {
      const { id } = req.params;

      const updated = await styleModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true },
      );
      if (!updated) {
        throw new HttpException("style does not exist", 404);
      }
      return { err: null, response: { message: "style updated" } };
    } catch (error) {
      console.log(error)
    }

  }
  @Delete("/:id")
  async delete(@Req() req: Request): Promise<returnType> {
    const { id } = req.params;
    const updated = await styleModel.findByIdAndDelete(id);
    if (!updated) {
      throw new HttpException("style does not exist", 404);
    }
    return { err: null, response: { message: "style deleted" } };
  }
}
