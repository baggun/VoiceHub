
import type { NextFetchEvent, NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import nextConnect from 'next-connect';
import { NextResponse } from "next/server";
import * as nc from 'next-connect';

import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
// const express = require('express')
// const multer = require('multer')
// const multerS3 = require('multer-s3')

// const app = express()

const s3 = new S3Client();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "baggun",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const nowDate = Date.now().toString();
      cb(null, `img/${nowDate}_${file.originalname}`);
    },
  }),
});

// app/api/user/[id]/route.ts

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

const handler = nc();
const uploadFile = upload.single("profile");
router.use(uploadFile);

router.post(req => {
  return NextResponse.json({});
});

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
