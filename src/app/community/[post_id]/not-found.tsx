import NotFoundLayout from "@components/layout/error/NotFoundLayout";

const NotFound = () => (
  <NotFoundLayout message="존재하지 않는 게시물입니다." redirect="/community" />
);

export default NotFound;
