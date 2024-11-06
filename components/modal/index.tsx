"use clinet";
import React from "react";
import classNames from "classnames";

import Button from "@/src/components/interactive/button";

import classes from "./modal.module.css";

type Props = {
  children: React.ReactNode | string;
  onClose: () => void;
  onOk?: () => void;
  isOpen: boolean;
  title?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  noFooter?: boolean;
  noPadding?: boolean;
};

const Modal = ({
  children,
  onClose,
  onOk,
  isOpen,
  title,
  okButtonText = "확인",
  cancelButtonText = "취소",
  noFooter,
  noPadding,
}: Props) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={classNames(classes.Modal, {
          [classes.noPadding]: noPadding,
        })}
      >
        <div className={classes.content}>
          {title && <header className={classes.title}>{title}</header>}

          <div>{children}</div>
        </div>

        {!noFooter && (
          <footer className={classes.footer}>
            <Button type="default" onClick={onClose}>
              {cancelButtonText}
            </Button>
            <Button type="primary" onClick={onOk}>
              {okButtonText}
            </Button>
          </footer>
        )}
      </div>
      <div
        className={classes.overlay}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
      />
    </>
  );
};

export default Modal;
