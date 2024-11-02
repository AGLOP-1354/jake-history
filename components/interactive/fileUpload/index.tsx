"use client";

import React, { useState } from "react";
import { IconPhotoScan } from "@tabler/icons-react";
import Image from "next/image";

type FileUploadProps = {
  onFileSelect: (file: File) => void;
  className?: string;
};

const FileUpload = ({ onFileSelect, ...acc }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div style={styles.container}>
      {preview ? (
        <Image src={preview} alt="Preview" fill style={styles.imagePreview} />
      ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div style={styles.placeholder} onClick={() => document.getElementById("fileInput")?.click()}>
          <IconPhotoScan width={96} height={96} stroke={2} />
          <p style={styles.placeholderText}>이미지 업로드</p>
        </div>
      )}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
        {...acc}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#333",
    borderRadius: "8px",
    cursor: "pointer",
    position: "relative" as const,
  },
  placeholder: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    color: "#ccc",
  },
  placeholderIcon: {
    width: "80px",
    height: "80px",
  },
  placeholderText: {
    marginTop: "10px",
    color: "#5bcdb4",
    fontSize: "16px",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "8px",
  },
};

export default FileUpload;
