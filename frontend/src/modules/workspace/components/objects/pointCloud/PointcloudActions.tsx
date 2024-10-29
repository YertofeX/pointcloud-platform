import { Typography } from "@mui/material";
import { LayerActionComponentProps } from "../../LayerManager/types";
import { HighlightableSelectableStack } from "@components/HighlightableSelectableStack";

export const PointcloudActions = ({ title }: LayerActionComponentProps) => {
  return (
    <HighlightableSelectableStack>
      <Typography>{title}</Typography>
    </HighlightableSelectableStack>
  );
};
