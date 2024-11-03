"use client";
import dynamic from "next/dynamic";

const HistoryEditor = dynamic(() => import("@/src/app/history/create/(components)/HistoryEditor"), { ssr: false });

const CreateHistoryPage = () => {
  return <HistoryEditor />;
};

export default CreateHistoryPage;
