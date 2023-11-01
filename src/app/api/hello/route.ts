// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '@lib/db/dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Post from '@models/post.model';

type Data = {
  success: boolean,
  message: string,
  data?: any,
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
//   // res: NextApiResponse<Data>
// ) {

//   // dbConnect();

//   // switch (req.method) {
//   //   case "GET":
//   //     const posts = await Post.find({});
//   //     res.status(200).json({ success: true, message: 'post 가져오기', data: posts });
//   //     break;
//   //   default:
//   //     res.status(405).json({ success: false, message: "Method not allowed" })
//   // }
//   res.status(200).json({ name: 'John Doe' })
// }

export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()
  // await dbConnect();
    //     const posts = await Post.find({});
    //     res.status(200).json({ success: true, message: 'post 가져오기', data: posts });


  return Response.json({ name: 'John Doe' })
}