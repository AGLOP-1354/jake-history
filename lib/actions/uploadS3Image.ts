"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const uploadS3Image = async (formData: FormData) => {
  const file = formData.get("file") as File;
  if (!file) return;

  try {
    const bytes = await file.arrayBuffer();
    const fileName = `${uuidv4()}-${file.name}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(bytes),
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(params));
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error(`Image Upload Failed: ${error}`);
  }
};

export default uploadS3Image;
