import {
  FileDownload as FileDownloadIcon,
  FileDownloadDone as FileDownloadDoneIcon,
} from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren, useState } from "react";

type Props = {
  exportData: Object;
  fileName: string;
  buttonProps?: ButtonProps;
};

export const ExportButton = ({
  exportData,
  fileName,
  buttonProps,
  children,
}: PropsWithChildren<Props>) => {
  const [exportDone, setExportDone] = useState<boolean>(false);

  const handleExport = () => {
    const fileData = JSON.stringify(exportData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setExportDone(true);

    setTimeout(() => {
      setExportDone(false);
    }, 3000);
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleExport}
      startIcon={exportDone ? <FileDownloadDoneIcon /> : <FileDownloadIcon />}
    >
      {children}
    </Button>
  );
};
