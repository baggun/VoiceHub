import { Button } from ".";

const SubmitButton = ({
  width = "100%",
  $padding = "1rem",
  margin = "1rem 0rem",
  onClick,
  children,
  disabled,
}: {
  width?: string;
  $padding?: string;
  margin?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <Button
      type="submit"
      variant="primary"
      width={width}
      $borderRadius="0.25rem"
      disabled={disabled}
      onClick={onClick}
      $padding={$padding}
      $margin={margin}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
