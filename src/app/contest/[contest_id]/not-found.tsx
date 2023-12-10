import NotFoundLayout from "@components/layout/error/NotFoundLayout";

const NotFound = () => (
  <NotFoundLayout message="존재하지 않는 공고입니다." redirect="/script" />
);

export default NotFound;
