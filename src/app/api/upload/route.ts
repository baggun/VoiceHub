import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import multer from "multer";
// import multerS3 from "multer-s3";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: String(process.env.S3_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.S3_SECRET_ACCESS_KEY),
  },
  region: "ap-northeast-2",
}); 

export async function POST(request: NextRequest) {
  try {
    const image = await request.formData();
    const files = image.getAll("image") as File[];

    const response = await Promise.all(
      files.map(async file => {
        const Body = (await file.arrayBuffer()) as Buffer;
        const nowDate = Date.now().toString();
        const fileName = `${nowDate}_${file.name}`;
        await s3.send(new PutObjectCommand({ Bucket: "baggun", Key: `img/${fileName}`, Body }));

        return `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/img/${fileName}`;
        // https://baggun.s3.ap-northeast-2.amazonaws.com/img/1699371443457_11.PNG
      }),
    );

    return NextResponse.json({
      success: true,
      message: "파일 업로드",
      files: response,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "파일 업로드 실패",
      },
      { status: 400 },
    );
  }
}
