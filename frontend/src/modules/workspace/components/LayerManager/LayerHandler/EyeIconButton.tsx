import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";

type Props = {
  visible: boolean;
  forcedInvisible: boolean;
  onClick: () => void;
};

export const EyeIconButton = ({ visible, forcedInvisible, onClick }: Props) => {
  return (
    <StyledIconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      forcedInvisible={forcedInvisible}
    >
      {visible ? (
        <VisibilityIcon fontSize="small" />
      ) : (
        <VisibilityOffIcon fontSize="small" />
      )}
    </StyledIconButton>
  );
};

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "forcedInvisible",
})<{ forcedInvisible: boolean }>(({ forcedInvisible }) => ({
  opacity: forcedInvisible ? 0.2 : 1,
}));
