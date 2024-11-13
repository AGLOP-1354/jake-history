"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 56px)",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>에러 페이지 입니다.</h1>
      <p style={{ fontSize: "1rem", color: "gray" }}>{error.message}</p>
    </div>
  );
};

export default Error;
