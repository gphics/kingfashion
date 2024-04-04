import { Injectable } from "@nestjs/common";
import * as fs from "node:fs/promises";
import path = require("node:path");

type imgInfo = {
  public_id: string;
  secure_url: string;
};

@Injectable()
export default class FileValidatorService {
  sizeValidator(size: number): boolean {
    const threeMB: number = 3000000;
    const result = size > threeMB ? false : true;
    return result;
  }

  mimetypeValidator(mimetype: string): boolean {
    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/svg" &&
      mimetype !== "image/jpg" &&
      mimetype !== "image/webp" &&
      mimetype !== "image/gif" &&
      mimetype !== "image/png"
    ) {
      return false;
    }
    return true;
  }
  compoundValidation(files: any[]): {
    err: null | string;
    data: boolean | null;
  } {
    // sizes
    const sizes = [];
    const mimetypes = [];
    files.forEach((elem) => {
      sizes.push(elem.size);
      mimetypes.push(elem.mimetype);
    });
    const sizeState = sizes.every((size) => this.sizeValidator(size));
    const mimetypesState = mimetypes.every((mimetype) =>
      this.mimetypeValidator(mimetype),
    );
    let err = !sizeState ? "each image size must be less than 3MB" : null;
    let data = err ? null : true;
    if (!mimetypesState) {
      err = "file format not supported";
      data = false;
    }
    return { data, err };
  }
  async cleanUploadDir(): Promise<void> {
    const absolutePath = path.resolve("./uploads");
    const files = await fs.readdir(absolutePath);
    if (files.length) {
      const promises = files.map(
        async (file) => await fs.unlink(`${absolutePath}/${file}`),
      );
      await Promise.allSettled(promises);
    }
  }
  getImgInfo(upload: any): imgInfo {
    const { public_id, secure_url } = upload;
    return { public_id, secure_url };
  }
  getImgInfos(uploads: any): imgInfo[] {
    console.log(uploads);
    const trans = uploads.map((upload) => {
      const { public_id, secure_url } = upload.value;
      return { public_id, secure_url };
    });
    return trans;
  }
}
