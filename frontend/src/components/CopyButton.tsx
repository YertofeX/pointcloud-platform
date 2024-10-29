import {
  Check as CheckIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import { Button, ButtonProps, Tooltip, Zoom } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  copyContent: string;
  resetDelay?: number;
};

export const CopyButton = ({
  children,
  copyContent,
  resetDelay = 2000,
  ...props
}: PropsWithChildren<Props & ButtonProps>) => {
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
      <Button
        onClick={copyToClipboard}
        endIcon={
          recentlyCopied ? (
            <CheckIcon fontSize="small" />
          ) : (
            <ContentCopyIcon fontSize="small" />
          )
        }
        {...props}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
