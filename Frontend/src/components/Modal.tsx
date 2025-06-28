import { Button, Modal } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";

export default function $Modal({
  open,
  onClose,
  onConfirm,
  title,
  closeText,
  confirmText,
  closeVariant = "error",
  confirmVariant = "primary",
  children,
  preventClose = false,
}: {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: string | ReactNode;
  closeText?: string | null;
  confirmText?: string | null;
  closeVariant?: "primary" | "success" | "error";
  confirmVariant?: "primary" | "success" | "error";
  preventClose?: boolean;
  children?: ReactNode;
}) {
  return (
    <Modal
      closeButton
      blur
      open={open}
      onClose={onClose}
      preventClose={preventClose}
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button auto flat color={closeVariant} onPress={onClose}>
          {closeText}
        </Button>
        <Button auto onPress={onConfirm} color={confirmVariant}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
