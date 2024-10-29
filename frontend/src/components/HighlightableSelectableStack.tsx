import { hexToRGBObject } from "@modules/workspace/utils/hexToRGB";
import { Stack, styled } from "@mui/material";

export const HighlightableSelectableStack = styled(Stack, {
  shouldForwardProp: (prop) =>
    ["highlighted", "selected"].every((value) => value !== prop),
})<{ highlighted?: boolean; selected?: boolean }>(({
  theme,
  highlighted,
  selected,
}) => {
  const rgb = hexToRGBObject(theme.palette.primary.main);
  const highlightBackgroundColor = `rgba(${rgb?.r},${rgb?.g},${rgb?.b},0.2)`;
  const selectBackgroundColor = `rgba(${rgb?.r},${rgb?.g},${rgb?.b},0.6)`;
  return {
    backgroundColor: selected
      ? selectBackgroundColor
      : highlighted
        ? highlightBackgroundColor
        : undefined,
    transition: "all 100ms",
    borderRadius: theme.shape.borderRadius,
  };
});
