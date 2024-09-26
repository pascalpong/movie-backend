import { FastifyRequest } from "fastify";
import path from "path";
import * as fs from "fs";
import * as util from "util";
import slugify from "slugify";
import { createWriteStream } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';
import crypto from 'crypto';

const pipelineAsync = promisify(pipeline);

// Function to get current date in yyyyMMdd format and append milliseconds since epoch
const getFormattedDateWithMilliseconds = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const milliseconds = Date.now();

  return `${year}${month}${day}${milliseconds}`;
};

const uploadFiles = async (req: FastifyRequest) => {
  const mkdir = util.promisify(fs.mkdir);
  const files = [];
  const uploadPath = path.join(__dirname, "../uploads");
  let hasFiles = false;

  try {
    if (!fs.existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true });
    }

    const parts = req.files();

    for await (const part of parts) {
      if (part.file) {
        hasFiles = true;

        const fileExtension = path.extname(part.filename);
        const baseName = path.basename(part.filename, fileExtension);
        const slug = slugify(baseName, { lower: true, strict: true });

        const formattedDateWithMilliseconds =
          getFormattedDateWithMilliseconds();

        const filePath = path.join(
          uploadPath,
          `${formattedDateWithMilliseconds}-${slug}${fileExtension}`
        );

        const fileStream = fs.createWriteStream(filePath);

        await new Promise((resolve, reject) => {
          part.file.pipe(fileStream).on("finish", resolve).on("error", reject);
        });

        files.push(`/uploads/${path.basename(filePath)}`);
      }
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    throw new Error("Failed to upload files.");
  }

  return files;
};


const processAndUploadFile = async (fileBuffer: Buffer, originalFilename: string) => {
  const uploadDir = join(__dirname, '../../../public/uploads');
  
  const fileExtension = path.extname(originalFilename);
  const randomFilename = crypto.randomBytes(16).toString('hex') + fileExtension;
  
  const filePath = join(uploadDir, randomFilename);
  await fs.promises.mkdir(uploadDir, { recursive: true });
  await fs.promises.writeFile(filePath, fileBuffer);

  return `/uploads/${randomFilename}`;
}

export { uploadFiles, processAndUploadFile };

