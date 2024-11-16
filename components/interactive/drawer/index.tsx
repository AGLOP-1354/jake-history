"use client";

import { useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

import classes from "./drawer.module.css";

const drawerVariants = {
  open: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  closed: {
    y: "200%",
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

type Props = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
};

const Drawer = ({ open, title, children }: Props) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <motion.div
      className={classes.Drawer}
      variants={drawerVariants}
      initial="closed"
      animate={open ? "open" : "closed"}
    >
      {!!title && (
        <header className={classes.header}>
          <span className={classes.title}>{title}</span>
          닫기버튼
        </header>
      )}

      <article className={classes.article}>{children}</article>
    </motion.div>
  );
};

export default Drawer;
