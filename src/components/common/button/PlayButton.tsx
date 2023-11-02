import { Button } from ".";

/**
 * 오디오 실행 버튼
 */
const PlayButton = ({
  onClick,
  children,
}: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}) => {
  return (
    <Button
      onClick={onClick}
      width="3rem"
      height="3rem"
      $borderRadius="50%"
      $withIcon
      $customStyle={`justify-content: center;`}
      variant="primary"
    >
      {children}
    </Button>
  );
};

export default PlayButton;
