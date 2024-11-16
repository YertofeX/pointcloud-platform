import {
  Check as CheckIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import {
  IconButton,
  IconButtonProps,
  SvgIconProps,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  copyContent: string;
  resetDelay?: number;
  iconButtonProps?: IconButtonProps;
  iconProps?: SvgIconProps;
};

export const CopyIconButton = ({
  copyContent,
  resetDelay = 2000,
  iconButtonProps,
  iconProps,
}: Props) => {
  const { t } = useTranslation();

  const [recentlyCopied, setRecentlyCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyContent);
    setRecentlyCopied(true);
    setTimeout(() => {
      setRecentlyCopied(false);
    }, resetDelay);
  };

  return (
    <Tooltip
      title={t("misc.copied-to-clipboard")}
      TransitionComponent={Zoom}
      placement="top"
      open={recentlyCopied}
      onOpen={() => {}}
      onClose={() => {}}
    >
      <IconButton onClick={copyToClipboard} {...iconButtonProps}>
        {recentlyCopied ? (
          <CheckIcon {...iconProps} />
        ) : (
          <ContentCopyIcon {...iconProps} />
        )}
      </IconButton>
    </Tooltip>
  );
};
