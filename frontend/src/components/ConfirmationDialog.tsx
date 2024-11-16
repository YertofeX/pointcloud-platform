import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  text: string;
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

export const ConfirmationDialog = ({
  open,
  onClose,
  onOk,
  title,
  text,
}: Props) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose();
    onOk();
  };

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button variant="text" autoFocus onClick={handleCancel}>
          {t("common.button.cancel")}
        </Button>
        <Button variant="contained" onClick={handleOk}>
          {t("common.button.yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
