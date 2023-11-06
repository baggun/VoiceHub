// import { NextApiRequest, NextApiResponse } from 'next';
// import nextConnect, { Middleware } from 'next-connect';
// import dbConnect from './dbConnect';

// export default (
//   ...middleware: Middleware<NextApiRequest, NextApiResponse>[]
// ) => {
//   return nextConnect<NextApiRequest, NextApiResponse>({
//     onError: (err, req, res) => {
//       // 에러 발생시 처리 내용
//     },
//     onNoMatch: (req, res) => {
//       // 어떠한 route에도 매치되지 않았을 때 처리 내용
//     }
//   }).use(dbConnect, ...middleware);
// };